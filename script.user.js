// ==UserScript==
// @name         PupilPath Transcript GPA Calculator
// @version      1.2
// @description  Calculates your GPA based on PupilPath's transcript
// @match        https://pupilpath.com/Grades/Transcript/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('load', function() {
        var button = document.createElement("button");
        button.innerText = "Calculate GPA";
        button.addEventListener('click', action);
        document.getElementsByClassName("content-box-header")[0].appendChild(button);
    }, false);
})();

function action() {
    //define things
    var gradeAccumulator = 0;
    var creditAccumulator = 0;

    //iterate through each term
    for (var termElement of document.getElementsByClassName("transcript")) {
        //iterate through each course
        for (var courseElement of termElement.rows) {
            //grab the details
            var weightIndicator = courseElement.cells[4].innerHTML.substring(5, 6);
            var grade = courseElement.cells[6].innerHTML;
            var credit = courseElement.cells[7].innerHTML;

            //calculate

            //ignore pass/fail/NX/CR
            if (!isNaN(parseInt(grade))) {
                //getting weights
                var weight;
                if (weightIndicator == "X" || weightIndicator == "U") {
                    weight = 1.1;
                } else if (weightIndicator == "H") {
                    weight = 1.05;
                } else {
                    weight = 1;
                }


                //calculating what to accumulate
                gradeAccumulator += parseFloat(grade * weight * credit);
                creditAccumulator += parseFloat(credit);
            }
        }
    }

    alert(Math.round(((gradeAccumulator / creditAccumulator) + Number.EPSILON) * 1000) / 1000);
}
