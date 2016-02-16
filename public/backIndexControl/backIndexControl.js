var React = require('react');
var PageHead = require('../backPageHead/backPageHead.js');
var PopModal = require('../tools/modal.js');

module.exports = React.createClass({
  propTypes: {
    pid: React.PropTypes.string,
    compontentConfig: React.PropTypes.object
  },
  getInitialState: function() {
    return {
      pid: this.props.pid || '',
      modalComponent: ''
    };
  },
  createPills: function(arr, flag, num) {
    var pillList = [];
    var count = 0;
    arr.map(function(item) {
      count++;
      if( item.pillUrl || item.content ) {
        pillList.push(
          <li key = { count }>
            <span>
              { item.pillName || item.title }
              <i className = 'fa fa-times'
                data-operate = 'delete'         //  标示按钮的操作
                data-name = {item.textName}
                data-num = { num }
                data-flag = { flag }                   //  data-flag 标示所属块的分类  data-id 唯一标示数据
                data-id = { item.id }
              ></i>
              <i className = 'fa fa-pencil-square-o' 
                data-operate = 'editor'                //  标示按钮的操作
                data-name = {item.textName}
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
  createBox: function(menu, pillList, num) {
    return (
      <div className = 'indexConfigCompont-headPill' onClick = { this.handleClick }>
        <div className = 'indexConfigComponent-tab'>
          <span id = { 'indexConfigComponent-' + num }>{ menu.menuNameTitle }</span>
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
    for(i in obj) {
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
    var that = this;
    var targetId = event.target.getAttribute('data-name');
    var flag = event.target.getAttribute('data-flag');
    var num = event.target.getAttribute('data-num');

    if(event.target.getAttribute('data-operate') == 'editor') {
      //生成一个修改弹窗
      var seleteId = event.target.getAttribute('data-id');
      var splitId = targetId.split('-');
      var title = $('#indexConfigComponent-' + num).html();
      var url = '/admin/modal?flag=' + flag + '&id=' + seleteId + '&num=' + num + '&title=' + title;

      $.get(url, function (data) {
        that.setState({ modalComponent: <PopModal popSelectList = { data } pid = { that.state.pid }/> })
      }) 
    }

    if(event.target.getAttribute('data-operate') == 'delete') {
      var seleteId = event.target.getAttribute('data-id');
      var splitId = targetId.split('-');
      var url = '/admin/indexConfigCompontent/delete?flag=' + flag + '&id=' + seleteId + '&num=' + num;

      $.get(url, function(data){
        console.log(that.state.pid);
        if(that.state.pid){ 
          $('#' + that.state.pid).click();
        }
      })
    }

    if(event.target.getAttribute('data-operate') == 'add') {
      //弹出一个添加框
      var title = $('#indexConfigComponent-' + num).html();
      var url = '/admin/modal?operate=add' + '&title=' + title + '&num=' + num + '&flag=' + flag;

      $.get(url, function(data) {
        that.setState({ modalComponent: <PopModal popSelectList = { data } pid = { that.state.pid }/> })
      })
    }
  },
  render: function() {
    return (
      <div>
        <PageHead pageHeadString = 'Index Control' />
        <div className = 'indexConfigComponent-position'>
          { this.controlBox(this.props.compontentConfig) }
        </div>
        { this.state.modalComponent }
      </div>
    );
  }
})