var React = require('react');

module.exports = React.createClass({
  //生成页面展示主体部分
  propTypes: {
    contentInfo: React.PropTypes.array,
    // title的值必须 unique
    title: React.PropTypes.string
  },
  getInitialState: function() {
    return  {url: './image/show/'};
  },
  //生成图文
  createContent: function(arr) {
    var content = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].sort == this.props.title) {
        content.push(
          <div className = 'showContent-example'>
            <div style = {{ border: '2px solid #dedede', width: '75%'}}>
              <img src = { this.state.url + arr[i].imgSrc } style = {{ width: '98%', margin: '1%' }}/>
            </div>
            <div>
              <span className = 'showContent-font'>
              {
                 arr[i].content ? <div style = {{'padding': '13px'}}>{ arr[i].content }</div> : null
              }
              </span>
            </div>
          </div>
        );
      }
    }
    return content;
  },
  render: function() {
    var that = this;
    return (
      <div className = 'showContent-content'>
        <span className = 'showContent-title'>{ that.props.title }</span>
        { that.createContent(this.props.contentInfo) }
      </div>
    );
  }
})