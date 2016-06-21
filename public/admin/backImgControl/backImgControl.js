var React        = require('react');
var Ajax         = require('@fdaciuk/ajax');
var PageHead     = require('../backPageHead/backPageHead.js');
var ControlBlock = require('../../common/controlBlock.js');
var UploadModal = require('../../common/UploadModal.js');

module.exports = React.createClass({
  propTypes: {
    source: React.PropTypes.String,
    compontentConfig: React.PropTypes.Object
  },
  getInitialState: function(){
    return { 
      imgControlBlock: '',
      name: '',
      mUrl: './image/mobile/index/',
      compontentConfig: this.props.compontentConfig,
      isRefresh: 0,
      modalSource: ''
    };
  },
  componentWillMount: function(){
    this.fresh();
  },
  fresh: function(){
    Ajax().get('./admin/imgControlCompontent').then(function(response, xhr){
      this.setState({ compontentConfig: response, isRefresh: 0, modalSource: '' });
    }.bind(this));
  },
  cententChange: function(){
    this.setState({ isRefresh: 1, modalSource: '' });
  },
  getUploadUrl: function(url){
    this.setState({ modalSource: url });
  },
  createImgList: function(arr, url, flag){
    var imgCollection = [];
    var comUrl = url;
    for (var i = 0; i < arr.length; i++){
      if(arr[i].sort == 'mobileIndex'){
        url = this.state.mUrl;
      } else {
        url = comUrl;
      }
      imgCollection.push(
        <div className = 'imgControlCompontent-block'>
          <img src = { url + arr[i].imgName }
            className = 'imgControlCompontent-img'
            id = { arr[i].name }
            data-flag = { flag }
            data-id = { arr[i].id } />
          { this.state.name == arr[i].name ? this.state.imgControlBlock : '' }
        </div>
      ) 
    }
    return imgCollection;
  },
  createImgBlock: function(obj){
    var imgBlockList = [];
    var url = '';
    var str = ''
    for(var i in obj){
      url = obj[i].url;
      str = i;
      str = str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
      if(obj[i].imgList instanceof Array) {
        imgBlockList.push(
          <div>
            <PageHead pageHeadString = { str } 
              pageHeadIsHaveButton = { true }
              changeParent = { this.cententChange } />
            <div className = 'imgControlCompontent-imgListPos'>
              { this.createImgList(obj[i].imgList, url, i) }
            </div>
          </div>
        )
      }
    }
    return imgBlockList;
  },
  handleMouseOn: function(event){
    var flag = event.target.getAttribute('data-flag');
    var id = event.target.getAttribute('data-id');

    if(event.target.nodeName != 'IMG'){ return; }

    var createObj = { flag: flag, id: id, title: '' };

    this.setState({ 
      imgControlBlock: <ControlBlock controlBlockConfig = { createObj } getUploadUrl = { this.getUploadUrl } changeParent = { this.cententChange } />,
      name: event.target.id
    });  
  },
  render: function(){
    this.state.isRefresh == 1 ? this.fresh() : '';
    return (
      <div onMouseOver = { this.handleMouseOn }>
        { this.createImgBlock(this.state.compontentConfig) }
        { this.state.modalSource ?
            <UploadModal source = { this.state.modalSource } changeParent = { this.cententChange }/> 
            : ''
        }
      </div>
    );
  }
})