var React = require('react');
var Menu  = require('../headMenu/menu.js');

module.exports = React.createClass({
    propTypes: {
      logo: React.PropTypes.String,
      headerMainPills: React.PropTypes.Array
    },
    getInitialState: function() {
      return { 
        url: '../image/',
        menu: '',
        isDisplayMenu: 0
       };
    },
    handerClick: function() {
      this.setState({ menu: <Menu menuList = { this.props.headerMainPills } /> });
      var menuEle = document.getElementById('menu');

      if(this.state.isDisplayMenu){
        menuEle.className = 'fa fa-bars nav-icon';
        this.setState({ menu: ''}); 
        this.setState({ isDisplayMenu: 0});
      } else {
        menuEle.className = 'fa fa fa-times nav-icon';
        this.setState({ isDisplayMenu: 1});
      }

    },
    render: function() {
      return (
        <div className = 'nav-pos'>
          <a href = '/'>
            <img src = { this.state.url + this.props.logo } className = 'nav-logo' />
          </a>
          <i className = 'fa fa-bars nav-icon' onClick = { this.handerClick } id = "menu"></i>
          { this.state.menu }
        </div>
      );
    }
})