      var info = document.getElementById('info');
      var tbl = document.getElementById('tbl');
      var columnIndex = 0;
      var colsSelected = [];
// a function to make html table using the dom structure instead of string concatenation
      function createTable(tableData) {
        var table = document.createElement('table');
        table.classList.add("table", "table-striped");
        table.setAttribute("id","table-1");
        var tableBody = document.createElement('tbody');
        tableData.forEach(function(rowData) {
          var row = document.createElement('tr');
          rowData.forEach(function(cellData) {
            var cell = document.createElement('td');
            if (rowData[0] === 'index') {
                var checkbox = document.createElement("input");
                checkbox.setAttribute("type", "checkbox");
                cell.appendChild(checkbox);
                cell.appendChild(document.createElement("br"));
            }
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
          });
          tableBody.appendChild(row);
        });
        table.appendChild(tableBody);
        tbl.innerHTML = '';
        tbl.appendChild(table);

        // toggle selected columns from the table by the means of checkboxes
        const tableId = document.getElementById("table-1");
        const checkboxes = document.querySelectorAll("tbody tr td input[type='checkbox']");
        colsSelected = [];
        checkboxes.forEach(checkbox => {
          checkbox.addEventListener("change", () => {
            columnIndex = checkbox.parentNode.cellIndex;
            colsSelected.push(columnIndex);

            // Check if the column contains only numbers
            const isNumberColumn = Array.from(tableId.rows)
              .every(row => !isNaN(row.cells[columnIndex].textContent));

            //if (isNumberColumn) {
              toggleColumnHighlight(columnIndex, checkbox.checked);
            //} else {
              //alert("This column doesn't contain only numbers.");
              //checkbox.checked = false;
            //}
          });
        });

        // toggle selected columns from the table by the means of checkboxes
        function toggleColumnHighlight(columnIndex, highlight) {
          Array.from(tableId.rows)
            .forEach(row => {
              row.cells[columnIndex].style.backgroundColor = highlight ? "lightblue" : "";
            });
        }
      }


