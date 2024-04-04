
function newFormAdder(lesson, word, newForm) {
    if (lesson.defInfo.hasOwnProperty(newForm)) {
        lesson.defInfo[newForm].group = Math.min(
            lesson.defInfo[newForm].group, 
            lesson.defInfo[word].group
        )
        if (-1 == lesson.defInfo[newForm].causes.indexOf(word)) {
            lesson.defInfo[newForm].causes.push(word)
        }
        const potentialDefInfo = lesson.defInfo[newForm]
        return potentialDefInfo.longDef != null && potentialDefInfo.shortDef != null
    } else {
        const potentialDefInfo = {
            word: newForm,
            shortDef: null,
            group: lesson.defInfo[word].group,
            causes: [word],
            longDef: null,
        }
        getUnchangedWordDef(potentialDefInfo)
        if (potentialDefInfo.longDef != null
            || potentialDefInfo.shortDef != null) {
            lesson.defInfo[newForm] = potentialDefInfo
        }
        return potentialDefInfo.longDef != null && potentialDefInfo.shortDef != null
    }
}