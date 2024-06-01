
function addVariant() {

    var newRow = document.createElement('div');
    var samples = document.getElementById('nSamples').value;
    var idName = 'row_' + classID;

    cont.appendChild(newRow);
    newRow.classList.add('input-group', 'mb-3', 'row', 'g-3', "form-horizontal");
    newRow.setAttribute('id', idName);

    var label = document.createElement('label');
    label.classList.add('input-group-text', 'col-sm');
    label.innerHTML = document.getElementById('name').value;
    labels.push(document.getElementById('name').value);
    newRow.appendChild(label);
    var dilution = document.createElement('label');
    dilution.setAttribute("id",`dilute`);
    dilution.classList.add('input-group-text', 'col-sm');
    dilution.innerHTML = document.getElementById('dilution').value;
    newRow.appendChild(dilution);
    var method = document.createElement('label');
    method.classList.add('input-group-text', 'col-sm');
    method.innerHTML = document.getElementById('method').value;
    newRow.appendChild(method);

    for (i = 0; i < samples; i++) {
            var cell = document.createElement('input');
            cell.setAttribute("id",`input_${i}`);
            cell.classList.add('form-control', 'col-sm', 'req');
            cell.setAttribute("type", "number");
            newRow.appendChild(cell);
        }

    var del = document.createElement('button');
    del.classList.add('form-control', 'col-sm', 'btn', 'btn-danger', 'btn-sm', 'delete');
    del.innerHTML = "remove";
    del.setAttribute('id', idName + i);
    del.setAttribute('onclick', 'removeRow("'+idName+'");');
    newRow.appendChild(del);

    classID += 1;
}

function populateOptions(id, res) {
    var list = document.getElementById(id);
    res.forEach((item) => {
        var option = document.createElement('option');
        option.value = item[0];
        list.appendChild(option);
    });
}

function removeRow(idRow) {
  var currentRow = document.getElementById(idRow);
  currentRow.remove();
}

function drawCalibration() {
  //var methodIndex = checkIndex();
  //setValues(methods[methodIndex][1].a, methods[methodIndex][1].b, methods[methodIndex][1].epsylon);

  calculate();
  drawLine();
}

function barGraph() {
  //calculate();
  drawBar(calculate());
}

function calculate() {
  for (var i = 0; i < cont.children.length; i++) {
    var inputs = cont.children[i].getElementsByTagName('input'); var row = [];
    var methodIndex = checkIndex(cont.children[i].children[2].innerHTML);

    for (var j = 0; j < inputs.length; j++) {
      row.push(parseFloat(inputs[j].value));
    }

    dilutions.push([methodIndex,
      parseFloat(cont.children[i].children[1].innerHTML), average(row)]);
    calibration.push(row);
  }

  var calculated = [[],[],[]];

  dilutions.forEach((x, i) => {
    calculated[dilutions[i][0]].push(
      (dilutions[i][2] + methods[dilutions[i][0]][1].b)
      / methods[dilutions[i][0]][1].a * dilutions[i][1]);
  });

  console.log(calibration, dilutions, calculated);
  return calculated;
}

function drawBar(calculated) {
    if (!calculated) { alert('Error! Unavailable data!'); return; }

  var data = {
      labels: labels,
      datasets: [
          {
              label: "PM",
              backgroundColor: "blue",
              data: calculated[0]
          },
          {
              label: "FRAP",
              backgroundColor: "red",
              data: calculated[1]
          },
          {
              label: "Folin",
              backgroundColor: "green",
              data: calculated[2]
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

function setValues(a, b, epsylon) {
  document.getElementById("a").value = a;
  document.getElementById("b").value = b;
  document.getElementById("epsylon").value = epsylon;
}

function arr2obj(arr) {
    let obj = [{}];
      for (var n=0; n<arr.length; n++) {
        let x = arr[n][1];
        let y = arr[n][2];
        obj.push({x:x, y:y});
      }
    return obj;
}

function calculateRegression() {

    var a = [];
    var b = [];
    for (i = 0; i<dilutions.length-1; i++) {
      a.push((dilutions[i+1][2] - dilutions[i][2])
        / (dilutions[i+1][1] - dilutions[i][1]));
      b.push(dilutions[i][2] - (a[i] * dilutions[i][1]));
    }

    regression = [{ x: 0, y: b }];
    for (i = 0; i<dilutions.length; i++) {
      regression.push({ x: dilutions[i][1], y: a * dilutions[i][1] + b});
    }

    return [average(a), average(b), regression];
}


function drawLine() {

  if (dilutions.length === 0) { alert('Error! Unavailable data!'); return; }
  //else { loopData(dilutions); }
  try {
    var [a, b, regression] = calculateRegression();
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
        data: arr2obj(dilutions),
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

function checkIndex(method) {
    var indexElem = 0;
    methods.forEach((x, i) => { if (method == x[0]) { indexElem = i; } });
    return indexElem;
}
