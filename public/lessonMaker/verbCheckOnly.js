
function conjugatedCheckOnly(lesson, newForm, word, allowBlind) {
    if (A.reverseConjugations.hasOwnProperty(newForm)) {
        const knownInfinitives = A.reverseConjugations[newForm]
        for (let i = 0; i < knownInfinitives.length; i += 2) {
            newFormAdder(lesson, word, knownInfinitives[i + 1])
        }
    } else {
        let hasShortDef = lesson.defInfo.hasOwnProperty(word)
            && lesson.defInfo[word].shortDef != null
        hasShortDef |= lesson.defInfo.hasOwnProperty(newForm)
            && lesson.defInfo[newForm].shortDef != null
        if (!hasShortDef && allowBlind) {

            const toCheck = deconjugateBlind(newForm)
            const checked = []
            for (let i = 0 ; i < toCheck.length; i += 2) {
                if (-1 != checked.indexOf(toCheck[i])) continue 
                newFormAdder(lesson, word, toCheck[i])
                checked.push(toCheck[i])
            }
        }
    }
}

function verbCheckOnly(lesson, newForm, word) {
    const verbEndings = ["ar", "er", "ir", "ír"]
    if (newForm.length > 1 && 
        -1 != verbEndings.indexOf(newForm.substring(newForm.length-2))) {
        newFormAdder(lesson, word, newForm, true)
    }
    conjugatedCheckOnly(lesson, newForm, word, true)
}