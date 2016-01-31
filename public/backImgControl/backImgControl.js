var React = require('react');
var PageHead = require('../backPageHead/backPageHead.js');
var ControlBlock = require('../tools/controlBlock.js');

module.exports = React.createClass({
  propTypes: {
    compontentConfig: React.PropTypes.object
  },
  getInitialState: function() {
    return { 
      imgControlBlock: '',
      name: ''
    };
  },
  createImgList: function(arr, url, flag) {
    var imgCollection = [];
    for (var i = 0; i < arr.length; i++) {
      console.log(flag);
      imgCollection.push(
        <div className = 'imgControlCompontent-block'>
          <img src = { url + arr[i].imgName } className = 'imgControlCompontent-img'
          id = { arr[i].name }
          data-flag = { flag }
          data-id = { arr[i].id } />
          { this.state.name == arr[i].name ? this.state.imgControlBlock : '' }
        </div>
      ) 
    }
    return imgCollection;
  },
  createImgBlock: function(obj) {
    var imgBlockList = [];
    var url = '';
    var str = ''
    for(var i in obj) {
      url = obj[i].url;
      str = i;
      str = str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
      if($.isArray(obj[i].imgList)) {
        imgBlockList.push(
          <div>
            <PageHead pageHeadString = { str } pageHeadIsHaveButton = { 'true' }/>
            <div className = 'imgControlCompontent-imgListPos'>
              { this.createImgList(obj[i].imgList, url, i) }
            </div>
          </div>
        )
      }
    }
    return imgBlockList;
  },
  handleMouseOn: function(event) {
    var createObj = {};
    var flag = event.target.getAttribute('data-flag');
    var id = event.target.getAttribute('data-id');
    if(event.target.nodeName != 'IMG'){
      return;
    }

    createObj.flag = flag;
    createObj.title = '';
    createObj.id = id;

    this.setState({ 
      imgControlBlock: <ControlBlock controlBlockConfig = { createObj } />,
      name: event.target.id,
    })  

  },
  render: function() {
    return (
      <div onMouseOver = { this.handleMouseOn }>
        { this.createImgBlock(this.props.compontentConfig) }
      </div>
    );
  }
})