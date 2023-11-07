
        var display = "0";
        var sign = "";
        var result = 0;

        function calculate() {
            document.getElementById("display").innerHTML = display;  
        }

        function cifra9() {
            if (display == "0") {
                display = "9";
            }
            else display = display + "9";
            document.getElementById("display").innerHTML = display;
        }

        function cifra8() {
            if (display == "0") {
                display = "8";
            }
            else
                display = display + "8";
            document.getElementById("display").innerHTML = display;
        }

        function cifra7() {
            if (display == "0") {
                display = "7";
            }
            else
                display = display + "7";
            document.getElementById("display").innerHTML = display;
        }

        function cifra6() {
            if (display == "0") {
                display = "6";
            }
            else
                display = display + "6";
            document.getElementById("display").innerHTML = display;
        }

        function cifra5() {
            if (display == "0") {
                display = "5";
            }
            else
                display = display + "5";
            document.getElementById("display").innerHTML = display;
        }

        function cifra4() {
            if (display == "0") {
                display = "4";
            }
            else display = display + "4";
            document.getElementById("display").innerHTML = display;
        }

        function cifra3() {
            if (display == "0") {
                display = "3";
            }
            else display = display + "3";
            document.getElementById("display").innerHTML = display;
        }

        function cifra2() {
            if (display == "0") {
                display = "2";
            }
            else display = display + "2";
            document.getElementById("display").innerHTML = display;
        }

        function cifra1() {
            if (display == "0") {
                display = "1";
            }
            else display = display + "1";
            document.getElementById("display").innerHTML = display;
        }

        function cifra0() {
            if (display == "0") {
                display = "0";
            }
            else display = display + "0";
            document.getElementById("display").innerHTML = display;
        }

        function dot() {
            display = display + ".";
            document.getElementById("display").innerHTML = display;
        }
            
        function plus() {
            if (sign == "-") {
                result = result - Number(display);
                sign = "+";
            }
            else if (sign == "+") {
                result = result + Number(display);
                sign = "+";
            }
            else if (sign == "*") {
                result = result * Number(display);
                sign = "+";
            }
            else if (sign == "/") {
                result = result / Number(display);
                sign = "+";
            }
            else if (sign == "") {
                sign = "+";
                result = Number(display);
            }

            display = "0";
            document.getElementById("display").innerHTML = result*1;
        }
        function minus() {
            if (sign == "-"){
                result = result - Number(display);
                sign = "-";
            }                  
            else if (sign == "+"){
                result = result + Number(display);
                sign = "-";
            }                  
            else if (sign == "*"){
                result = result * Number(display);
                sign = "-";
            }                  
            else if (sign == "/") {
                result = result / Number(display);
                sign = "-";
            }
            else if (sign == "") {
                sign = "-";
                result = Number(display);
            }

            display = "0";
            document.getElementById("display").innerHTML = result;
        }
        function multiplied() {
            if (sign == "-") {
                result = result - Number(display);
                sign = "*";
            }
            else if (sign == "+") {
                result = result + Number(display);
                sign = "*";
            }
            else if (sign == "*") {
                result = result * Number(display);
                sign = "*";
            }
            else if (sign == "/") {
                result = result / Number(display);
                sign = "*";
            }
            else if (sign == "") {
                sign = "*";
                result = Number(display);
            }

            display = "0";
            document.getElementById("display").innerHTML = result;
        }
        function divided() {
            if (sign == "-") {
                result = result - Number(display);
                sign = "/";
            }
            else if (sign == "+") {
                result = result + Number(display);
                sign = "/";
            }
            else if (sign == "*") {
                result = result * Number(display);
                sign = "/";
            }
            else if (sign == "/") {
                result = result / Number(display);
                sign = "/";
            }
            else if (sign == "") {
                sign = "/";
                result = Number(display);
            }

            display = "0";
            document.getElementById("display").innerHTML = result;
        }

        function equals() {
            if (sign == "-") {
                result = result - Number(display);
                sign = "";
            }
            else if (sign == "+") {
                result = result + Number(display);
                sign = "";
            }
            else if (sign == "*") {
                result = result * Number(display);
                sign = "";
            }
            else if (sign == "/") {
                result = result / Number(display);
                sign = "";
            }
            else if (sign == "") {
                sign = "";
                result = Number(display);
            }

            display = "0";
            document.getElementById("display").innerHTML = result;
        }

        function sqrt() {
            result = Math.sqrt(Number(display));
            sign = "";
            display = "0";
            document.getElementById("display").innerHTML = result;
        }

        function oneDivX() {
            result = 1 / Number(display);
            sign = "";
            display = "0";
            document.getElementById("display").innerHTML = result;
        }

        function percent() {
            result = 1 / Number(display);
            sign = "";
            display = "0";
            document.getElementById("display").innerHTML = result;
        }

        function backsp() {
            if (display == "0") {
                display = "0";
            }
            else display = display.substring(0, display.length() - 2);
            document.getElementById("display").innerHTML = display;
        }

        function clre() {
            sign = "";
            display = "0";
            result = 0;
            document.getElementById("display").innerHTML = display;
        }

        function clr() {
            sign = "";
            display = "0";
            result = 0;
            document.getElementById("display").innerHTML = display;
        }
