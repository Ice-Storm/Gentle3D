var React = require('react');
var Chart = require("react-chartjs");
var PageHead = require('../backPageHead/backPageHead.js');

module.exports = React.createClass({
  propTypes: {
    compontentConfig: React.PropTypes.object,
  },
  getInitialState: function() {
    return {};
  },
  render: function() {
    var data = {
      labels : ["7 day ago","6 day ago","5 day ago","4 day ago","3 day ago","2 day ago","Now"],
      datasets : [
        {
          fillColor : "rgba(151,187,205,0.5)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          data : [28,48,40,19,96,27,100]
        }
      ]
    }

    var dataD = [
      {
        value: 30,
        color:"#d15b47"
      },
      {
        value : 50,
        color : "#87b87f"
      }
    ]
    var dataZ = {
      labels : ["Eating","Drinking","Sleeping","Designing","Coding","Partying","Running"],
      datasets : [
        {
          fillColor : "rgba(220,220,220,0.5)",
          strokeColor : "rgba(220,220,220,1)",
          pointColor : "rgba(220,220,220,1)",
          pointStrokeColor : "#fff",
          data : [65,59,90,81,56,55,40]
        },
        {
          fillColor : "rgba(151,187,205,0.5)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          data : [28,48,40,19,96,27,100]
        }
      ]
    }
    var LineChart = Chart.Line;
    var DoughnutChart = Chart.Doughnut;
    var RadarChart = Chart.Radar;
    return (
      <div>
        <PageHead pageHeadString = { 'Web State' } pageHeadIsHaveButton = { 'false' }/>  
        <div className = 'indexControlCompontent-numChartPos'>
          <LineChart data={data} className = 'indexControlCompontent-numChart'/>
          <span >最近七天访问量统计</span>
        </div>
        <div className = 'indexControlCompontent-memChartPos'>
          <DoughnutChart data={dataD} className = 'indexControlCompontent-memChart'/>
          <span>Memory</span>
          <RadarChart data = {dataZ} className = 'indexControlCompontent-cpuChart'/>
          <span style = {{ 'margin-top': '-20px', 'margin-left': '25%'}}>CPU</span>
        </div>
      </div>
    );
  }
})