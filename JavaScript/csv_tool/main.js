
var tableData =[];
var numericalData = [];
//var paramsData = [];
var indexCol = [];
var protocol = 'OJIP';
// params gives slice points for parameters from 1) OJIP protocol (466, 493) 2) NPQ protocols (754, 824)
//var params = [466, 493, 754, 824];
//var OJIPdata = [8, 465];     // 2001621 : 458
// NPQ slice points depend on the protocol: 1 2 3
//var NPQdata = [505, 983]; // 504, 983
var slicePoints = [];

document.getElementById('protocol').onchange = function() {
    protocol = document.getElementById("protocol").options[this.selectedIndex].text;
};

  function readSingleFile(evt) {
  var delimiter = document.getElementById('delimiter').value;
  var separator = document.getElementById('decimal').value;

    var f = evt.target.files[0];
    if (f) {
      var r = new FileReader();

      r.onload = function(e) {
          var contents = e.target.result;

          info.innerHTML = ("File <mark>" + f.name + "</mark> uploaded! " + " <b>" + f.type + "</b> " + " " + f.size/1000 + " kB");

          var lines = contents.split("\n");
          var array = []
          for (var i=0; i<lines.length; i++){
              if (delimiter == 'tab') { array[i] = lines[i].split("\t"); }
              else { array[i] = lines[i].split(delimiter); }
          }
          indexCol = array.map(x => x[0]);
          indexCol = indexCol.slice(5, 983);
          const startOJIP = indexCol.indexOf("21");
          const startNPQ1 = indexCol.indexOf("2443101");
          const startNPQ2 = indexCol.indexOf("207601");

          if (protocol == 'OJIP') { slicePoints = [startOJIP, startOJIP+457]; } // sliceParams = params.slice(0,2); }
          else if (protocol == 'NPQ1') { slicePoints = [startNPQ1, startNPQ1+159]; } // sliceParams = params.slice(2,4);}
          else if (protocol == 'NPQ2') { slicePoints = [startNPQ2, startNPQ2+249]; } // sliceParams = params.slice(2,4);}
          else if (protocol == 'NPQ3') { slicePoints = [startNPQ2, startNPQ2+164]; } // sliceParams = params.slice(2,4);}
          else { alert('Protocol error!'); }

          numericalData = []; tableData = [];
          tableData.push(indexCol);
          //numericalData.push(indexCol.slice(slicePoints[0]+2,slicePoints[1]));

          for(var col=0; col<array[7].length; col++) {
            if (array[7][col] == protocol) {
              var column = array.map(x => x[col]);

              tableData.push(column.slice(5, 983));
              //numericalData.push(column.slice(slicePoints[0]+2,slicePoints[1]));
              //paramsData.push(column.slice(sliceParams[0], sliceParams[1]));
            }
          }

          var tableDataT = tableData[0].map((_, colIndex) => tableData.map(row => row[colIndex]));
          makeTable(tableDataT);
     }
      r.readAsText(f);
    } else {
      alert("Failed to load file");
    }
  }
  document.getElementById('fileinput').addEventListener('change', readSingleFile);

// ===========================================
