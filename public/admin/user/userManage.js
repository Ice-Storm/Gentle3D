var React        = require('react');
var Ajax         = require('@fdaciuk/ajax');
var PageHead     = require('../backPageHead/backPageHead.js');
var BackSlideBar = require('../backSlideBar/backSlideBar.js');
var PopModal     = require('../../tools/modal.js');
var UploadModal  = require('../../tools/uploadModal.js');

module.exports = React.createClass({
  propTypes: {
    pid: React.PropTypes.String,
    imgTitle: React.PropTypes.String,
    imgName: React.PropTypes.String,
    userInfo: React.PropTypes.Object,
    source: React.PropTypes.String,
    modalSource: React.PropTypes.String
  },
  getInitialState: function(){
    return {
      userInfo: '',
      imgName: '',
      pid: this.props.pid || '',
      url: './image/',
      ajaxConfig: {},
      modalComponent: '',
      uploadComponent: '',
      isRefresh: 0,
      isModalDisplay: 0  // 0 -> 隐藏  1 -> 出现
    };
  },
  componentWillMount: function(){
    this.fresh();
  },
  fresh: function(){
    if(!this.props.source) return;
    Ajax().get(this.props.source).then(function (response, xhr){
      this.setState({ 
        userInfo: response.info,
        imgName: response.image,
        isRefresh: 0 
      });
    }.bind(this));
  },
  cententChange: function(){
    this.setState({ isRefresh: 1 });
  },
  createConnectionBlock: function(obj) {
    var connectionList = [];
    var sort = '';
    for(var i in obj) {  
      if (i == 'id' || i == 'logo') {
        continue;
      }
      // 如果字段长度小于等于2就全部大写
      sort = i.length < 3 ? i.slice(0, 2).toUpperCase() : i[0].toUpperCase() + i.slice(1, i.length);
      
      connectionList.push(
        <li>
          <span className = 'connectionConfigCompontent-sortPill'>
            { sort }
          </span>
          <span className = 'connectionConfigCompontent-pillInfo'>
            { obj[i] }
            <i className = 'fa fa-pencil-square-o connectionConfigCompontent-pillInfoIcon'
              data-name = { 'backConnectionControl-' + sort } data-id = { obj.id }></i>
          </span>
        </li>
      )
    }
    return connectionList;
  },
  handeChangeClick: function(event) {
    var targetName = event.target.getAttribute('data-name');
    var targetId = event.target.getAttribute('data-id');
    var splitId = targetName ? targetName.split('-') : '';

    if(targetName && splitId[0] == 'backConnectionControl'){

      var config = {
        info: {
          title: splitId[1],
          name: splitId[1].toLowerCase(),
          placeholder: splitId[1],
          type: 'text' // input的类型
        }
      };

      Ajax().get(this.props.modalSource + 'getModal').then(function (response, xhr){
        config.config = response;
        config.config.id = targetId;
  
        if(splitId[1].toLowerCase() == 'introduce') {
          config.info.type = 'textarea';
        }

        this.setState({ 
          modalComponent: <PopModal popSelectList = { config } changeParent = { this.cententChange } />,
          isModalDisplay: 1
        })
      }.bind(this));
    }
  },
  handeUploadClick: function() {
    Ajax().get(this.props.modalSource + 'getUpload').then(function (response) {
      this.setState({ uploadComponent: <UploadModal uploadModalConfig = { response } pid = { this.state.pid } /> });
    }.bind(this))
  },
  render: function() {
    return (
      <div>
        <div className = 'connectionConfigCompontent-logo' onClick = { this.handeUploadClick }>
          <img src = { this.state.url + this.state.imgName } />
          <span>{ this.props.imgTitle }</span>
        </div>
        <ul className = 'ConnectionConfigCompontent-connectionPosition' onClick = { this.handeChangeClick }>
          { this.createConnectionBlock(this.state.userInfo) }
          { this.state.uploadComponent }
        </ul>
        { this.state.isModalDisplay == 1 ? this.state.modalComponent : '' }
        { this.state.isRefresh == 1 ? this.fresh() : '' }
      </div> 
    );
  }
})