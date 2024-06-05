
var parameter = ''; var displayLegend = false;

var colors = ['blue', 'orange', 'dodgerblue', 'red', 'olive', 'yellow', 'green', 'grey', 'purple',
              'aqua', 'brown', 'chartreuse', 'darkblue', 'darkorange', 'darkviolet', 'darkgreen', 'lime', 'darkcyan',
              'khaki', 'navy', 'maroon', 'pink', 'teal', 'tan', 'turquoise', 'tomato', 'greenyellow',
              'blue', 'orange', 'cyan', 'red', 'olive', 'yellow', 'green', 'grey', 'purple',
              'aqua', 'brown', 'chartreuse', 'darkblue', 'darkorange', 'darkviolet', 'darkgreen', 'lime', 'darkcyan',
              'khaki', 'navy', 'maroon', 'pink', 'teal', 'tan', 'turquoise', 'tomato', 'greenyellow',
             ];

/*
var colors = ['#00f', '#f00', '#0f0', '#008', '#800', '#080', '#f0f', '#088', '#880', '#808', '#80f', '#f80', '#8f0', '#ff0', '#0ff', '#888',
              '#0f8', '#08f', '#88f', '#8f8', '#f8f',
              '#00f', '#f00', '#0f0', '#008', '#800', '#080', '#f0f', '#088', '#880', '#808', '#80f', '#f80', '#8f0', '#ff0', '#0ff', '#888',
              '#0f8', '#08f', '#88f', '#8f8', '#f8f',
              '#00f', '#f00', '#0f0', '#008', '#800', '#080', '#f0f', '#088', '#880', '#808', '#80f', '#f80', '#8f0', '#ff0', '#0ff', '#888',
              '#0f8', '#08f', '#88f', '#8f8', '#f8f',
             ];
             */

function loopDataParams(indices) {
  dataSets = []; var dataSet = {}; labels = []; var newData = []; //parameter = document.getElementById("parameter").value;

    if ((protocol != 'OJIP') && ((parameter == 'QY') || (parameter == 'Qp') || (parameter == 'NPQ') || (parameter == 'Fm'))) {
      indices.forEach((index, i) => {
        labels.push(tbl.children[0].rows[0].childNodes[index].innerText);
        const indexL1 = indexCol.indexOf(parameter + '_L1');
        const indexD1 = indexCol.indexOf(parameter + '_D1');
        const extParams = [].concat(tableData[index].slice(indexL1, indexL1 + 10), tableData[index].slice(indexD1, indexD1 + 7));

        dataSet = {
          label: labels[i],
          data: extParams,
          lineTension: 0,
          fill: false,
          borderColor: colors[i],// "hsl("+ colors[i] +", 100%, 50%)",
        };dataSets.push(dataSet);
      });
    }

    else if (parameter == 'Phi_Ro') {
      const fiI = indexCol.indexOf('Fi'); const fmI = indexCol.indexOf('Fm'); // const fmI = fiI+1;
        indices.forEach((index, i) => {
          var fm = parseFloat(tbl.children[0].rows[fmI].childNodes[index].innerText);
          var fi = parseFloat(tbl.children[0].rows[fiI].childNodes[index].innerText);
          var PhiRo = (fm - fi) / fm;

          newData.push(PhiRo);
          labels.push(tbl.children[0].rows[0].childNodes[index].innerText);

          dataSet = {
            label: parameter, // none
            data: newData,
            fill: true,
            backgroundColor: colors,
          };
      }); dataSets.push(dataSet);
    }

    else {
      indices.forEach((index, i) => {
        const indexParam = indexCol.indexOf(parameter);
        newData.push(tbl.children[0].rows[indexParam].childNodes[index].innerText);
        labels.push(tbl.children[0].rows[0].childNodes[index].innerText);

          dataSet = {
            label: parameter, // none
            data: newData,
            backgroundColor: colors,
          };
      }); dataSets.push(dataSet);
    }
}
//document.getElementById('drawParams').onclick(parameter = document.getElementById('drawParams').innerHTML);
function drawParameters() {
  var speedCanvas = removeFlicker();

  if (colsSelected.length === 0) { alert('Error! Column(s) not selected!'); return; }
  else { loopDataParams(colsSelected); }

  if (protocol == 'OJIP') { // spider diagram : OJIP; line graphs : NPQ
    var type = 'bar';
    var speedData = {
      labels: labels, //labels: ["0s", "10s", "20s", "30s", "40s", "50s", "60s"], NONE!
      datasets: dataSets
    };

    displayLegend = false;
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

      displayLegend = true;
    }
    if (parameter == 'Rfd') {
      var type = 'bar';
      var speedData = {
        labels: labels, //labels: ["0s", "10s", "20s", "30s", "40s", "50s", "60s"], NONE!
        datasets: dataSets
      };

      displayLegend = false;
    }
  }

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

    var chartOptions = {

      legend: {
        display: displayLegend,
        position: 'right',
        labels: {
          boxWidth: 40,
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

