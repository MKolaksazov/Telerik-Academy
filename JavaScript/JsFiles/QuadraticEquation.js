function Solve(){

	var a = document.getElementById("input_1").value;
    var b = document.getElementById("input_3").value;
    var c = document.getElementById("input_4").value;

	var d = b * b - 4 * a * c;

	var x1 = d < 0 ? "" : ((-b + Math.sqrt(d)) / (2 * a)).toFixed(5);
	var x2 = d <=0 ? "" : ((-b - Math.sqrt(d)) / (2 * a)).toFixed(5);
    	
    document.getElementById("quadraticEquation").innerHTML = 
    d <= 0 ? (d<0 ? "There are no real roots!" : "x<sub>1</sub> = " + x1) : ("x<sub>1</sub> = " + x1 + "</br> x<sub>2</sub> = " + x2);
}