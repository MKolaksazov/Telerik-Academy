
var chemicals = [
  "ammonium molybdate tetrahydrate ((NH₄)₆Mo₇O₂₄.4H₂O)",
  "potassium phosphate dibasic (K₂HPO₄)",
  "potassium phosphate monobasic (KH₂PO₄)",
  "H₂SO₄",
  "TPTZ",
  "FeCl₃",
  "CH₃COONa",
  "HCl",
  "H₃PO₄",
  "NH₄+",
  "NaOH"];
var molarity = [1235.86, 174, 136, 98.079, 312.33, 162.2, 82.03, 36.46];
var density = [0,0,0,1.83,0,0,0,0.81];
var pKa = [
  [3.7, 4.33],
  [12.32],
  [7.21,12.32],
  [0,1.99],[0],[0],[4.756],[0],[2.16,7.21,12.32],[4.75],
  [0]
];
var base = [0,0,0,0,0,0,0,0,0,true,true];


// ======================================================================
var classID = 0;

var rowInner = `      <div class="col">
      <label for="exampleInputEmail1" class="form-label">chemical formula</label>
      <input id=" " list=" " class="form-control req" placeholder="" aria-label="First name">
      <datalist id=" "></datalist>
      </div>
      <div class="col">
        <label for="exampleInputEmail1" class="form-label">M<sub>r</sub> [g/mol]</label>
        <input id=" " type="number" class="form-control" placeholder="" aria-label="First name">
      </div>
      <div class="col-auto">
        <label for="exampleInputEmail1" class="form-label">mM</label>
        <input id=" " type="number" class="form-control req" placeholder="" aria-label="Last name">
      </div>
      <div class="col">
        <label for="exampleInputEmail1" class="form-label">mg</label>
        <label id=" " for="exampleInputEmail1" class="input-group-text col-sm" value='0'>0</label>
        <!--input id="" type="number" class="form-control" placeholder="" aria-label="First name"-->
      </div>
      <div class="col-sm-1 input-group-append">
        <p></p></br>
        <button class="btn btn-danger btn-sm delete">remove</button>
      </div>`;
