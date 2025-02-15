
var slicePoints = [];
var data = {};

// extract the column with the parameter
// for each selected variant
// and place the repeating values in an array
function extractData(indices, tableData, parameter) {

  var dict = []; // Create an empty array
  var iParam = tableData[0].indexOf(parameter);
  var transposed = transpose(tableData);

  for (var row=1; row<tableData.length; row++) {
    // the change is only in the added check if the 'row'
    // exists in 'indices'
    if (indices.indexOf(row)!=-1) {

    if (duplicate != tableData[row][0]) {

      var arrayParams = [];

      transposed[0].forEach((label, i) => {
        if (label == tableData[row][0]) {
          arrayParams.push(transposed[iParam][i]);
        }
      });

      dict.push({
        key:   tableData[row][0],
        value: arrayParams
      });
    }

    var duplicate = tableData[row][0];}
  }
  return dict;
}

/* ======================================================
 * ======STATISTICAL FUNCTIONS===========================
 *********************************************************/

// 1. Изчисляване на средни стойности, стандартни отклонения и брой наблюдения
function statistics(parameter) {
  // Примерни данни
  //
  data = extractData(colsSelected, tableData, parameter);
  var bpData = [];
  var labels = [];
  var backgroundColors = [];
  var i = 0;
  // Анализ с JStat - изчисляване на квартилите
  // Изчисляване на Q1 (25%), медианата и Q3 (75%)

  data.forEach((key) => {
    var groupStats = jStat(key.value);
    var groupQuantiles = groupStats.quantiles([0.25, 0.5, 0.75]);
    var dict = { min: Math.min(...key.value), q1: groupQuantiles[0], median: groupQuantiles[1], q3: groupQuantiles[2], max: Math.max(...key.value) };

    bpData.push(dict);
    labels.push(key.key);
    for (var j = 0; j<document.getElementById("colorsInput").value; j++) {
      backgroundColors.push(colors[i]);
    }
    i += 1;
  });

  // Създаване на Boxplot с Chart.js
  //const ctx = document.getElementById('boxplot').getContext('2d');
  return {
      labels: labels,
      datasets: [{
          //label: '',
          data: bpData,
          backgroundColor: backgroundColors,
          borderColor: 'rgba(0,123,255,1)',
          borderWidth: 1
      }]
  };
}

// 2. Tukey HSD анализ
function tukeyHSD(groupStats, alpha = 0.05) {

  var result = [];
  var groups = groupStats.map(x => x.group); // extract the groups
  // the input of jStat.tukeyhsd is 2d array of the experimental variants and their repetitions
  var t = jStat.tukeyhsd(groupStats.map(x => x.repetitions));

  var count = 0;
  for (let i = 0; i < groups.length; i++) {
      for (let j = i + 1; j < groups.length; j++) {
          const g1 = groups[i];
          const g2 = groups[j];

          var significant = t[count][1] < alpha;
          result.push({ group1: g1, group2: g2, significant });
          count += 1
      }
  }
  return result;
}

// 3. Групиране на статистически значимите съвкупности

// making a 2D array
function createArray(x, y) {
  return Array.apply(null, Array(x)).map(e => Array(y));
}

// premestwane nadqsno na kolonite ot cn+1 (otdqsno) i kopirane na kolonata s edna nadqsno
function shiftDataFrame(df, cn) {
  // Create new array for shifted data at "cn+1" (the column on the right)
  var newDf = shiftAndJoinColumns(df, cn+1, "F");
  // Set column cn+1 equal to column cn
  newDf.forEach(row => {
    row[cn+1] = row[cn];
  });
  return newDf;
}

// premestwane na kolonite nalqwo "B" backwards i nadqsno "F" forwards i dobawqne na "undefuned" odpred ili otzad
function shiftAndJoinColumns(data, n, BF) {
  return data.map(row => {
    var firstPart = row.slice(0, n); // slice a part of row from 0 to n
    if (BF=='F') {
    	return firstPart.concat(shiftForward(row.slice(n, row.length)));
    }
    if (BF=='B') {
    	return firstPart.concat(shiftBackward(row.slice(n, row.length)));
    }
  });
}

// Преместване напред (надясно)
function shiftForward(arr) {
  arr.unshift(undefined);
  arr.pop();
  return arr;
}

// Преместване назад (наляво)
function shiftBackward(arr) {
  arr.shift();
  arr.push(undefined);
  return arr;
}

// assign letters to each unique groups
function assignLetters(comparisons) {
    // Създаваме списък с всички уникални групи
    const groups = Array.from(
        new Set(comparisons.flatMap(({ group1, group2 }) => [group1, group2]))
    );

    const groupLength = groups.length;
    var count = 0;
    var emptyArray = createArray(groupLength, groupLength);
    emptyArray.forEach(x => { x[0] = 1; });

    for (var i=0; i<groupLength; i++) {
      for (var j=i+1; j<groupLength; j++) {
        if (comparisons[count].significant) {
          for (var cn=0; cn<groupLength; cn++) {
            if (emptyArray[i][cn]==1 && emptyArray[j][cn]==1) {
              let emptyArray1 = shiftDataFrame(emptyArray, cn);
              // set to "0" the cell in the right column
              // and the row, corresponding to the number of the
              // combinations, accepting the null hypothesis (Ho)
              emptyArray1[i][cn] = 0;
              emptyArray1[j][cn+1] = 0;

              for (var cleft=0; cleft<emptyArray.length-1; cleft++) {
                for (var cright=cleft+1; cright<emptyArray.length; cright++) {
                // if left and right cols do not have empty cells
                  if (emptyArray1.some(row => !isNaN(row[cleft])) && emptyArray1.some(row => !isNaN(row[cright]))) {
                  // if values from the left column are larger than the right column
                    if (emptyArray1.every(row => row[cleft] >= row[cright])) {
                      emptyArray1.forEach(x => { x[cright] = 0; });
                      var emptyArray2 = shiftAndJoinColumns(emptyArray1, cright, "B");
                      emptyArray1 = emptyArray2
                    }
                    if (emptyArray1.every(row => row[cleft] <= row[cright])) {
                      emptyArray1.forEach(x => { x[cleft] = 0; });
                      var emptyArray2 = shiftAndJoinColumns(emptyArray1, cleft, "B");
                      emptyArray1 = emptyArray2
                    }
                  }
                }
              }
              emptyArray = emptyArray1
            }
          }
        }
      count += 1;
    }
  }

  // Сортиране на колоните на "df" в низходящ ред
  var reversedArray = emptyArray.map(x => x.reverse());
  // Премахване на undefined и оставяне само на колоните с номерата
  var lettersArray = reversedArray.map(x => x.filter(value => typeof value === "number"));

  // Задаване на букви на колоните
  for (let cn = 0; cn < lettersArray[0].length; cn++) {
    for (let i = 0; i < lettersArray.length; i++) {
      if (lettersArray[i][cn] === 1) {
        lettersArray[i][cn] = String.fromCharCode(97 + cn);
      } else if (lettersArray[i][cn] === 0 || isNaN(lettersArray[i][cn])) {
        lettersArray[i][cn] = '';
      }
    }
  }
  // залепване на буквите от всяка колона
  return lettersArray.map(x => x.join(''));
}

/* ======================================================
 * ===========DRAW THE BOXPLOT GRAPH=====================
 *********************************************************/

document.getElementById('drawBoxPlot').onclick = () => {
  if (colsSelected.length === 0) { alert('Error! Column(s) not selected!'); return; }

  var options = document.getElementById("parameters");
  var parameter = options[options.selectedIndex].text;
  var boxplotData = statistics(parameter);
  // var groupStats = data.map((item, i) => {
  //   var values = item.value.map(Number);
  //   var group = item.key;
  //   return {
  //       group,
  //       mean: jStat.mean(values),
  //       stdDev: jStat.stdev(values, true),
  //       n: values.length,
  //   };
  // });

  var inputTukey = [];
  // масив от речници с имената на вариантите (групите) и техните повторения
  data.forEach((i) => inputTukey.push({ group: i.key,  repetitions: i.value.map(Number) }));
  var tukeyResults = tukeyHSD(inputTukey); // сметни Туки ХСД

  try {   var letterAssignments = assignLetters(tukeyResults); } // сметни уникалните букви
  // check if the selected samples are enough, else throw an error message
  catch(err) { alert('Error! Select at least two repetitions of each variant!', err.message); return; }

  var samplevar = data.map((item, i) => ({ value: Math.max(...item.value.map(Number)), variant: item.key, letter: letterAssignments[i] }));

  var ctx = removeFlicker();
  closeButton();

  var displayLegend = false;
  // включване на буквите в етикетите на вариантите
  var tooltips = {};
  letterAssignments.map((x,i) => tooltips[data[i].key] = x );

  //window.myBar
  var lineChart = new Chart(ctx, {
    type: 'boxplot',
    data: boxplotData,
    options: {
      scales: {
                    x: {
                        title: {
                            display: false,
                            text: 'Experimental Variants',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Fluorescence [a.u.]',
                        },
                    },
                },
      responsive: true,
      plugins: {
        legend: {
           display: false,
        },
                    tooltip: {
                        callbacks: {
                            title: function (context) {
                                const group = context[0].label;
                                return `${group} (${tooltips[group]})`;
                            },
                        },
                    },
                            annotation: {
                        annotations: samplevar.map((item,i) => ({
                            type: 'label',
                            xValue: item.variant, //label,
                            yValue: item.value * 0.9, // Позиция над боксплота
                            content: item.letter, // Буквата за статистическата значимост
                            color: 'black',
                            font: {
                                weight: 'bold',
                                size: 14,
                            },
                            textAlign: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.7)', // Лек фон за четимост
                            borderRadius: 1,
                        })),
                    },

/*
        datalabels: {
          formatter: (val, ctx) => (`${ctx.dataset.x} ${ctx.dataset.y} ${ctx.dataset.z}`),
          align: 'end',
          offset: (ctx) => {
            const center = ctx.chart.scales.y.getPixelForValue(ctx.chart.getDatasetMeta(ctx.datasetIndex)._parsed[ctx.dataIndex].mean);
            const max = ctx.chart.scales.y.getPixelForValue(ctx.chart.getDatasetMeta(ctx.datasetIndex)._parsed[ctx.dataIndex].max);
            return center - max;
          }
        }
*/
      }
    }
  });
};

//++++++++++++++++++++++++++++++++++++++++




