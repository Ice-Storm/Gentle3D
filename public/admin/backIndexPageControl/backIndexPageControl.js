var React    = require('react');
var Ajax     = require('@fdaciuk/ajax');
var Chart    = require("react-chartjs");
var PageHead = require('../backPageHead/backPageHead.js');
require('./backIndexPageControl.css');

module.exports = React.createClass({
  propTypes: {
    source: React.PropTypes.string,
    compontentConfig: React.PropTypes.object
  },
  componentWillMount: function(){
    Ajax().get('./admin/indexControl').then(function (response, xhr){
      this.setState({
        visite: response.visite,
        mem: response.mem,
        cpu: response.cpu
      })
    }.bind(this));
  },
  getInitialState: function(){
    return {
      compontentConfig: this.props.compontentConfig,
      visite: {
        labels : ["6 day ago","5 day ago","4 day ago","3 day ago","2 day ago","1 day ago","Now"],
        datasets : [
          {
            fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            pointColor : "rgba(151,187,205,1)",
            pointStrokeColor : "#fff",
            data : [0, 0, 0, 0, 0, 0, 0]
          }
        ]
      },
      mem: [
        {
          value: 30,
          color:"#d15b47"
        },
        {
          value : 50,
          color : "#87b87f"
        }
      ],
      cpu: {
        labels : ["speed", "user", "nice", "sys", "idle", "irq"],
        datasets : [
          {
            fillColor : "rgba(220,220,220,0.5)",
            strokeColor : "rgba(220,220,220,1)",
            pointColor : "rgba(220,220,220,1)",
            pointStrokeColor : "#fff",
            data : [0, 0, 0, 0, 0, 0]
          }
        ]
      }
    };
  },
  ajaxGet: function(url){
    var interval = 30000;
    var that = this;
    
    var timer = setInterval(function(){
      Ajax().get(url).then(function (response, xhr){
        that.setState({
          visite: response.visite,
          mem: response.mem,
          cpu: response.cpu
        });
        clearInterval(timer);
      })
    }, interval);
  },
  render: function(){
    var LineChart = Chart.Line;
    var DoughnutChart = Chart.Doughnut;
    var RadarChart = Chart.Radar;

    this.ajaxGet(this.props.source);
    
    return (
      <div>
        <PageHead pageHeadString = { 'Web State' } pageHeadIsHaveButton = { false } />  
        <div className = 'indexControlCompontent-numChartPos'>
          <LineChart data={ this.state.visite } className = 'indexControlCompontent-numChart' />
          <span >最近七天访问量统计</span>
        </div>
        <div className = 'indexControlCompontent-memChartPos'>
          <DoughnutChart data={ this.state.mem } className = 'indexControlCompontent-memChart' />
          <span>Memory</span>
          <RadarChart data = { this.state.cpu } className = 'indexControlCompontent-cpuChart' />
          <span style = {{ 'marginop': '-20px', 'margin-left': '40%'}}>CPU</span>
        </div>
      </div>
    );
  }
})