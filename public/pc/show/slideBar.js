var React       = require('react');
var ShowContent = require('./showContent.js');

module.exports = React.createClass({
  //生成左侧导航栏
  propTypes: {
    slideList: React.PropTypes.array,
    contentInfo: React.PropTypes.array 
  },
  getInitialState: function(){
    return {
      // 初始化是左边导航栏的第一个大类下的第一个选项
      title: this.props.slideList[0].sortList[0]
    };
  },
  createlist: function(arr) {
    var list = [];
    for (var i = 0; i < arr.length; i++){
      list.push(<li>{ arr[i] }</li>);
    }
    return list;
  },
  handlerClick: function(event){
    this.setState({ title: event.target.innerHTML });
  },
  createSlidePills: function(arr){
    var slidePills = [];
    var that = this;
    arr.forEach(function (item){
        //生成做导航栏
      slidePills.push(
        <div className = 'slideBar-sortPosition'>
          <div className = 'slideBar-slideSort'>
            <span>{ item.slideSort }</span>
          </div>
          <ul className = 'slideBar-list' onClick = { that.handlerClick }>
            { that.createlist(item.sortList) }
          </ul>
        </div>
      )
    })
    return slidePills;
  },
  render: function(){
    return (
      <div>
        <div className = 'slideBar-position'>{ this.createSlidePills( this.props.slideList ) }</div>
        <ShowContent contentInfo = { this.props.contentInfo } title = { this.state.title } />
      </div>
    );
  }
})