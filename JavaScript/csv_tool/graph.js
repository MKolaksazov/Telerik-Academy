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
var labels = [];
//var speedCanvas = document.getElementById("myChart");

Chart.defaults.defaultFontFamily = "Lato, sans-serif"; // for version v2 Chart.defaults.global.defaultFontSize = 16;
Chart.defaults.defaultFontSize = 16;
//checked(checkboxes);
function loopData(indices) {
  dataSets = [];
  indices.forEach((index, i) => {

    var inputData = [tableData[0].slice(slicePoints[0],slicePoints[1]),tableData[index].slice(slicePoints[0],slicePoints[1])];

    var JsonObject = JSON.parse(JSON.stringify(inputData));
    var newData = arr2obj(JsonObject);
    const sampleLabel = tbl.children[0].rows[0].childNodes[index].getElementsByClassName("sampleLabel")[0].value;

      const dataSet = {
        label: sampleLabel,
        data: newData, // [12,1231,123,123,123,123,241,323,231,232], //
        lineTension: 0,
        fill: false,
        borderColor: colors[i], // "hsl("+ Math.round(i*(360/indices.length)) +", 100%, 50%)",
      };

      dataSets.push(dataSet);
  });
}

function removeFlicker() {
  // Checks if the element canvas exists otherwise removes it to avoid flickering (overlapping) of graphs
  if (document.getElementById('myChart') !== undefined && document.getElementById('myChart') !== null) {
    document.getElementById('myChart').remove(); }
  var canvasContainer = document.getElementById('canvasContainer');
  var speedCanvas = document.createElement('canvas');
  speedCanvas.setAttribute('id', 'myChart');
  // speedCanvas.style.height = '500px';
  speedCanvas.style.width = 'max-content';
  canvasContainer.appendChild(speedCanvas);

  return speedCanvas;
}


function drawGraph(protocol) {
  if (colsSelected.length === 0) { alert('Error! Column(s) not selected!'); return; }   //else {  }

  var speedCanvas = removeFlicker();

  closeButton();
  loopData(colsSelected);

  if (protocol == 'OJIP') {

    var speedData = {
      //labels: ["0s", "10s", "20s", "30s", "40s", "50s", "60s"], NONE!
      datasets: dataSets
    };
// migrations from chartjs version 2 to version 3 affected the coding of the scales
     var scales =  {
      x: {
          title: {
              display: true,
              text: 'time [ms] (log base 10)',
          },
          type: 'logarithmic',
          ticks: {
              min: 20, //minimum tick
              max: 2000000, //maximum tick
              maxTicksLimit: 20,

              callback: function (value, index, values) {
                  if (value === 1000000) return "1000";
                  if (value === 100000) return "100";
                  if (value === 10000) return "10";
                  if (value === 1000) return "1";
                  if (value === 100) return "0.1";
                  //if (value === 10) return "0.01";
                  //if (value === 1) return "0.001";
                  return null;
              }

          },
          //
          //     afterBuildTicks: function (chartObj) { //Build ticks labelling as per your need
          //         chartObj.ticks = [];
          //         chartObj.ticks.push(100);
          //         chartObj.ticks.push(1000);
          //         chartObj.ticks.push(10000);
          //         chartObj.ticks.push(100000);
          //         chartObj.ticks.push(1000000);
          //     }

      },
      y: {
          display: true,
          title: {
              display: true,
              text: "[a.u.]"
          },
          ticks: {
              min: 0, //minimum tick
              //max: 70000, //maximum tick
          },
      }
    };
  }
  else {
    var speedData = {
      //labels: labels, // ["0s", "10s", "20s", "30s", "40s", "50s", "60s", "70s", "80s", "80s", "100s"], //
      datasets: dataSets
    };

     var scales =  {

      x: {
          title: {
              display: true,
              text: 'time [min]',
          },
          type: 'linear', //max:
          min: 207601,

          ticks: {
              //min: 207601, //minimum tick
              //max: 2000000, //maximum tick
              //maxTicksLimit: 20,
              //stepsize: 120008201,
              callback: function (value, index, values) {
                return Math.round((value - 1) / 60000000);
              }
          },
          // afterBuildTicks: function (chartObj) { //Build ticks labelling as per your need
          //     chartObj.ticks = [];
          //     chartObj.ticks.push(207601);
          //     chartObj.ticks.push(120008201);
          //     chartObj.ticks.push(240520101);
          //     chartObj.ticks.push(359220701);
          //     chartObj.ticks.push(480913301);
          // },
      },

      y: {
          display: true,
          title: {
              display: true,
              text: "[a.u.]"
          },
          ticks: {
              min: 0, //minimum tick
              // max: 20000, //maximum tick
          },
      }

  };}

var chartOptions = {

  legend: {
    display: true,
    position: 'right',
    labels: {
      boxWidth: 40,
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

