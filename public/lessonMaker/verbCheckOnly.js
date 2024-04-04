
function conjugatedCheckOnly(lesson, _newForm, word, allowBlind) {
    let rtn = false;
    let newForm = _newForm
    if (newForm.length >= 3) {
        const last3 = _newForm.substring(_newForm.length - 3)
        if (last3 == "ada" || last3 == "ida") {
            newForm = newForm.substring(0, newForm.length - 1) + "o"
        }
    }
    if (newForm.length >= 4) {
        const last4 = _newForm.substring(_newForm.length - 4)
        if (last4 == "adas" || last4 == "idas" || last4 == "idos" || last4 == "ados") {
            newForm = newForm.substring(0, newForm.length - 2) + "o"
        }
    }
    if (A.reverseConjugations.hasOwnProperty(newForm)) {
        const knownInfinitives = A.reverseConjugations[newForm]
        for (let i = 0; i < knownInfinitives.length; i += 2) {
            rtn |= newFormAdder(lesson, word, knownInfinitives[i + 1])
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
                rtn |= newFormAdder(lesson, word, toCheck[i])
                checked.push(toCheck[i])
            }
        }
    }
    return rtn
}

function verbCheckOnly(lesson, newForm, word) {
    const verbEndings = ["ar", "er", "ir", "ír"]
    let rtn = false
    if (newForm.length > 1 && 
        -1 != verbEndings.indexOf(newForm.substring(newForm.length-2))) {
        rtn |= newFormAdder(lesson, word, newForm, true)
    }
    rtn |= conjugatedCheckOnly(lesson, newForm, word, true)
    return rtn
}