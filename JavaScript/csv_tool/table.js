      var info = document.getElementById('info');
      var tbl = document.getElementById('tbl');
      var columnIndex = 0;
      var colsSelected = [];
      var newCol = [];
// a function to make html table using the dom structure instead of string concatenation
      function makeTable(tableData) {
        colsSelected = [];
        var table = document.createElement('table');
        table.classList.add("table", "table-striped");
        table.setAttribute("id","table-1");
        var tableBody = document.createElement('tbody');
        tableData.forEach(function(rowData) {
          var row = document.createElement('tr');
          rowData.forEach(function(cellData) {
            var cell = document.createElement('td');

            if (rowData[0] == 'index') makeCheckbox(cellData, cell, table);

            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
          });
          tableBody.appendChild(row);
        });
        table.appendChild(tableBody);
        tbl.innerHTML = '';
        tbl.appendChild(table);
      }

      function makeAverage() {
        const table = document.getElementById("table-1"); newCol = [];

        Array.from(table.rows)
          .forEach(row => {

            var averaged = 0;
            for (var selectedIndex=0; selectedIndex<colsSelected.length; selectedIndex++) {
              const selectedNumber = row.cells[colsSelected[selectedIndex]].textContent;
              averaged += parseFloat(selectedNumber);
            }
            averaged = averaged / colsSelected.length;
            const label = document.getElementById('label').value;
            if (row.rowIndex == 0) { newCol.push(label); }
            else { newCol.push(averaged); }
            var cell = document.createElement('td');

            if (row == table.rows[0]) { makeCheckbox('', cell, table);
            cell.appendChild(document.createTextNode(label)); }
            else { cell.appendChild(document.createTextNode(averaged)); }
            row.appendChild(cell);
          });

          //numericalData.push(newCol.slice(slicePoints[0]-3,slicePoints[1]-5));
          //paramsData.push(newCol.slice(sliceParams[0], sliceParams[1]));
          tableData.push(newCol);
      }

      function makeCheckbox(text, cell, table) {
          if (text != 'index') {
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            cell.appendChild(checkbox);
            cell.appendChild(document.createElement("br"));
            // add functionality
            checkbox.addEventListener("change", () => {
              columnIndex = checkbox.parentNode.cellIndex;
              if (colsSelected.includes(columnIndex))
              { colsSelected = colsSelected.filter(e => e != columnIndex); } // remove element if in array
              else { colsSelected.push(columnIndex); }

              // Check if the column contains only numbers
              //const isNumberColumn = Array.from(table.rows).slice(slicePoints[0],slicePoints[1])
              //  .every(row => !isNaN(row.cells[columnIndex].textContent));
              //if (isNumberColumn) {
                toggleColumnHighlight(columnIndex, checkbox.checked, table);
              //} else {
              //  alert("This column doesn't contain only numbers.");
              //checkbox.checked = false;
              //}
            });
          }
      }

      // toggle selected columns from the table by the means of checkboxes
      function toggleColumnHighlight(columnIndex, highlight, table) {
        Array.from(table.rows)
          .forEach(row => {
            row.cells[columnIndex].style.backgroundColor = highlight ? "lightgreen" : "";
          });
      }



