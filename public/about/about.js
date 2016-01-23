var React = require('react');
var Banner = require('../common/frontBanner/banner.js');

module.exports.aboutMain = React.createClass({
  propTypes: {
    bannerContent: React.PropTypes.object,
    contentInfo: React.PropTypes.object
  },
  render: function() {
    return (
      <div>
        <Banner bannerContent = { this.props.bannerContent } />      
        <AboutContent contentInfo = { this.props.contentInfo } connection = { this.props.connection } />
      </div>
    );
  }
})

module.exports.banner = React.createClass({
  //生成导航栏下的页面介绍
  propTypes: {
    // bannerContent.titile
    // bannerContent.content
    bannerContent: React.PropTypes.object
  },
  render: function() {
    return (
      <div className = 'bannerContent-background'>
        <div className = 'bannerContent-position'>
          <span className = 'bannerContent-title'>{ this.props.bannerContent.title }</span>
          <span className = 'bannerContent-content'>{ this.props.bannerContent.content }</span>
        </div>
      </div>
    );
  }
})

var AboutContent = React.createClass({
  propTypes: {
    contentInfo: React.PropTypes.object,
    connection: React.PropTypes.object
  },
  getInitialState: function() {
      return {url: './image/about/'};
  },
  createMemberList: function(arr) {
    var memberList = [];
    var that = this;
    arr.forEach(function(item) {
      memberList.push(
        <li>
          <img src = { that.state.url + item.imgName } className = 'about-memberImg'/>
          <span><center>{ item.introduce }</center></span>
        </li>
      );
    })
    return memberList;
  },
  render: function() {
    var that = this;
    return (
      <div>
        <div className = 'about-introduceContent'>
          <span className = 'about-introduceTitle'>{ '公司简介' }</span>
          <div className = 'about-introduceInfo'>
            <span>{ that.props.contentInfo.content }</span>
          </div>
          <span className = 'about-introduceTitle'>{ '团队成员' }</span>
          <ul className = 'about-memberList'>
            { that.createMemberList(that.props.contentInfo.memberList) }
          </ul>
        </div>
        <AboutConnection connection = { that.props.connection } />
      </div>
    );
  }
})

var AboutConnection = React.createClass({
  propTypes: {
    connection: React.PropTypes.object
  },
  createConnectionList: function(obj) {
    var connectionList = [];
    var ietm;
    for(item in obj) {
      if(item != 'id' && item != 'introduce') {
        connectionList.push(
          <li>
            <span>{ item == 'title' ? '' : item + ': ' }</span>
            <span>{ obj[item] }</span>
          </li>
        )
      }
    }
    return connectionList;
  },
  render: function() {
    return (
      <div className = 'about-connectionAddress'>
        <ul>
          { this.createConnectionList ( this.props.connection ) }
        </ul>
      </div>
    );
  }
})