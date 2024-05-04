const targetUrl = 'https://mkolaksazov.github.io/Telerik-Academy/JavaScript/reagent_calc/variables.json';

var result = [];
fetch(targetUrl).then((response) => response.json()).then((json) => {
	for(var i in json) { result.push([i, json[i]]); }
});

var chemicals = result;

// ======================================================================
var classID = 0;

var rowInner = `      <div class="col">
      <label for="exampleInputEmail1" class="form-label">chemical formula</label>
      <input id=" " list=" " class="form-control req" placeholder="" aria-label="First name">
      <datalist id=" "></datalist><p> </p>
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
        <button class="btn btn-danger btn-sm delete">add</button>
      </div>`;
