# App for extracting experimental fluorescent data

https://mkolaksazov.github.io/Telerik-Academy/JavaScript/csv_tool/index.html

1) works with any CSV or TXT file, and can change the data and decimal delimiters based on the file type
  
3) works with the four protocols (OJIP, NPQ1,2,3) of fluorometer FluorPen 110 (PSI, Czech Republic)

4) selects columns and draws graphs of the transient OJIP and NPQ curves (samples appear on the graph in their selection order)

5) calculates the average of the selected columns, giving the new column a new sample name

6) calculates the OJIP and NPQ parameters and draws graphs (first, the appropriate protocol should be selected)

7) can save the calculated columns as a new CSV file

8) implements the graphical library of JavaScript: chart.js

Copyright: M. Kolaksazov, PhD; 2024 (Free to use and copy!)

#



## Documentation
This app can be used for:
1. Opening any *.csv and *.txt files, obtained directly from the devices "FluorPen" of the Czech firm PSI (without modification). Works with all protocols: OJIP, NPQ1, 2, 3.

2. Manipulations, that can be performed on the data files, such as: organizing, renaming, and averaging the values in the columns.

3. Drawing three different types of graphs: transients, simple bars, and boxplots with the calculated statistical significance (at p ≤ 0.05).

4. Saving (exporting) the data to a CSV file (only after entering the password for the full version).

### How to use the app
1. First, you should open (upload) a CSV (TXT, TSV, ...) file. To do this correctly, select the column delimiter (the default is "tab"; tabulation), but can be changed if the file doesn't open correctly. Next, select the protocol of our experimental data (OJIP, NPQ1, 2, 3). The default is OJIP. This will determine the type of data, we want to import. If you want to upload a different data, recorded with a different protocol, you should first change the protocol, and then upload the entire file again. The app will select only the data, that was recorded with the selected protocol.

2. You can now see the experimental data as a table. The rows represent the time-points of the transient values and also the names of the parameters. The columns are the experimental samples. You can select any of them to draw some type of graph on the data. It should be mentioned, that the order of the selection matters, since they will appear on any of the graphs in that same order. In this way, you can modify their order, to be different from their initial order of measurement. In addition, there is a button in the upper-left corner of the table, which can select and deselect every column in the table, instead of doing this by yourself one by one. Finally, you can assing to each variant a different color (if you want a different than the default color scheme) from the white button above the title of the column. It is reccomended, if you upload a CSV / TXT with experimental data for the first time, to rename all columns (average if you like), select them in your preferred order, save them as a new CSV file, and only after then import this file and start drawing graphs on it.

3. To save (export) the file is very simple: just select all columns you want to save in order, and hit the save button. It should be noted, that you can arrange the columns, based on their order of selection. For example, if you select the 1st, 2nd, 3rd columns, they will be exported in this order, but if you select first the 8th, then the 3rd, then the 12th columns, the saved CSV file will contain only these columns in the following order: 8th, 3rd, 12th ... You should also have the password and insert it into the textbox. You can ask me on my email, if you need this functionality.

4. After you have a file, with the required columns in their order, and their titles are labeled, you can start drawing the graphs. There are three graphs, you can draw: the transient graph of the recorded fluorescence over time; a simple bar graph of all selected columns; boxplot graph with letter of statistical significance (based on the Tukey HSD pairwise test at p ≤ 0.05), assigned on each experimental variant. For the first graph (the transient, the button is right next to the "file" button), you should select one or more column, containing the measured transients, and hit the button "draw transient". You will see two types of transients: OJIP and NPQ. They will be drawn with their corresponding abscissae; the OJIP transient will have a logarithmic axis with labels in milisecond. The NPQ transient will be shown with a linear abscissa, labeled in minutes. For the nex two drawing options, first, you should select the parameter, you want to represent on the graph (from the drop-down menu). Next, there are the buttons "draw bars / linear" and "draw boxplot". The first button draws either bar graph or linear graph on scatter dots, on the base of the selected protocol. All parameters from the OJIP protocols are represented as bar graph, whereas only the "Rdf" is represented as a bar graph. The rest NPQ parameters are shown as a linear graph starting from the light-adapted period, and continuing to the dark-adaptation. 5. Drawing of both bar / linear graphs and the boxplot requires the selection of the columns and hitting the button. However, to present the boxplot correctly, some additional preparation are required. These include the selection of minimum two samples of each experimental variant (two repetitions of a variant). So, be sure you have measured and recorded these repetitions. In additioin, these repetitions must have the same title, written on top of their corresponding columns. For example, I have as a total two variants measured: T. aestivum and H. vulgare. Each of these variants have three repetitions, thus these repetitions should be titled as e.g.: "T_aestivum"; "H_vulgare", or something similar. The repetitions should have the same names ("T_aestivum" for the 1st, "T_aestivum" for the 2nd, "T_aestivum", 3rd, and so on; and not "T_aestivum_1", "T_aestivum_2", "T_aestivum_3"). Otherwise the boxplot will not work!
The buttons

1. file This button opens a drop-down box, with two options:
open (upload) file (any suitable file with CSV structure, including: CSV, TXT, TSV, ...) to a table of columns, containing all experimentall variants (samples) and rows, containing the time-points of the corresponding transient (OJIP, NPQ) records and the parameters. The app can open CSV files with decimal separators "." and "," automatically, and in case of a different delimiter, the user should enter it from the first textbox ("tab" is for tabulation, "," for comma, ";" semicolon etc). Prior to open a file, the protocol used to record the samples should be selected (out of the four protocols: OJIP, NPQ1, 2, 3). The default protocol is OJIP. The list of parameters will change, based on the selected protocol.

The second button "save", exports the data from the table to a file in the CSV format. Only the columns, that were selected will be exported to the CSV file, in their order of selection. The exported CSV file will be written in the USA, UK formatting: delimiter "tab" (tabulation) and decimal separator "." (fullstop). The name, written in the textbox before the "save" button will be assigned to the file. (Only users, which have the password can use this function!)

2. draw transient Transient fruorescent (OJIP, NPQ) curves will be drawn, based on the data in the selected columns (in their order of selection). The scale of the graph will be logarithmic (in miliseconds), in the case of the OJIP protocol, or normal linear graph (in minutes), in case if any of the NPQ protocols were selected. Graphs will be shown with pre-selected colors of the variants. If you want to customise the color of each variant, you can do it by changing the color from the white button above the title of each column in the table. In the same way, the title of each experimental variant can be changed. The reccomended symbols for the title are (uppercase, lowercase) latin letters, and for the separators between words only the underscore "_" is reccomended.

3. select the parameter Selects the parameter, which will be included in the graph. The included parameters are the total available in the "FlourPen" devices. In case the selected protocol was OJIP, the list of parameters contains all 22 entries, in case the protocol was one of the NPQs, there are five parameters available.

4. draw bars / line graphs Drawing simple bar graphs, based on the values of the selected parameter in the selected columns (in their order of selection). In case the protocol was OJIP, the graph should contain simple bars (one for each selected column), whereas if the protocol was any of the 3 NPQ protocols, the graphs will contain the scattered dots data, from the light and dark-adapted measurements.

5. draw boxplot graph Draw boxplot graph on the selected columns (and the selected parameter) and calculate the statistical significance of the variants, assigning to each of them a letter of statistical significance. The used statistical method is the Tukey HSD pairwise test (at p ≤ 0.05). This function can work properly only if the user have selected minimum two repetitions of each variant, which have been titled with the same name (e.g.: "T_aestivum_1", "T_aestivum_1", "T_aestivum_2", "T_aestivum_2", ...). The user can also specify how many experimental groups are there (from the textbox) and can assign to each group the same color. For example, if you have four experimental variants, at least 8 columns should be selected (each two columns must have the same title, four different titles in total). Now, you can have 4 groups in total (each with different color), you can also assign the number 2 in the textbox, to color two of the samples with one color, and the other two with different and finally, you can assign the number 4, meaning you will have only one group and all 4 variants will have the same color.

6. average & rename The data in the selected columns will be averaged (this includes the data in every row; the transient data and all parameters) and the name of the new column will be set to the value of the input box.

7. documentation & help Opens this page.

The imported data table has a large button on the upper-left corner of the table to select / deselect all columns automatically. Every column of the data table has its own checkbox for selection, a large white button to change the color, which will be shown on the graphs, and finally a textbox to change the title of the column (sample).

To make use of the downloaded CSV files you should first have the encryption file, which can be found here
#
M. Kolaksazov, PhD; 2024 m.kolaksazov@gmail.com
