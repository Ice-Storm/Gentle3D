var React = require('react');

module.exports = React.createClass({
  propTypes: {
    menuList: React.PropTypes.Array
  },
  createList: function(menuList){
    var tempList = [];
    for(var i = 0; i < menuList.length; i++){
      tempList.push(
        <li>
          <a href = { menuList[i].navUrl } >{ menuList[i].navTitle }</a>
        </li>
      )
    }
    return tempList;
  },
  render: function() {
    return (
      <div>
        <ul className = "menu-list">{this.createList(this.props.menuList)}</ul>
      </div>
    )
  }
})