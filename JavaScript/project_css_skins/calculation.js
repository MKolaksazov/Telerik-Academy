function calculateBuffer() {
         
const pH = parseFloat(document.getElementById('pH').value);
const molarity = parseFloat(document.getElementById('molarity').value);
const volume = parseFloat(document.getElementById('finalVolume').value);
const temperature = parseFloat(document.getElementById('temperature').value);
         
// Calculate the concentrations of sodium phosphate and disodium phosphate
const MW_NaH2PO4_7H2O = 268.074; // Molecular weight of sodium phosphate dibasic heptahydrate
const MW_Na2HPO4_H2O = 137.99; // Molecular weight of sodium phosphate monobasic monohydrate

// H+ concentration of the desired pH
	var hyd = Math.exp(-pH*Math.LN10)
// The three dissociation constants of phosphate
	var K1 = Math.exp(-2.148*Math.LN10)
	var K2 = Math.exp(-6.795*Math.LN10)
	var K3 = Math.exp(-12.319*Math.LN10)
// ratios
	var ratio1 = hyd/K1
	var ratio2 = hyd/K2
	var ratio3 = hyd/K3

	var ratio0 = 1.0
	ratio1 = ratio0/ratio1
	ratio2 = ratio1/ratio2
	ratio3 = ratio2/ratio3

	var sum=ratio0 + ratio1 + ratio2 + ratio3

	ratio0 = ratio0/sum*molarity/1000
	ratio1 = ratio1/sum*molarity/1000
	ratio2 = ratio2/sum*molarity/1000
	ratio3 = ratio3/sum*molarity/1000
// amount of the two chemicals in percents
	var msp = (ratio0 + ratio1)*MW_Na2HPO4_H2O/10
	var dsp = (ratio2 + ratio3)*MW_NaH2PO4_7H2O/10

	msp = Math.round(msp*10000)/10000
	dsp = Math.round(dsp*10000)/10000
// conversion from percentage to mass amount in grams
    var vmsp = (msp / 100) * volume
    var vdsp = (dsp / 100) * volume

// Display the buffer composition in the result div
const resultDiv = document.getElementById('bufferResult');

resultDiv.innerHTML = `<h2>Buffer Composition</h2>`;
resultDiv.innerHTML += `<p>pH: ${pH}</p>`;
resultDiv.innerHTML += `<p>Molarity: ${molarity} mM</p>`;
resultDiv.innerHTML += `<p>Final Volume: ${volume} mL</p>`;
resultDiv.innerHTML += `<p>Temperature: ${temperature} <sup>o</sup>C</p>`;
resultDiv.innerHTML += `<p>Adjusted amount of NaH<sub>2</sub>PO<sub>4</sub>.7H<sub>2</sub>O: ${dsp.toFixed(2)} %; ${vdsp.toFixed(4)} g</p>`;
resultDiv.innerHTML += `<p>Adjusted amount of Na<sub>2</sub>HPO<sub>4</sub>.H<sub>2</sub>O: ${msp.toFixed(2)} %; ${vmsp.toFixed(4)} g</p>`;

if (temperature == 25) { window.location.href = "https://mkolaksazov.github.io/Telerik-Academy/JavaScript/project_css_skins/glass/index.html"; }
if (temperature == 20)  { window.location.href = "https://mkolaksazov.github.io/Telerik-Academy/JavaScript/NaPosphatebufferCalc.html"; }

	
}
