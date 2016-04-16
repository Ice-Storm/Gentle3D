var React = require('react');
var Ajax  = require('@fdaciuk/ajax');

module.exports = React.createClass({
  propTypes: {
    imgName: React.PropTypes.String
  },
  getInitialState: function(){
    return { 
      url: './image/',
      isSuccess: 1,
      userName: '',
      password: ''
    };
  },
  handleUserName: function(event){
    this.setState({ userName: event.target.value });
  },
  handlePassword: function(event){
    this.setState({ password: event.target.value });
  },
  handleSubmit: function(event){
    event.preventDefault();

    var userInfo = {
      userName: this.state.userName,
      userPassword: this.state.password
    }
    
    Ajax().post('./login', userInfo).then(function (data){

      if(data.state == 0) {
        //登录失败
        this.setState({ isSuccess: 0 });
      } else {
        //登录成功
        window.location.href = './admin';
      }
    }.bind(this))
  },
  render: function(){
    return (
      <div className = 'login-backgroundImg'>
        <div className = 'login-loginPos'>
          <img src = { this.state.url + this.props.imgName } className = 'login-userImg' />
          <form className = 'login-inputGroup'
            method = 'POST'
            action = './login'
            onSubmit = { this.handleSubmit }>
            <ul>
              <li>
                <label htmlFor = 'userName'>Name: </label>
                <input 
                  type = 'text' 
                  name = 'userName'
                  id = 'userName'
                  value = { this.state.userName }
                  onChange = { this.handleUserName } />
                { this.state.isSuccess == 0 ?  <i className = 'fa fa-times login-icon'></i> : '' }
              </li>
              <li>
                <label htmlFor = 'userPassword'>Password: </label>
                <input 
                  type = 'password' 
                  name = 'userPassword' 
                  id = 'userPassword'
                  value = { this.state.password } 
                  onChange = { this.handlePassword } />
                { this.state.isSuccess == 0 ?  <i className = 'fa fa-times login-icon'></i> : '' }
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