function Solve(){
	var selection = document.getElementById("select").value;
	var n = document.getElementById("input_1").value;
    var k = document.getElementById("input_3").value;
    var result;

	switch(selection){
		case 'combinations':{
			document.getElementById("id_3").style.visibility="visible";
			result = Combinations(n, k);
			break;
		}
		case 'permutations':{
			document.getElementById("id_3").style.visibility="hidden"; 
			result = Factorial(n, 1);
			break;
		}
		case 'variations':{
			document.getElementById("id_3").style.visibility="visible";
			result = Variations(n, k);
			break;
		}
		case 'sequence':{
			document.getElementById("id_3").style.visibility="visible";
			result = Math.pow(n, k);
			break;
		}
		default:{
			document.getElementById("id_3").style.visibility="visible"; break;
		}	
	}

    document.getElementById("combinations").innerHTML = result
}

function Factorial(x, k){
	if (x==k) return k;
	return x * Factorial(x-1);
}

function Combinations(n, k){
	return (Factorial(n, k) / (Factorial(n-k, 1)))
}

function Variations(n, k){
	return (Factorial(n, n-k))
}