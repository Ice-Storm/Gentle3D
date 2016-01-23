var React = require('react');

module.exports = React.createClass({
  propTypes: {
    imageList: React.PropTypes.array,
    navList: React.PropTypes.array,
    imageShowList: React.PropTypes.array
  },
  getInitialState: function() {
    return  { url: '../image/mobile/index/' }
  },
  createImgList: function(imgList){
    var tempList = [];
    for(var i = 0; i < imgList.length; i++) {
      tempList.push(
        <img src = { this.state.url + imgList[i].imgName } />
      )
    }
    return tempList;
  },
  createNavList: function(navList){
    var tempList = [];
    var iconName;
    for(var i = 0; i < navList.length; i++) {
      iconName = navList[i].iconName ? navList[i].iconName : 'fa fa-paper-plane-o';
      tempList.push(
        <div className = 'content-navList'>
          <a href = { navList[i].url }>
            <i className = { iconName }></i>
            <span>{ navList[i].navName }</span>
          </a>
        </div>
      )
    }
    return tempList;
  },
  createShowImg: function(imgList){
    var tempList = [];
    for(var i = 0; i < imgList.length; i++) {
      tempList.push(<img src = { this.state.url + imgList[i].imgName } className = 'content-showImg'/>)
    }
    return tempList;
  },
  render: function(){
    return (
      <div>
        { this.createShowImg(this.props.imageShowList) }
        <div className = 'content-navPos'>{ this.createNavList(this.props.navList) }</div>
        <div className = 'content-contentImg'>{ this.createImgList(this.props.imageList) }</div>
      </div>
    );
  }
})