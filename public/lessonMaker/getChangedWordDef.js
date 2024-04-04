
function getChangedWordDef(lesson, word, group, cause) {
    if (!lesson.defInfo.hasOwnProperty(word)) {
        lesson.defInfo[word] = {
            word: word,
            group: group,
            causes: [cause],
            longDef: null,
            shortDef: null,
        }
    } else {
        lesson.defInfo[word].group = Math.min(lesson.defInfo[word].group, group)
        if (-1 == lesson.defInfo[word].causes.indexOf(cause)) {
            lesson.defInfo[word].causes.push(cause)
        }
    }
    getUnchangedWordDef(lesson.defInfo[word])


    let foundSubstituteFullDef = false
    if (MORE_STRATEGY_IGNORES.indexOf(word) == -1
        && (
            lesson.defInfo[word].longDef == null
            || lesson.defInfo[word].shortDef == null
        )) {
        for (let h = 0; h < 2; h++) {
            if (foundSubstituteFullDef) break
            const toTry = h == 0 ? depluralize(word) : malify(word)
            for (const newForm of toTry) {
                if (-1 != A.subwordsToIgnore.indexOf(newForm)) continue
                foundSubstituteFullDef |= newFormAdder(lesson, word, newForm)
            }
        }
    } 
    

    let hasFullDef = null != lesson.defInfo[word].longDef
    hasFullDef &= null != lesson.defInfo[word].shortDef
    hasFullDef |= foundSubstituteFullDef
    if ( -1 != A.maybeNotVerbs.indexOf(word) && hasFullDef) {
        return
    }

    conjugatedCheckOnly(lesson, word, word, !hasFullDef)

    if (lesson.defInfo[word].shortDef == null && !hasFullDef) {
        const toTry = removeSuffixes(word)
        for (let i = 0; i < toTry.length; i++) {
            if (-1 != A.subwordsToIgnore.indexOf(toTry[i])) continue
            newFormAdder(lesson, word, toTry[i])
        }
    }
    
    if (hasFullDef) return
    if (word.length > 3 && word.substring(word.length - 3) == "mos") return

    const toCheck = deappendage(word)
    for (let i = 0; i < toCheck.length; i++) {
        if (-1 != A.subwordsToIgnore.indexOf(toCheck[i])) continue
        verbCheckOnly(lesson, toCheck[i], cause)
    }
}
