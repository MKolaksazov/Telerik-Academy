
var chemicals = ["ammonium molybdate tetrahydrate ((NH4)6Mo7O₂4.4H₂O)",
  "potassium phosphate dibasic (K₂HPO4)", "potassium phosphate monobasic (KH₂PO4)", "H₂SO4", "TPTZ", "FeCl₃", "C₂H₃NaO₂", "HCl"];
var molarity = [1235.86, 174, 136, 98.079, 312.33, 162.2, 82.03, 36.46];
var density = [0,0,0,1.83,0,0,0,0.81];
var i = 0;

function addReagent() {
  var cont = document.getElementById("cont");
  var newRow = document.createElement('div');

  cont.appendChild(newRow);
  newRow.classList.add('input-group', 'mb-3', 'row', 'g-3', "form-horizontal");

  var idName = 'para_' + i;
  var chemicalsId = 'chem_' + i;

  newRow.setAttribute('id', idName);

  newRow.innerHTML =`      <div class="col">
        <label for="exampleInputEmail1" class="form-label">chemical formula</label>
        <input id="`+idName+`1" list="`+chemicalsId+`" class="form-control req" placeholder="" aria-label="First name" );">
        <datalist id="`+chemicalsId+`"></datalist>
        </div>
        <div class="col">
          <label for="exampleInputEmail1" class="form-label">M<sub>r</sub> [g/mol]</label>
          <input id="`+idName+`2" type="number" class="form-control" placeholder="" aria-label="First name">
        </div>
        <div class="col-auto">
          <label for="exampleInputEmail1" class="form-label">mM</label>
          <input id="`+idName+`3" type="number" class="form-control req" placeholder="" aria-label="Last name">
        </div>
        <div class="col">
          <label for="exampleInputEmail1" class="form-label">mg</label>
          <label id="`+idName+`4" for="exampleInputEmail1" class="input-group-text col-sm" value='0'>0</label>
          <!--input id="`+idName+`3" type="number" class="form-control" placeholder="" aria-label="First name"-->
        </div>
        <div class="col-sm-1 input-group-append">
          <p></p></br>
          <button class="btn btn-danger btn-sm delete" onclick="removeRow('`+idName+`');">remove</button>
        </div>`;

  newRow.children[0].children[1].onchange = function() {
    var indexMr = chemicals.indexOf(newRow.children[0].children[1].value);
    if (density[indexMr] != 0) {
      newRow.children[1].children[1].value = molarity[indexMr]/density[indexMr];
      newRow.children[1].children[0].innerHTML = 'V<sub>r</sub> [cm<sup>3</sup>/mol]';
      newRow.children[3].children[0].innerHTML = 'mL';
    }
    else {
      newRow.children[1].children[1].value = molarity[indexMr];
    }
  }

  populateOptions(chemicalsId);
  i += 1;
}

function removeRow(idEl) {
  var currentRow = document.getElementById(idEl);
  currentRow.remove();
}

function calculateReagent() {
  var contain = document.getElementById('cont');
  var vol = document.getElementById('volume');
  var nSamp = document.getElementById('nSamples').value;
  var mLReag = document.getElementById('mLReagent').value;
  var volume = nSamp * mLReag;

  for(var i = 0; i<contain.children.length; i++) {

    var Mr = contain.children[i].children[1].children[1].value;
    var mM = contain.children[i].children[2].children[1].value;
    var calculated = Mr * (mM * 0.001) * (volume);
    contain.children[i].children[3].children[1].innerHTML = calculated;
    vol.value = volume;
  }
}

function populateOptions(chemicalsId) {

  var list = document.getElementById(chemicalsId);

  chemicals.forEach(function(item){
     var option = document.createElement('option');
     option.value = item;
     list.appendChild(option);
  });
}
