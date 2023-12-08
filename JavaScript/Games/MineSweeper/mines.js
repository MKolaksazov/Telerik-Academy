var grid;
var rows;
var cols;
var w = 20;

function setup (){
	//syzdavane na canvas
	//200*200
	//10*10 kvadrata
	//*20 pixela dyljina vseki
	//+1 pixel za ramkata
	createCanvas(201, 201);
	//floor - zakryglqwane
	cols = floor(width / w);
	rows = floor(height / w);
	grid = make2DArray(cols, rows);
	for (var i = 0; i < cols; i++){
		for (var j = 0; j < rows; j++){
			grid[i][j] = new Cell(i * w, j* w, w);
		}
	}
}

function draw (){
	background(0);
	for (var i = 0; i < cols; i++){
		for (var j = 0; j < rows; j++){
			grid[i][j].show();
		}
	}
	
}

function make2DArray(cols, rows){
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++){
		arr[i] = new Array(rows);
	}
	return arr;
	//grid = [cols][rows];

}

