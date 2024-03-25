function addReagent() {
  var cont = document.getElementById("cont");
  var newRow = document.createElement('div');
  var idName = 'para_' + classID;
  var chemicalsId = 'chem_' + classID;

  cont.appendChild(newRow);
  newRow.classList.add('input-group', 'mb-3', 'row', 'g-3', "form-horizontal");
  newRow.setAttribute('id', idName);
  newRow.innerHTML = rowInner;
  newRow.children[0].children[1].setAttribute('list', chemicalsId);
  newRow.children[0].children[2].setAttribute('id', chemicalsId);
  for (var i = 0; i < newRow.children.length; i++) {
    newRow.children[i].children[1].setAttribute('id', idName + i);
  }
  newRow.children[4].children[2].setAttribute('onclick', 'removeRow("'+idName+'");');
  newRow.children[0].children[1].onchange = function() {
    var indexElem = checkIndex(newRow);
    if (chemicals[indexElem][1].density != 0) {
      newRow.children[1].children[1].value = chemicals[indexElem][1].molar_mass/chemicals[indexElem][1].density;
      newRow.children[1].children[0].innerHTML = 'V<sub>r</sub> [dm<sup>3</sup>/mol]';
      newRow.children[3].children[0].innerHTML = 'mL';
    }
    else {
      newRow.children[1].children[1].value = chemicals[indexElem][1].molar_mass ; 
    }
  }

  populateOptions(chemicalsId);
  classID += 1;
}

function removeRow(idRow) {
  var currentRow = document.getElementById(idRow);
  currentRow.remove();
}

function checkIndex(elem) { // get the index of the current chemical
    var indexElem = 0;
    chemicals.forEach((x, i) => { if (elem.children[0].children[1].value == x[0]) { indexElem = i; } });
    return indexElem;
}

function calculateReagent() {
  var contain = document.getElementById('cont');
  var vol = document.getElementById('volume');
  var nSamp = document.getElementById('nSamples').value;
  var mLReag = document.getElementById('mLReagent').value;
  var volume = nSamp * mLReag;
  var sumPH = -1e-7;
  for(var i = 0; i < contain.children.length; i++) {
    // index of the chemical in the database
    var indexElem = checkIndex(contain.children[i]); 
    var Mr = contain.children[i].children[1].children[1].value;
    var mM = contain.children[i].children[2].children[1].value;
    // caclucate mass of chemical in mg
    var calculated = Mr * (mM * 0.001) * (volume);
    // calculate pH of the current chemical solution
    var currentPH = calculatePH(mM, indexElem);
    sumPH = calculateSumPH(currentPH, sumPH);
    var pH = sumPH < 0 ? 14 : 0;
    // calculate the final pH of every chemical
    var finalPH = Math.abs(pH - -Math.log10(Math.abs(sumPH) / (i + 1)));
    document.getElementById('pH').value = finalPH;
    contain.children[i].children[3].children[1].innerHTML = calculated;
    vol.value = volume;
  }
}

function populateOptions(chemicalsId) {
  var list = document.getElementById(chemicalsId);
  chemicals.forEach(function(item){
     var option = document.createElement('option');
     option.value = item[0];
     list.appendChild(option);
  });
}

function calculatePH(mM, i) {
  var s = 0;
  var m1 = mM / 1000;
  var x = 0;
  chemicals[i][1].pKa.forEach((pKa, i) => { // calculating pH given the dissociation constant(s)
    var Ka = Math.pow(10, -pKa);
    var m2 = s;
    var a = 1;
    var b = (Ka + m2);
    var c = -(Ka * m1);
    var x = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a); // solving the quadratic equation
    m1 = pKa == 0 ? m1 : x;
    s += m1;
  });
  return chemicals[i][1].base ? 14-(-Math.log10(s)) : -Math.log10(s);
}

function calculateSumPH(currentPH, sumPH) { // summing the molarity of H+ (OH-)
  var z = currentPH > 7 ? -1 : 1;
  sumPH += Math.pow(10, -(7 - Math.abs(7 - currentPH))) * z;
  return sumPH;
}
