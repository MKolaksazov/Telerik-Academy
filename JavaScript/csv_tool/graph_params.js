/*
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
*/
var parameter = '';

function loopDataParams(indices) {
  dataSets = []; labels = []; var newData = []; parameter = document.getElementById("parameter").value;

    if ((parameter == 'QY') || (parameter == 'Qp') || (parameter == 'NPQ') || (parameter == 'Fm')) {
      indices.forEach((index, i) => {
        labels.push(tbl.children[0].rows[0].childNodes[index].innerText);
        const indexL1 = indexCol.indexOf(parameter + '_L1') - 5;
        const indexD1 = indexCol.indexOf(parameter + '_D1') - 5;
        const extParams = [].concat(tableData[index].slice(indexL1, indexL1 + 10), tableData[index].slice(indexD1, indexD1 + 7));

        dataGraph = {
          label: labels[i],
          data: extParams,
          lineTension: 0,
          fill: false,
          borderColor: "hsl("+ Math.round(i*(360/indices.length)) +", 100%, 50%)",
        };dataSets.push(dataGraph);
      });
    }

    else {
      indices.forEach((index, i) => {
        const indexParam = indexCol.indexOf(parameter) - 5;
        newData.push(tbl.children[0].rows[indexParam].childNodes[index].innerText);
        labels.push(tbl.children[0].rows[0].childNodes[index].innerText);

          dataGraph = {
            label: parameter,
            data: newData,
            border: true,
            borderColor: "hsl("+ Math.round(i*(360/indices.length)) +", 100%, 50%)",
          };
      }); dataSets.push(dataGraph);
    }
}

function drawParameters() {
  if (colsSelected.length === 0) { alert('Error! Column(s) not selected!'); return; }
  else { loopDataParams(colsSelected); }

  if (protocol == 'OJIP') { // spider diagram : OJIP; line graphs : NPQ
    var type = 'bar';
    var speedData = {
      labels: labels, //labels: ["0s", "10s", "20s", "30s", "40s", "50s", "60s"], NONE!
      datasets: dataSets
    };

     var scales =  {
      xAxes: [{
          scaleLabel: {
              display: true,
          },
      }],
      yAxes: [{
          display: true,
          scaleLabel: {
              display: true,
              labelString: "[a.u.]"
          },
          ticks: {
              min: 0,
          },
      }]
    };
  }
  else { // spider diagram : OJIP; line graphs : NPQ
    if ((parameter == 'QY') || (parameter == 'Qp') || (parameter == 'NPQ') || (parameter == 'Fm')) {
      var type = 'line';
      var indexL1 = indexCol.indexOf(parameter + '_L1');
      var indexD1 = indexCol.indexOf(parameter + '_D1');
      var labelsNPQ = [].concat(indexCol.slice(indexL1, indexL1 + 10), indexCol.slice(indexD1, indexD1 + 7));

      var speedData = {
        labels: labelsNPQ, // ["0s", "10s", "20s", "30s", "40s", "50s", "60s", "70s", "80s", "80s", "100s"], //
        datasets: dataSets
      };

      var scales =  {
        xAxes: [{
            scaleLabel: {
                display: true,
            },
        }],

        yAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: "[a.u.]"
            },
            ticks: {
                min: 0,
            },
        }]

      };
    }
  }

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
      type: type,
      data: speedData,
      options: chartOptions
    });


}

