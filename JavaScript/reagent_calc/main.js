

var i = 0;

function addReagent() {
  var cont = document.getElementById("cont");
  var newRow = document.createElement('div');

  cont.appendChild(newRow);
  newRow.classList.add('input-group', 'mb-3', 'row', 'g-3');

  var idName = 'para_' + i;

  newRow.setAttribute('id', idName);

  newRow.innerHTML =`      <div class="col">
        <label for="exampleInputEmail1" class="form-label">chemical formula</label>
        <input id="`+idName+`1" type="text" class="form-control" placeholder="" aria-label="First name">
        </div>
        <div class="col">
          <label for="exampleInputEmail1" class="form-label">M<sub>r</sub></label>
          <input id="`+idName+`2" type="number" class="form-control" placeholder="" aria-label="First name">
        </div>
        <div class="col">
          <label for="exampleInputEmail1" class="form-label">mg</label>
          <input id="`+idName+`3" type="number" class="form-control" placeholder="" aria-label="First name">
        </div>
        <div class="col-auto">
          <label for="exampleInputEmail1" class="form-label">mM</label>
          <input id="`+idName+`4" type="number" class="form-control" placeholder="" aria-label="Last name">
        </div>
        <div class="col-sm-1">
          <p></p></br>
          <button class="btn btn-danger btn-sm delete" onclick="removeRow('`+idName+`');">remove</button>
        </div>`;

  i += 1;
}

function removeRow(idEl) {
  var currentRow = document.getElementById(idEl);
  currentRow.remove();
}
