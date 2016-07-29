var React = require('react');

module.exports = React.createClass({
  propTypes: {
    menuList: React.PropTypes.array
  },
  createList: function(menuList){
    var tempList = [];
    for(var i = 0; i < menuList.length; i++){
      tempList.push(
        <a href = { menuList[i].navUrl }>
          <li>{ menuList[i].navTitle }</li>
        </a>
      )
    }
    return tempList;
  },
  render: function(){
    return (
      <div>
        <ul className = "menu-list">{ this.createList(this.props.menuList) }</ul>
      </div>
    )
  }
})