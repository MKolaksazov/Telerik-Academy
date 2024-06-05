
var tableData =[];
var indexCol = [];
//var protocol = 'OJIP';

// params gives slice points for parameters from 1) OJIP protocol (466, 493) 2) NPQ protocols (754, 824) // var params = [466, 493, 754, 824];
//var OJIPdata = [8, 465]; // 2001621 : 458
//var NPQdata = [505, 983]; // 504, 983 // NPQ slice points depend on the protocol: 1 2 3
var slicePoints = [];

function setProtocol(options) {
  var protocol = options[options.selectedIndex].text;
  document.getElementById('makeAvg').setAttribute('onclick', `makeAverave('${protocol}')`);
  document.getElementById('makeGr').setAttribute('onclick', `drawGraph('${protocol}')`);
  document.getElementById('drawParams').setAttribute('onclick', `drawParameters('${protocol}')`);
  return protocol;
}

document.getElementById('protocol').onchange = function(protocol = 'OJIP') {
  var protocol = setProtocol(this);

  // optionsArray
  if (protocol == "OJIP") {
    var optionsArr = ["Fo", "Fm", "Phi_Po", "Phi_Eo", "Phi_Ro", "Phi_Do", "Pi_Abs", "ABS/RC", "TRo/RC", "ETo/RC", "DIo/RC"];
  }
  else {
    var optionsArr = ["Rfd", "Fm", "NPQ", "Qp", "QY"];
  }
  const selectEl = document.getElementById("parameters");
  // reset the array every time
  while (selectEl.firstChild) {
      selectEl.firstChild.remove()
  }
  /*
  - Loop over optionsArr
  - Create new option element & attach text
  - Append above created option element to select element
  */
  for (optionText of optionsArr) {
    const optionEl = document.createElement("option");
    optionEl.innerText = optionText;
    selectEl.appendChild(optionEl);
  }
};

document.getElementById('parameters').onchange = function() {
    return document.getElementById("parameters").options[this.selectedIndex].text;
};

  function readSingleFile(evt) {
  var delimiter = document.getElementById('delimiter').value;

  if (delimiter == 'knob') { // change CSS style of the buttons
    var knob = document.getElementsByClassName("aqua");

    for(var i = (knob.length - 1); i >= 0; i--) {
      if (knob[i].className == "button aqua") { knob[i].className = "input-group-text aqua"; }
      else { knob[i].className = "button aqua"; }
    }
  }

    var f = evt.target.files[0];
    if (f) {
      var r = new FileReader();

      r.onload = function(e) {
          var contents = e.target.result;

          info.innerHTML = ("File <mark>" + f.name + "</mark> uploaded! " + " <b>" + f.type + "</b> " + " " + f.size/1000 + " kB");

          var lines = contents.split("\n");
          var array = [];
          for (var i=0; i<lines.length; i++){
              if (delimiter == 'tab') { array[i] = lines[i].split("\t"); }
              else { array[i] = lines[i].split(delimiter); }
          }
          indexCol = array.map(x => x[0]);
          indexCol = indexCol.slice(5, 983);
          const startOJIP = indexCol.indexOf("21");
          const startNPQ1 = indexCol.indexOf("2443101");
          const startNPQ2 = indexCol.indexOf("207601");

          var protocol = setProtocol(document.getElementById('protocol'));

          if (protocol == 'OJIP') { slicePoints = [startOJIP, startOJIP+457]; }
          else if (protocol == 'NPQ1') { slicePoints = [startNPQ1, startNPQ1+159]; }
          else if (protocol == 'NPQ2') { slicePoints = [startNPQ2, startNPQ2+249]; }
          else if (protocol == 'NPQ3') { slicePoints = [startNPQ2, startNPQ2+164]; }
          else { alert('Protocol error!'); }

          tableData = [];
          tableData.push(indexCol);

          for(var col=0; col<array[7].length; col++) {
            if (array[7][col] == protocol) {
              var column = array.map(x => x[col]);
              // change the decimal separator from ',' to '.' (if available)
              for (var x=0; x<column.length; x++) {
                column[x] = String(column[x]).replace(",", ".");
              }
              tableData.push(column.slice(5, 983));
            }
          }

          makeTable(transpose(tableData));
     }
      r.readAsText(f);
    } else {
      alert("Failed to load file");
    }
  }
  document.getElementById('fileinput').addEventListener('change', readSingleFile);

// ===========================================

function transpose(arrayData) {
  return arrayData[0].map((_, colIndex) => arrayData.map(row => row[colIndex]));
}

/** Convert a 2D array into a CSV string
 */
function arrayToCsv(data){
  return data.map(row =>
    row
    .map(String)  // convert every value to String
    .map(v => v.replaceAll('"', '""'))  // escape double quotes
    .map(v => `${v}`)  // quote it
    .join('\t')  // tab (comma)-separated
  ).join('\t\n');  // rows starting on new lines
}


/** Download contents as a file
 * Source: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
 */

function downloadBlob(content=tableData, filename=`export.csv`, contentType='text/csv;charset=utf-8;') {
  var fname = document.getElementById('export').value;
  filename=`${fname}.csv`;

  if (colsSelected.length > 0) { content = insertSelected(colsSelected); }
  content = transpose(content);

  var times = 5; while(times--) {
    content.unshift([ " " ]);
  }

  var csv = arrayToCsv(content);
  // Create a blob
  var blob = new Blob([csv], { type: contentType });
  var url = URL.createObjectURL(blob);

  // Create a link to download it
  var pom = document.createElement('a');
  pom.href = url;
  pom.setAttribute('download', filename);
  pom.click();
}

function insertSelected(indices) {
  dataSets = [tableData[0]];

  indices.forEach((index, i) => {
    dataSets.push(tableData[index]);
  }); //console.log(dataSets);
  return dataSets;
}

