function checkIndex(method) {
    var index = 0;
    methods.forEach((x, i) => { if (method == x[0]) { index = i; } });
    return index;
}

function arr2obj(arr) {
    let obj = [{}];
      for (var n=0; n<arr.length; n++) {
        let x = arr[n][0];
        let y = arr[n][1];
        y.forEach(y => {
          obj.push({x:x, y:y});
        });
      }
    return obj;
}

function setValues(a, b, epsylon) {
  document.getElementById("a").value = a;
  document.getElementById("b").value = b;
  document.getElementById("epsylon").value = epsylon;
}

function removeRow(idRow) {
  document.getElementById(idRow).remove();
}

function calibrationGraph() {
  drawLine(calculateDilutions());
}

function barGraph() {
  drawBar(calculateMethods());
}

function populateOptions(id, res) {
    var list = document.getElementById(id);
    res.forEach((item) => {
        var option = document.createElement('option');
        option.value = item[0];
        list.appendChild(option);
    });
}
