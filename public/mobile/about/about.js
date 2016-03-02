var React = require('react');

module.exports = React.createClass({
  propTypes: {
    imageList: React.PropTypes.Array,
    connectionList: React.PropTypes.Object
  },
  getInitialState: function(){
    return  { url: '../image/about/' }
  },
  createConnection: function(conList){
    var tempList = [];
    var title = '';
    for(var i in conList) {
      if( i == 'introduce' || i == 'id' ) continue;

      if(i.length <= 2){
        title = i.replace(i.substring(0, 2), i.substring(0, 2).toUpperCase());
      } else {
        title = i.replace(i.substring(0, 1), i.substring(0, 1).toUpperCase());
      }

      tempList.push(<li>{ title + ': ' + conList[i] }</li>);
    }
    return tempList;
  },
  createImg: function(imgList) {
    var tempList = [];
    for(var i = 0; i < imgList.length; i++){
      tempList.push(
        <li className = 'content-contentImgList'>
          <img src = { this.state.url + imgList[i].imgName } />
          <span>{ imgList[i].introduce }</span>
        </li>
      )
    }
    return tempList;
  },
  render: function(){
    return (
      <div>
        <div className = 'content-compony'>
          <span className = 'content-componyTitle'>
            公司介绍
            <i className = 'fa fa-location-arrow content-componyIcon'></i>
          </span>
          <div className = 'content-componyContent'>
            { this.props.connectionList.introduce ? this.props.connectionList.introduce : '' }
          </div>
          <span className = 'content-componyTitle'>
            公司成员
            <i className = 'fa fa-location-arrow content-componyIcon'></i>
          </span>
          <ul className = 'content-connectionImg'>
           { this.createImg(this.props.imageList) }
          </ul>
          <span className = 'content-componyTitle'>
            联系方式
            <i className = 'fa fa-location-arrow content-componyIcon'></i>
          </span>
          <ul className = 'content-connection'>
           { this.createConnection(this.props.connectionList) }
          </ul>
        </div>
      </div>
    );
  }
})