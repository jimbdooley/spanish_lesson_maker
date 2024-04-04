
document.getElementById("swapButton").addEventListener("click", function() {
    const lessonDiv = document.getElementById("lessonDiv");
    const inputDiv = document.getElementById("inputDiv");
    if (lessonDiv.style.display === "none") {
        lessonDiv.style.display = "block";
        inputDiv.style.display = "none";
    } else {
        lessonDiv.style.display = "none";
        inputDiv.style.display = "block";
    }
})

const HS = {
    lesson: null,
}

function downloadJSON(filename) {
    if (HS.lesson === null) return
    const obj = HS.lesson;
    const json = JSON.stringify(obj, null, 1);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

document.getElementById("submitButton").addEventListener("click", function() {
    const ta = document.getElementById("inputText");
    HS.lesson = API_makeLesson(ta.value);
})

document.getElementById("showLessonButton").addEventListener("click", function() {
    if (HS.lesson === null) return

    const wordToDef = {}
    for (const key in HS.lesson.defInfo) { // the key is the defined word
        for (const word of HS.lesson.defInfo[key].causes) { // the word is the word that caused the definition
            if (!wordToDef.hasOwnProperty(word)) {
                wordToDef[word] = []
            }
            let alreadyAdded = 0
            for (let i = 0; i < wordToDef[word].length; i++) {
                alreadyAdded |= wordToDef[word][i] === key
            }
            if (!alreadyAdded) {
                wordToDef[word].push(key)
            }
        }
    }

    const lessonDiv = document.getElementById("showLessonDiv");
    while (lessonDiv.firstChild) {
        lessonDiv.removeChild(lessonDiv.firstChild);
    }
    const shown = {}
    for (const sentInfo of HS.lesson.sentenceInfoList) {
        for (const wordInfo of sentInfo.wordInfoList) {
            const startStop = wordInfo.loc
            let toShow = sentInfo.sentence.substring(0, startStop[0]) 
            toShow += "<span style='background-color: #ff99ff'>"
            toShow += sentInfo.sentence.substring(startStop[0], startStop[1])
            toShow += "</span>"
            toShow += sentInfo.sentence.substring(startStop[1])
            const p = document.createElement("p");
            p.innerHTML = toShow;
            p.fontSize = "20px";
            lessonDiv.appendChild(p);
            
            if (wordInfo.word in wordToDef) {
                for (const definedWord of wordToDef[wordInfo.word]) {
                    const p2 = document.createElement("p");
                    p2.innerHTML = "<u>" + definedWord + "</u>: " + HS.lesson.defInfo[definedWord].shortDef;
                    p2.fontSize = "15px";
                    lessonDiv.appendChild(p2);
                }
                
            }
        }
    }
})