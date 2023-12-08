function Cell (x, y, w){
	this.x = x;
	this.y = y;
	this.w = w;
	this.bee = true;
	this.reveiled = true;
	this.number = 0;
	//this.coord = (1,2);
	var state_bee = false;
	var state_reveiled = false;
	var state_number = 0;

}

Cell.prototype.show = function(){
	rect(this.x, this.y, this.w, this.w);
	//stroke(0);
	//if(!this.revealed)
}
