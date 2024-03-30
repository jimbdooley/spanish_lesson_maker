
function getChangedWordDef(lesson, word, group, cause, recursed=false) {
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

    if (A.reverseConjugations.hasOwnProperty(word)) {
        const knownInfinitives = A.reverseConjugations[word]
        for (let i = 0; i < knownInfinitives.length; i += 2) {
            newFormAdder(lesson, word, knownInfinitives[i + 1])
        }
    } else {
        if (lesson.defInfo[word].shortDef == null && !hasFullDef) {
            const toCheck = deconjugateBlind(word)
            const checked = []
            for (let i = 0 ; i < toCheck.length; i += 2) {
                if (-1 != checked.indexOf(toCheck[i])) continue 
                newFormAdder(lesson, word, toCheck[i])
                checked.push(toCheck[i])
            }
        }
    }

    if (lesson.defInfo[word].shortDef == null && !hasFullDef) {
        const toTry = removeSuffixes(word)
        for (let i = 0; i < toTry.length; i++) {
            if (-1 != A.subwordsToIgnore.indexOf(toTry[i])) continue
            newFormAdder(lesson, word, toTry[i])
        }
    }
    
    if (recursed || hasFullDef) return
    if (word.length > 3 && word.substring(word.length - 3) == "mos") return

    const toCheck = deappendage(word)
    for (let i = 0; i < toCheck.length; i++) {
        if (-1 != A.subwordsToIgnore.indexOf(toCheck[i])) continue
        getChangedWordDef(lesson, toCheck[i], group, cause, true)
    }
}