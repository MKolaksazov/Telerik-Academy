
var tableData =[];
var indexCol = [];
//var protocol = 'OJIP';

// params gives slice points for parameters from 1) OJIP protocol (466, 493) 2) NPQ protocols (754, 824) // var params = [466, 493, 754, 824];
//var OJIPdata = [8, 465]; // 2001621 : 458
//var NPQdata = [505, 983]; // 504, 983 // NPQ slice points depend on the protocol: 1 2 3
var slicePoints = [];

window.onload = function(){
  setProtocol();
}

function getProtocol() {
  var options = document.getElementById('protocol');
  var protocol = options[options.options.selectedIndex].text;
  document.getElementById('makeAvg').setAttribute('onclick', `makeAverage('${protocol}')`);
  document.getElementById('makeGr').setAttribute('onclick', `drawGraph('${protocol}')`);
  document.getElementById('drawParams').setAttribute('onclick', `drawParameters('${protocol}')`);
  return protocol;
}

document.getElementById('protocol').addEventListener('change', setProtocol);

//.onchange =
function setProtocol() {
  var protocol = getProtocol();
  // optionsArray
  if (protocol == "OJIP") {
    var optionsArr = [
    "Phi_Po",
    "Phi_Eo",
    "Psi_o",
    "Phi_Ro",
    "Phi_Do",
    "Pi_Abs",
    "ABS/RC",
    "TRo/RC",
    "ETo/RC",
    "DIo/RC",
    "Fo",
    "Fj",
    "Fi",
    "Fm",
    "Area",
    "Mo",
    "Fix Area",
    "HACH Area",
    "Vj",
    "Vi",
    "Bckg",
    "N",
    ];
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

          var protocol = getProtocol();

          if (protocol == 'OJIP') { slicePoints = [startOJIP, startOJIP+457]; }
          else if (protocol == 'NPQ1') { slicePoints = [startNPQ1, 159+startNPQ1]; }
          else if (protocol == 'NPQ2') { slicePoints = [startNPQ2, 249+startNPQ2]; }
          else if (protocol == 'NPQ3') { slicePoints = [startNPQ2, "282312701"]; }   // startNPQ2+164]; }
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




