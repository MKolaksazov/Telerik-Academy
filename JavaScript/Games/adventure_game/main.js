var dbCards = [];
var idName = '';
const dbUrl = 'https://pokeapi.co/api/v2/pokemon/';
const draw = document.getElementById('draw');

draw.addEventListener("click", logApi);

async function logApi() {
  const id = Math.round(Math.random() * 580 + 1);
  const response = await fetch((dbUrl + id).toString());
  var data = await response.json();
  drawCard(data);
}

function drawCard(card) {
  var sprite = card.sprites.other.home.front_default;
  var cont = document.getElementById("cont");
  var newRow = document.createElement('div');
  idName = 'para_' + classID;
  var cardId = 'card_' + classID;

  cont.appendChild(newRow);
  newRow.classList.add('input-group', 'mb-3', 'row', 'g-3', "form-horizontal");
  newRow.setAttribute('id', idName);
  newRow.innerHTML = `<span>`+ card.base_experience+`</span><span>`+ card.name+`</span>
  <img src="`+sprite+`" alt="p_img" width="32" height="32">
  <div class="col-sm-1 input-group-append">
    <p></p></br>
    <button class="btn btn-danger btn-sm delete">add</button>
  </div> `; //rowInner;
  newRow.children[1].setAttribute('list', cardId);
  newRow.children[2].setAttribute('id', cardId);
  newRow.children[3].setAttribute('onclick', 'addCard('+card.id+', "'+idName+'");');

  classID += 1;
}

function addCard(id, idRow) {
  if (money >= 0) {

    dbCards.push(id);
    makeTable(dbCards);
    var currentRow = document.getElementById(idRow);
    currentRow.remove();
    money -= 15;
    document.getElementById('money').innerHTML = money;
  }
  else {alert('not enough money!');}

}

function removeCards(id) {
    id.forEach(function(card) {
        var currentCards = document.getElementById('chkbx-'+card).parentNode;
        dbCards.splice(card, 1);
        money += 7;
        currentCards.remove();
    });
    document.getElementById('money').innerHTML = money;
}

var info = document.getElementById('info');
var tbl = document.getElementById('tbl');
var columnIndex = 0;
var colsSelected = [];
var newCol = [];

// a function to make html table using the dom structure instead of string concatenation
function makeTable(tableData) {
    colsSelected = [];
    var table = document.createElement('table');
    table.classList.add("table", "table-striped");
    table.setAttribute("id","table-1");
    var tableBody = document.createElement('tbody');
    tableData.forEach(function(rowData) {
        var row = document.createElement('tr');

        fetch((dbUrl + rowData).toString()) // api for the get request
          .then(response => response.json())
          .then(data => { var sprite = data.sprites.other.home.front_default;
            const exp = document.createElement('span');
            exp.innerHTML = data.base_experience;
            const img = document.createElement('img');
            img.setAttribute("src", sprite);
            img.setAttribute("width", 32);
            img.setAttribute("height", 32);
            row.appendChild(exp);
            row.appendChild(img);
            //row.innerHTML = `<span>`+ data.base_experience+`</span><span>`+data.name+`</span>
            //<img src="`+sprite+`" alt="p_img" width="32" height="32">`;
        });

        makeCheckbox(rowData, row);
        // rowData.forEach(function(cellData) {
        // var cell = document.createElement('td');
        //
        // //if (rowData[0] == 'index')
        //
        // cell.appendChild(document.createTextNode(cellData));
        // row.appendChild(cell);
        // });
        tableBody.appendChild(row);
    });
    table.appendChild(tableBody);
    tbl.innerHTML = '';
    tbl.appendChild(table);
}

 function makeCheckbox(text, cell) {
          //if (text != 'index') {
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            cell.appendChild(checkbox);
            //cell.appendChild(document.createElement("br"));

            // add functionality
            checkbox.addEventListener("change", () => {

              columnIndex = cell.rowIndex;
              //console.log(columnIndex);
              checkbox.setAttribute("id", 'chkbx-'+columnIndex);
              if (colsSelected.includes(columnIndex))
              { colsSelected = colsSelected.filter(e => e != columnIndex); } // remove element if in array
              else { colsSelected.push(columnIndex); }
              //console.log(columnIndex, colsSelected);
              document.getElementById('removeCard').setAttribute('onclick', 'removeCards(colsSelected);');

              //  toggleColumnHighlight(columnIndex, checkbox.checked, table);

            });
          //}
          // else {
          //   var bAll = document.createElement('button');
          //   bAll.setAttribute('onclick', 'selectAll();');
          //   bAll.innerHTML = 'All';
          //   bAll.style.margin = '5px';
          //   cell.appendChild(bAll);
          // }
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
  var sumPH = 1e-7;
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
