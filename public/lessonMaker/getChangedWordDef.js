
function getChangedWordDef(lesson, word, group, cause) {
    if (!lesson.defInfo.hasOwnProperty(word)) {
        lesson.defInfo[word] = {
            word: word,
            shortDef: null,
            g: group,
            causes: [cause],
            longDef: null,
        }
    } else {
        lesson.defInfo[word].g = Math.min(lesson.defInfo[word].g, group)
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

    const toCheck_apps = deappendage(word)
    const toCheck = toCheck_apps[0]
    const apps = toCheck_apps[1]
    for (let i = 0; i < toCheck.length; i++) {
        if (-1 != A.subwordsToIgnore.indexOf(toCheck[i])) continue
        const added = verbCheckOnly(lesson, toCheck[i], cause)
        if (added) {
            for (let j = 0; j < apps[i].length; j++) {
                newFormAdder(lesson, word, apps[i][j])
            }
        }
    }
}
