/*
   var config = {
        config: {
          title: '修改联系方式',
          url: './',
          type: 'get' // GET 或者 POST
        },
        info: {
          title: splitId[1],
          name: splitId[1].toLowerCase(),
          placeholder: splitId[1],
          type: 'text' // input的类型
        }
      };

*/

var React = require('react');

module.exports = React.createClass({
  propTypes: {
    pid: React.PropTypes.string,
    popSelectList: React.PropTypes.object
  },
  componentWillReceiveProps: function() {
    $('#modal').css({ display: 'block' });
  },
  createInputList: function(obj) {
    var inputList = [];
    for(i in obj) {
      if(i != 'config') {
        var input;
        if(obj[i].type == 'textarea') {
          input = <textarea 
           placeholder = { obj[i].placeholder }
           name = { obj[i].name }
           className = 'popModal-textarea'
           id = { obj[i].name } ></textarea>
        } else {
          input = <input type = { obj[i].type }
            name = { obj[i].name }
            placeholder = { obj[i].placeholder } 
            className = 'popModal-input'
            id = { obj[i].name } />
        }
        inputList.push(
          <li>
            <span className = 'popModal-info'>{ obj[i].title + ' :'}</span>
            { input }
          </li>
        )
      }
    }
    return inputList;
  },
  createModal: function(obj) {
    return (
      <div id = 'modal'>
        <div className = 'popModal-background'></div>
        <div className = 'popModal-block'>
          <span className = 'popModal-blockTitle'>
            { obj.config.title }
            <i className = 'fa fa-times popModal-iconCancel' onClick = { this.handleClickCancle }></i>
          </span>
          <ul className = 'popModal-inputList'>{ this.createInputList(obj) }</ul>
          <div className = 'popModal-buttonGroup'>
            <button className = 'popModal-buttonCancel' onClick = { this.handleClickCancle }>取消</button>
            <button className = 'popModal-buttonSubmit' onClick = { this.handleClickAjax }>提交</button>
          </div>
        </div>
      </div>
    );
  },
  handleClickCancle: function(event) {
    $('#modal').css('display', 'none');
    if(this.props.pid){ $('#' + this.props.pid).click(); }
  },
  handleClickAjax: function(event) {
    var ajax = this.props.popSelectList.config;
    var ajaxParmList = {};
    var that = this;
    for(i in this.props.popSelectList) {
      if(i != 'config') {
        var name = this.props.popSelectList[i].name;
        ajaxParmList[name] = $('#' + name).val();
      }
    }
    //发送完ajax后隐藏模态框
    
    var flag = this.props.popSelectList.config.flag ? this.props.popSelectList.config.flag : '';

    ajaxParmList.flag = flag; 
    ajaxParmList.id = this.props.popSelectList.config.id;
    ajaxParmList.num = this.props.popSelectList.config.num;
    
    $[ajax.type]('/admin/' + ajax.url, ajaxParmList, that.handleClickCancle);
    $('#' + name).val('');
  },
  render: function() {
    return (
      <div>
        { this.createModal(this.props.popSelectList) }
      </div>
    );
  }
})