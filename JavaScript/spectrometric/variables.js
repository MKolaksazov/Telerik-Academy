const targetUrl = 'https://mkolaksazov.github.io/Telerik-Academy/JavaScript/spectrometric/variables.json';

fetch(targetUrl)
    .then(response => response.json())
    .then(data => {
        for(var i in data) { methods.push([i, data[i]]); }
        populateOptions('methodsList', methods);
    });

// ===========================VARIABLES==================================

var cont = document.getElementById("cont");
const average = array => array.reduce((a, b) => a + b) / array.length;
//var calibration = [];
//var dilutions = [];
var methods = [];
var labels = [];

var titleUnits = document.getElementById('unitsList')
.children[document.getElementById('unitsList').selectedIndex].innerHTML

var speedCanvas = document.getElementById("myChart");
var ctx = document.getElementById("myChart").getContext("2d");
document.getElementById('myChart').style.height = '500px';

Chart.defaults.global.defaultFontFamily = "Lato, sans-serif";
Chart.defaults.global.defaultFontSize = 16;

var classID = 0;

// ===========================SHA256IMPLEMENTATION=======================

async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
