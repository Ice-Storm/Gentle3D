var React = require('react');

module.exports.contentMain = React.createClass({
  propTypes: {
    contentMainList: React.PropTypes.Array,
    introduceContent: React.PropTypes.Array
  },
  getInitialState: function(){
    return {url: './image/index/'};
  },
  render: function(){
    var url = this.state.url;
    var count = 0;
    var imgAndFont = this.props.contentMainList.map(function (content, index) {
      count++;
      var imgInfoParm = {
        contentFont: content.contentFont,
        buttonList: content.buttonList,
        index: index,
        isHaveButton: content.isHaveButton
      }
      return (
        <li key = { count }>
          <img src = { url + content.imgName } style = {{ width: '100%' }} />
          <ContentImgInfo contentImgParm = { imgInfoParm } />
        </li>
      );
    });

    return (
      <div>
        <ul>{ imgAndFont }</ul>
        <ContentIntroduce introduceContent = { this.props.introduceContent } />
      </div>
    );
  }
})

var ContentImgInfo = React.createClass({
  propTypes: {
    contentImgParm: React.PropTypes.object,
  },
  isHaveButton : function(btnList){
    return this.props.contentImgParm.isHaveButton ? btnList : '';
  },
  render: function(){
    var parm = this.props.contentImgParm;
    parm.buttonList.length = 2;
    var buttonList = [];
    { this.createButtonList }
    parm.buttonList.map(function(item, i){
      return (
        buttonList.push( 
          <a href = { parm.buttonList[ i ].url } className = { parm.buttonList[ i ].className || 'button-deault' }>
            { parm.buttonList[ i ].buttonFont }
          </a>
        )
      );
   })

    return (
      <div className = { 'ContentInfo-content-' + parm.index }>
        <span className = { 'ContentInfo-font-' + parm.index }>{ parm.contentFont }</span>
        <div className = { 'ContentInfo-btngroup-' + parm.index }>
          { buttonList }   
        </div>
      </div>
    );
  }
})

var ContentIntroduce = React.createClass({
    propTypes: {
      introduceContent: React.PropTypes.array,
    },
    getInitialState: function() {
      return  {
        url: '../component/index/content/img/'
      };
    },
    createPills: function (arr) {
      var tempPills = [];
      var count = 0;
      var iconName = ['fa fa-pencil fa-4x', 'fa fa-fighter-jet fa-4x', 'fa fa-send fa-4x', 'fa fa-bicycle fa-4x']
      arr.map(function(item) {
        tempPills.push(
          <div className = 'ContentIntroduce-content'>
            <span className = { item.iconName == '' ? iconName[count] : item.iconName } ></span>
            <center>{ item.title }</center>
            <p>{ item.content }</p>
          </div>
        )
        count++;
      })
      return tempPills;
    },
    render: function(){
      return (
        <div>{ this.createPills(this.props.introduceContent) }</div>
      );
    }
})