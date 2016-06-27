var React    = require('react');
var Ajax     = require('@fdaciuk/ajax');
var PageHead = require('../backPageHead/backPageHead.js');
var PopModal = require('../../common/modal.js');

module.exports = React.createClass({
  propTypes: {
    source: React.PropTypes.string,
    compontentConfig: React.PropTypes.object
  },
  getInitialState: function(){
    return {
      modalComponent: '',
      compontentConfig: this.props.compontentConfig,
      isRefresh: 0,
      isModalDisplay: 0  // 0 -> 隐藏  1 -> 出现
    };
  },
  componentWillMount: function(){
    this.fresh();
  },
  fresh: function(){
    Ajax().get(this.props.source).then(function (response, xhr){
      this.setState({ compontentConfig: response, isRefresh: 0 });
    }.bind(this));
  },
  cententChange: function(){
    this.setState({ isRefresh: 1 });
  },
  createPills: function(arr, flag, num){
    var pillList = [];
    var count = 0;
    arr.map(function(item) {
      count++;
      if(item.pillUrl || item.content){
        pillList.push(
          <li key = { count }>
            <span>
              { item.pillName || item.title }
              <i className = 'fa fa-times'
                data-operate = 'delete'         //  标示按钮的操作
                data-name = { item.textName }
                data-num = { num }
                data-flag = { flag }                   //  data-flag 标示所属块的分类  data-id 唯一标示数据
                data-id = { item.id }
              ></i>
              <i className = 'fa fa-pencil-square-o' 
                data-operate = 'editor'                //  标示按钮的操作
                data-name = { item.textName }
                data-num = { num }
                data-flag = { flag }                   //  data-flag 标示所属块的分类  data-id 唯一标示数据
                data-id = { item.id }></i>            
            </span>
            <p>{ item.pillUrl || item.content }</p>
          </li>
        )
      }
    })
    return pillList;
  },
  createBox: function(menu, pillList, num){
    return (
      <div className = 'indexConfigCompont-headPill' onClick = { this.handleClick }>
        <div className = 'indexConfigComponent-tab'>
          <span 
            id = { 'indexConfigComponent-' + num }
            ref = { 'indexConfigComponent-' + num }>
            { menu.menuNameTitle }
          </span>
          <i className = 'fa fa-plus'
           data-operate = 'add'
           data-name = { 'indexConfigComponent-' + menu.textName }
           data-num = { num }
           data-flag = { menu.textName }></i>
        </div>
        <ul>
          { this.createPills(pillList, menu.textName, num) }
        </ul>
      </div>
    );
  },
  controlBox: function(obj) {
    var box = [];
    var menuName = [];
    var count = 0;
    for(var i in obj) {
      if(i == 'menuName') {
        menuName = obj[i];
      } else {
        box.push( this.createBox(menuName[count], obj[i], count) );
        count++;  
      }
    }
    return box;
  },
  handleClick: function(event) {
    var targetId = event.target.getAttribute('data-name');
    var flag = event.target.getAttribute('data-flag');
    var num = event.target.getAttribute('data-num');

    this.setState({ isModalDisplay: 1 });

    if(event.target.getAttribute('data-operate') == 'editor') {
      //生成一个修改弹窗
      var seleteId = event.target.getAttribute('data-id');
      var splitId = targetId.split('-');
      var title = this.refs['indexConfigComponent-' + num].getDOMNode().innerHTML; 
      var url = '/admin/modal?flag=' + flag + '&id=' + seleteId + '&num=' + num + '&title=' + title;

      Ajax().get(url).then(function(response, xhr){
        this.setState({ modalComponent: <PopModal popSelectList = { response } changeParent = { this.cententChange } /> });
      }.bind(this));
    }

    if(event.target.getAttribute('data-operate') == 'delete'){
      var seleteId = event.target.getAttribute('data-id');
      var splitId = targetId.split('-');
      var url = '/admin/indexConfigComponent/delete?flag=' + flag + '&id=' + seleteId + '&num=' + num;

      Ajax().get(url).then(function(response, xhr){
        if(response.state == 1){ this.fresh(); }
      }.bind(this));
    }

    if(event.target.getAttribute('data-operate') == 'add'){
      //弹出一个添加框
      var title = this.refs['indexConfigComponent-' + num].getDOMNode().innerHTML; 
      var url = '/admin/modal?operate=add' + '&title=' + title + '&num=' + num + '&flag=' + flag;

      Ajax().get(url).then(function(response, xhr){
        this.setState({ modalComponent: <PopModal popSelectList = { response } changeParent = { this.cententChange } /> });
      }.bind(this));
    }
  },
  render: function(){
    this.state.isRefresh == 1 ? this.fresh() : '';
    return (
      <div>
        <PageHead pageHeadString = 'Index Control' />
        <div className = 'indexConfigComponent-position'>
          { this.controlBox(this.state.compontentConfig) }
        </div>
        { this.state.isModalDisplay == 1 ? this.state.modalComponent : '' }
      </div>
    );
  }
})
