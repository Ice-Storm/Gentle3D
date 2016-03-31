var React = require('react');

module.exports = React.createClass({
  propTypes: {
    imgName: React.PropTypes.String
  },
  getInitialState: function(){
    return { url: './image/' };
  },
  handleSubmit: function(event){
    event.preventDefault();

    var userInfo = {
      userName: $('#userName').val(),
      userPassword: $('#userPassword').val()
    }
    
    $.post('./login', userInfo, function (data) {
      if(data.state == 0) {
        //登录失败
        for(var i = 0; i < $('i').length; i++) {
          $('i').css('display', 'inline');
        }
      } else {
        //登录成功
        window.location.href = './admin';
      }
    })
  },
  render: function(){
    return (
      <div className = 'login-backgroundImg'>
        <div className = 'login-loginPos'>
          <img src = { this.state.url + this.props.imgName } className = 'login-userImg'/>
          <form className = 'login-inputGroup'
            method = 'POST'
            action = './login'
            onSubmit = { this.handleSubmit }>
            <ul>
              <li>
                <label htmlFor = 'userName'>Name: </label>
                <input type = 'text' name = 'userName' id = 'userName' />
                <i className = 'fa fa-times login-icon'></i>
              </li>
              <li>
                <label htmlFor = 'userPassword'>Password: </label>
                <input type = 'password' name = 'userPassword' id = 'userPassword' />
                <i className = 'fa fa-times login-icon'></i>
              </li>
            </ul>
            <div className = 'login-butGroup'>
              <a href = '/'>
                <input type = "button" value = "首页" style = {{ 'background-color': '#39b3d7' }}/>
              </a>
              <input type = "submit" value = "登录" style = {{ 'background-color': '#87b87f' }}/>
            </div>
          </form>
        </div>
      </div>
    );
  }
})