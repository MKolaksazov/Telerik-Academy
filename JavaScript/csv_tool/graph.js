
// ! a function to convert 2d array to json array with the object format: { x: ..., y: ... }
// initialize function
function arr2obj(arr) {
  // make object
    let obj = [{}];
  // loop through array
      for (var n=0; n<arr[0].length; n++) {
        let x = arr[0][n];
        let y = arr[1][n];
        // push new item into object
        obj.push({x:x, y:y});
      }
      // return object
    return obj;
}

var dataSets = [];
var dataGraph = [];
var speedCanvas = document.getElementById("myChart");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 12;
//checked(checkboxes);
function loopData(indices) {
  dataSets = [];
  indices.forEach((index) => {
      var inputData = [data[0].slice(3,slicePoints[1]),data[index].slice(3,slicePoints[1])];
      var JsonObject = JSON.parse(JSON.stringify(inputData));
      if (protocol == 'OJIP') { var newData = arr2obj(JsonObject); }
      else { var newData = inputData; }

      dataGraph = {
        label: protocol + " " + index,
        data: newData,
        lineTension: 0,
        fill: false,
        borderColor: "hsl("+ (index*1000)/360 +", 100%, 50%)"
      };

      dataSets.push(dataGraph);
  });
}

function makeGraph() {

  if (colsSelected.length === 0) { alert('Error! Column(s) not selected!'); }

  if (protocol == 'OJIP') {
     var scales =  {
      xAxes: [{
          scaleLabel: {
              display: true,
              labelString: 'time [ms] (log base 10)',
          },
          type: 'logarithmic',
          ticks: {
              min: 20, //minimum tick
              max: 2000000, //maximum tick
              maxTicksLimit: 20,
              callback: function (value, index, values) {
                  if (value === 1000000) return "";
                  if (value === 100000) return "1000";
                  if (value === 10000) return "100";
                  if (value === 1000) return "10";
                  if (value === 100) return "1";
                  if (value === 10) return "0.1";
                  if (value === 1) return "0.01";
                  return null;
              }
          },
              afterBuildTicks: function (chartObj) { //Build ticks labelling as per your need
                  chartObj.ticks = [];
                  chartObj.ticks.push(100);
                  chartObj.ticks.push(1000);
                  chartObj.ticks.push(10000);
                  chartObj.ticks.push(100000);
                  chartObj.ticks.push(1000000);
              }
      }],
      yAxes: [{
          display: true,
          scaleLabel: {
              display: true,
              labelString: "[a.u.]"
          },
          ticks: {
              min: 0, //minimum tick
              max: 70000, //maximum tick
          },
      }]
    }
  }
  else { var scales = {

      xAxes: [{
          scaleLabel: {
              display: true,
              labelString: 'time [ms]',
          },
          //type: 'logarithmic',
          ticks: {
              min: 0, //minimum tick
              max: 200000000, //maximum tick
              maxTicksLimit: 20,
              callback: function (value, index, values) {
                  if (value === 1000000) return "";
                  if (value === 100000) return "1000";
                  if (value === 10000) return "100";
                  if (value === 1000) return "10";
                  if (value === 100) return "1";
                  if (value === 10) return "0.1";
                  if (value === 1) return "0.01";
                  return null;
              }
          },
              afterBuildTicks: function (chartObj) { //Build ticks labelling as per your need
                  chartObj.ticks = [];
                  chartObj.ticks.push(100);
                  chartObj.ticks.push(1000);
                  chartObj.ticks.push(10000);
                  chartObj.ticks.push(100000);
                  chartObj.ticks.push(1000000);
              }
      }],
      yAxes: [{
          display: true,
          scaleLabel: {
              display: true,
              labelString: "[a.u.]"
          },
          ticks: {
              min: 0, //minimum tick
              max: 70000, //maximum tick
          },
      }]

  }}


  loopData(colsSelected);

var speedData = {
  //labels: ["0s", "10s", "20s", "30s", "40s", "50s", "60s"], NONE!
  datasets: dataSets
};

var chartOptions = {

  legend: {
    display: true,
    position: 'top',
    labels: {
      boxWidth: 80,
      fontColor: 'black'
    }
  },

  scales: scales
};

var lineChart = new Chart(speedCanvas, {
  type: 'line',
  data: speedData,
  options: chartOptions
});

}

