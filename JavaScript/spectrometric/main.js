
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

function calculateMethods() {
  var [results, c] = calculateDilutions();
  var resultsAllMethods = [[],[],[]];

  results.forEach((x, i) => {
    var indexOfMethod = results[i][0];
    resultsAllMethods[indexOfMethod].push(
      (results[i][2] + methods[indexOfMethod][1].b)
      / methods[indexOfMethod][1].a * results[i][1]);
  });

  return resultsAllMethods;
}

function calculateDilutions() {
  var tableSamples = [];
  var calibration = [];
  for (var i = 0; i < cont.children.length; i++) {
    var row = [];
    var inputs = cont.children[i].getElementsByTagName('input');
    var methodIndex = checkIndex(cont.children[i].children[2].innerHTML);
    var dilutions = parseFloat(cont.children[i].children[1].innerHTML);

    for (var j = 0; j < inputs.length; j++) {
      row.push(parseFloat(inputs[j].value));
    }

    tableSamples.push([methodIndex, dilutions, average(row)]);
    calibration.push([dilutions, row]);
  }
  return [tableSamples, calibration];
}

function calculateRegression(results) {

    var a = [];
    var b = [];
    for (i = 0; i<results.length-1; i++) {
      a.push((results[i+1][2] - results[i][2])
        / (results[i+1][1] - results[i][1]));
      b.push(results[i][2] - (a[i] * results[i][1]));
    }

    regression = [{ x: 0, y: average(b) }];
    for (i = 0; i<results.length; i++) {
      regression.push({ x: results[i][1], y: average(a) * results[i][1] + average(b)});
    }
    
    return [average(a), average(b), regression];
}
