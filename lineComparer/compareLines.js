let compareKeys = document.getElementById("compare-keys"),
    keysToSearchIn,
    searchedKeys, 
    resultsPreview = document.getElementById("resultsPreview"),
    form = document.getElementById("form"),
    matchesCounter = 0,
    repeatedCounter = 0,
    notFoundCounter = 0,
    matchedLinesKeyToSearchIn = [],
    keysToSearchInOrdered = [],
    keysOrder = [];

compareKeys.addEventListener("click", e => {
    e.preventDefault();
    keysToSearchIn = document.getElementById("textarea-input").value.split("\n");
    searchedKeys = document.getElementById("textarea-output").value.split("\n");
    compareLines();
    showResults();
});

function compareLines() {
for(let i = 0; i < keysToSearchIn.length; i++) {
    let match = false;
    for(let x = 0 ; x < searchedKeys.length; x++) {
        if(keysToSearchIn[i] == searchedKeys[x]) {
            getMatchedAndRepeatedLines(i, x)
        }
    }
    if(!match) {
        keysToSearchInOrdered.push([keysToSearchIn[i], "notFound"]);
        notFoundCounter++;
    }
}

}

function getMatchedAndRepeatedLines(ksInterval, ktsiInterval) {
    keysToSearchInOrdered.push([`${keysToSearchIn[ksInterval]} line: ${(ksInterval + 1)} (left) ${(ktsiInterval + 1)} (right)`, "matched" ]);
    match = true;
    matchesCounter++;
    for(let y = 0; y < matchedLinesKeyToSearchIn.length; y++) {
        if(ktsiInterval == matchedLinesKeyToSearchIn[y]) {
            keysToSearchInOrdered[keysToSearchInOrdered.length - 1][0] += " (repeated)";
            keysToSearchInOrdered[keysToSearchInOrdered.length - 1][2] = "repeated";
            repeatedCounter++;
        }
    }
    matchedLinesKeyToSearchIn.push(ktsiInterval);
}

function showResults() {
    keysToSearchInOrdered.sort();
    keysToSearchInOrdered.forEach(element => {
        let parraph = document.createElement("p");
        if(element[1] == "matched" && element[2] == null) {
            parraph.className = "matched";
        } else if (element[1] == "matched" && element[2] != null) {
            parraph.className = "repeated";
        } else if(element[1] == "notFound") {
            parraph.className = "not-found";
        }
        
        parraph.innerHTML = element[0];

        resultsPreview.appendChild(parraph);
    });

    let matchInfo = document.createElement("p");
    matchInfo.innerHTML = "Total de keys buscadas: " + searchedKeys.length + ". Encontradas: " + matchesCounter + ". Duplicadas: " + repeatedCounter;

    form.appendChild(matchInfo);
}