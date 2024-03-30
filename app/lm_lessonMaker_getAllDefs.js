
function getAllDefs(lesson) {
    for (let i = 0; i < lesson.sentenceInfoList.length; i++) {
        for (const wordInfo of lesson.sentenceInfoList[i].wordInfoList) {
            if (lesson.defInfo.hasOwnProperty(wordInfo.word)) continue
            //try {
                getChangedWordDef(lesson, wordInfo.word, i, wordInfo.word, false)
            //} catch (e) {
            //    console.log("error for word: " + wordInfo.word)
            //    console.log("error in getAllDefs: " + e)
            //}
        }
    }


    const toDelete = []
    for (const word in lesson.defInfo) {
        if (lesson.defInfo[word].shortDef == null
            && lesson.defInfo[word].longDef == null) {
            toDelete.push(word)
        }
        if (lesson.defInfo[word].shortDef == null
            && lesson.defInfo[word].longDef != null) {
            const longDef = lesson.defInfo[word].longDef
            if (typeof longDef == "object"
                && longDef.length > 0
                && typeof longDef[0] == "object"
                && longDef[0].length > 0
                && typeof longDef[0][0] == "string") {
                lesson.defInfo[word].shortDef = longDef[0][0]
            } else {
                toDelete.push(word)
            }
        }
    }
    for (const word of toDelete) {
        delete lesson.defInfo[word]
    }

    for (const word in lesson.defInfo) {
        if (lesson.defInfo[word].longDef == null) continue
        if (lesson.defInfo[word].longDef.length > 1) continue
        if (lesson.defInfo[word].longDef[0].length > 1) continue
        let longDef = lesson.defInfo[word].longDef[0][0]
        const firstClose = longDef.indexOf(") ")
        if (firstClose != -1) {
            longDef = longDef.substring(firstClose + 2)
        }
        if (longDef == lesson.defInfo[word].shortDef) {
            lesson.defInfo[word].longDef = null
        }
    }
    

} 