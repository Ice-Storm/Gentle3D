/**
 *  模态框组件
 *
 *  @param {function} changeParent  给父组件传递状态，判断模态框是否出现
 *  @param {{config (required), ...}}
 *
 *  @exapmle: 
 *
 *  {
 *   config: {
 *      title: '修改联系方式',
 *      url: './',
 *      type: 'get' 
 *    },
 *    info: {
 *      title: '模态框标题',
 *      name: 'testName,
 *      placeholder: '请输入内容',
 *      type: 'text' 
 *    }
 *  }
 * 
 */

var React = require('react');
var Ajax  = require('@fdaciuk/ajax');

module.exports = React.createClass({
  propTypes: {
    changeParent: React.PropTypes.func,
    popSelectList: React.PropTypes.object
  },
  getInitialState: function(){
    return { isDisplay: 1 };
  },
  componentWillReceiveProps: function(){
    this.setState({ isDisplay: 1 });
  },
  createInputList: function(obj){
    var inputList = [];

    for(i in obj) {
      if(i != 'config') {
        var input;
        if(obj[i].type == 'textarea'){
          input = <textarea 
           placeholder = { obj[i].placeholder }
           name = { obj[i].name }
           ref = { obj[i].name }
           className = 'popModal-textarea'
           id = { obj[i].name } ></textarea>
        } else {
          input = <input type = { obj[i].type }
            name = { obj[i].name }
            ref = { obj[i].name }
            placeholder = { obj[i].placeholder } 
            className = 'popModal-input'
            id = { obj[i].name } />
        }

        inputList.push(
          <li>
            <label htmlFor = { obj[i].name } className = 'popModal-info'>{ obj[i].title + ' :'}</label>
            { input }
          </li>
        )
      }
    }
    return inputList;
  },
  handleClickCancle: function(event){
    this.setState({ isDisplay: 0 });
  },
  handleClickAjax: function(event){
    var ajax = this.props.popSelectList.config;
    var ajaxParmList = {};

    for(i in this.props.popSelectList){
      if(i != 'config') {
        var name = this.props.popSelectList[i].name;
        ajaxParmList[name] = this.refs[name].getDOMNode().value;
      }
    }
    //发送完ajax后隐藏模态框
    var flag = this.props.popSelectList.config.flag ? this.props.popSelectList.config.flag : '';

    ajaxParmList.flag = flag; 
    ajaxParmList.id = this.props.popSelectList.config.id;
    ajaxParmList.num = this.props.popSelectList.config.num;

    Ajax()[ajax.type]('/admin/' + ajax.url, ajaxParmList).then(function(response, xhr){
      this.handleClickCancle();
      if(this.props.changeParent){ 
        this.props.changeParent();
      }
    }.bind(this));

    this.refs[name].getDOMNode().value = '';
  },
  render: function(){
    return (
      <div id = 'modal'>
      { this.state.isDisplay == 1 ? 
        <div>
          <div className = 'popModal-background'></div>
          <div className = 'popModal-block'>
            <span className = 'popModal-blockTitle'>
              { this.props.popSelectList.config.title }
              <i className = 'fa fa-times popModal-iconCancel' onClick = { this.handleClickCancle }></i>
            </span>
            <ul className = 'popModal-inputList'>{ this.createInputList(this.props.popSelectList) }</ul>
            <div className = 'popModal-buttonGroup'>
              <button className = 'popModal-buttonCancel' onClick = { this.handleClickCancle }>取消</button>
              <button className = 'popModal-buttonSubmit' onClick = { this.handleClickAjax }>提交</button>
            </div>
          </div>
        </div>
        : ''} 
      </div>
    );
  }
})