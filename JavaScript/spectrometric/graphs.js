function drawLine(results) {

  if (results[1].length === 0) { alert('Error! Unavailable data!'); return; }
  //else { loopData(dilutions); }
  try {
    var [a, b, regression] = calculateRegression(results[0]);
  }
  catch {
    alert("Error! At least two points must be uploaded to set a calibration curve.");
  }

  setValues(a, b, a*1000);




  /*
  console.log(a, b, regression);
  var json = {
  "PM": {
    "a": a,
    "b": b
  },
  "FRAP": {
    "a": a,
    "b": b
  },
  "Folin": {
    "a": a,
    "b": b
  }
};
  (json) => {
    fs.writeFile(targetUrl, JSON.stringify(json), (err) => {
        if (err) {
            throw new Error('Something went wrong.')
        }
        console.log('JSON written to file. Contents:');
        console.log(fs.readFileSync('test.json', 'utf-8'))
    })
}
*/

  var myChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'data',
        data: arr2obj(results[1]),
        borderColor: 'black',
      },{
        label: 'regression line',
        data: regression,
        borderColor: 'blue',
        backgroundColor: 'transparent',
        type: 'line'
      }],
    },
    options: {

        scales: {
          xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: titleUnits
                },
                ticks: {
                    min: 0,
                }
            }],

        yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'OD'
              },
              ticks: {
                  min: 0,
              }
          }]
        },
      }
    });

}

function drawBar(results) {
    if (!results) { alert('Error! Unavailable data!'); return; }

  var data = {
      labels: labels,
      datasets: [
          {
              label: "PM",
              backgroundColor: "blue",
              data: results[0]
          },
          {
              label: "FRAP",
              backgroundColor: "red",
              data: results[1]
          },
          {
              label: "Folin",
              backgroundColor: "green",
              data: results[2]
          }
      ]
  };

  var myBarChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
          barValueSpacing: 20,
          scales: {
            yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: titleUnits
                  },
                  ticks: {
                      min: 0,
                  }
              }]
          }
      }
  });
}
