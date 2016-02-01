var React = require('react');
var Chart = require("react-chartjs");
var PageHead = require('../backPageHead/backPageHead.js');

module.exports = React.createClass({
  propTypes: {
    compontentConfig: React.PropTypes.object,
  },
  componentWillMount: function(){
    var that = this;
    $.get('./admin/indexControl', function(data){
      that.setState({
        visite: data.visite,
        mem: data.mem,
        cpu: data.cpu
      })
    });
  },
  getInitialState: function() {
    return {
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
        labels : ["speed","user","sys","idle","irq","nice"],
        datasets : [
          {
            fillColor : "rgba(220,220,220,0.5)",
            strokeColor : "rgba(220,220,220,1)",
            pointColor : "rgba(220,220,220,1)",
            pointStrokeColor : "#fff",
            data : [0, 0, 0, 0, 0, 0, 0]
          }
        ]
      }
    };
  },
  ajaxGet: function(url) {
    var that = this;
    var interval = 30000;

    setInterval(function(){
      $.get(url, function(data){
        that.setState({
         visite: data.visite,
         mem: data.mem,
         cpu: data.cpu
        })
      })  
    }, interval)    
  },
  render: function() {
    console.log(this.props.compontentConfig);
    var LineChart = Chart.Line;
    var DoughnutChart = Chart.Doughnut;
    var RadarChart = Chart.Radar;
    this.ajaxGet('./admin/indexControl');
    return (
      <div>
        <PageHead pageHeadString = { 'Web State' } pageHeadIsHaveButton = { 'false' }/>  
        <div className = 'indexControlCompontent-numChartPos'>
          <LineChart data={ this.state.visite } className = 'indexControlCompontent-numChart'/>
          <span >最近七天访问量统计</span>
        </div>
        <div className = 'indexControlCompontent-memChartPos'>
          <DoughnutChart data={ this.state.mem } className = 'indexControlCompontent-memChart'/>
          <span>Memory</span>
          <RadarChart data = { this.state.cpu } className = 'indexControlCompontent-cpuChart'/>
          <span style = {{ 'margin-top': '-20px', 'margin-left': '25%'}}>CPU</span>
        </div>
      </div>
    );
  }
})