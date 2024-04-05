
function wordsConflict(lesson, word1, word2) {
    if (word1 == word2) return true
    if (lesson.defInfo.hasOwnProperty(word1) 
        && lesson.defInfo[word1].hasOwnProperty("opts")) {
        if (-1 != lesson.defInfo[word1].opts.indexOf(word2)) {
            return true
        }
    }
    if (lesson.defInfo.hasOwnProperty(word2)
        && lesson.defInfo[word2].hasOwnProperty("opts")) {
        if (-1 != lesson.defInfo[word2].opts.indexOf(word1)) {
            return true
        }
    }
    const toDeconjA = [word1]
    const toDeconjB = [word2]
    for (let h = 0; h < 2; h++) {
        const toDeconj = (h == 0) ? toDeconjA : toDeconjB
        const word = (h == 0) ? word1 : word2
        if (word.length >= 3) {
            const last3 = word.substring(word.length - 3)
            if (last3 == "ida" || last3 == "ada") {
                toDeconj.push(word.substring(0, word.length - 1) + "o")
            }
        }
        if (word.length >= 4) {
            const last4 = word.substring(word.length - 4)
            if (last4 == "idas" || last4 == "idos" || last4 == "adas" || last4 == "ados") {
                toDeconj.push(word.substring(0, word.length - 2) + "o")
            }
        }
    }
    for (let h = 0; h < 2; h++) {
        const toDeconjs = (h == 0) ? toDeconjA : toDeconjB
        const toCompare = (h == 0) ? word2 : word1
        for (const toDeconj of toDeconjs) {
            if (A.reverseConjugations.hasOwnProperty(toDeconj)
                && -1 != A.reverseConjugations[toDeconj].indexOf(toCompare)) {
                return true
            }
            const deconjBlindRes = deconjugateBlind(toDeconj)
            if (-1 != deconjBlindRes.indexOf(toCompare)) {
                return true
            }
        }
    }


    return false
}

function getFakeDefs(lesson) {
    const definedWordArr = Object.keys(lesson.defInfo)
    for (let i = 0; i < definedWordArr.length - 1; i++) {
        for (let j = i + 1; j < definedWordArr.length; j++) {
            if (!wordsConflict(lesson, definedWordArr[i], definedWordArr[j])) {
                continue
            }
            if (!lesson.defInfo[definedWordArr[i]].hasOwnProperty("cf")) {
                lesson.defInfo[definedWordArr[i]].cf = []
            }
            if (!lesson.defInfo[definedWordArr[j]].hasOwnProperty("cf")) {
                lesson.defInfo[definedWordArr[j]].cf = []
            }
            if (-1 == lesson.defInfo[definedWordArr[i]].cf.indexOf(definedWordArr[j])) {
                lesson.defInfo[definedWordArr[i]].cf.push(definedWordArr[j])
            }
            if (-1 == lesson.defInfo[definedWordArr[j]].cf.indexOf(definedWordArr[i])) {
                lesson.defInfo[definedWordArr[j]].cf.push(definedWordArr[i])
            }
        }
    }

    const fakeDefN = 30
    const fakeNonInfDefN = 20
    for (let i = 0; i < 125 && lesson.fakeDefs.length + lesson.fakeInfDefs.length < fakeDefN; i++) {
        const keys = lesson.fakeDefs.length < fakeNonInfDefN ? A.manuelDictKeys : A.master5DictKeys
        const dicto = lesson.fakeDefs.length < fakeNonInfDefN ? A.manuelDict : A.master5Dict
        const targetArr = lesson.fakeDefs.length < fakeNonInfDefN ? lesson.fakeDefs : lesson.fakeInfDefs
        const randI = Math.floor(Math.random() * keys.length)
        const randWord = keys[randI]
        let randDef = ""
        if (lesson.fakeDefs.length < fakeNonInfDefN) {
            if (dicto[randWord].length == 0) continue 
            if (typeof dicto[randWord][0] != "string") continue
            randDef = dicto[randWord][0]
        } else {
            if (dicto[randWord].definitions.length == 0) continue
            if (typeof dicto[randWord].definitions[0] != "string") continue
            randDef = dicto[randWord].definitions[0]
        }
        if (2 >= randDef.length || randDef.length >= 28) continue
        if (lesson.defInfo.hasOwnProperty(randWord)) { continue }
        let isAConflict = false
        for (const definedWord in lesson.defInfo) {
            isAConflict = isAConflict || wordsConflict(lesson, definedWord, randWord)
            isAConflict = isAConflict || randDef == lesson.defInfo[definedWord].shortDef
        }
        if (isAConflict) { continue }
        targetArr.push([
            randWord,
            randDef
        ])
    }
}