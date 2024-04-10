
function addConjQuiz(lesson, group, word) {
    if (!A.reverseConjugations.hasOwnProperty(word)) return
    if (A.maybeNotVerbs.indexOf(word) !== -1) return
    if (lesson.conjs.hasOwnProperty(word)) return

    lesson.conjs[word] = {
        g: group,
        c: []
    }

    const conjList = A.reverseConjugations[word]
    for (let i = 0; i < conjList.length; i+=2) {
        if (!lesson.defInfo.hasOwnProperty(conjList[i+1])) continue
        lesson.conjs[word].c.push(conjList[i], conjList[i+1])
    }
}

function addQuiz4Conj(lesson) {
    for (let i = 0; i < lesson.sentenceInfoList.length; i++) {
        for (const wordInfo of lesson.sentenceInfoList[i].wordInfoList) {
            addConjQuiz(lesson, i, wordInfo.word)
            //if (!A.reverseConjugations.hasOwnProperty(wordInfo.word)) continue
            //if (A.maybeNotVerbs.indexOf(wordInfo.word) !== -1) continue
            //if (lesson.conjs.hasOwnProperty(wordInfo.word)) continue
            //lesson.conjs[wordInfo.word] = {
            //    g: i,
            //    c: []
            //}
            //const conjList = A.reverseConjugations[wordInfo.word]
            //for (let j = 0; j < conjList.length; j+=2) {
            //    if (!lesson.defInfo.hasOwnProperty(conjList[j+1])) continue
            //    lesson.conjs[wordInfo.word].c.push(conjList[j], conjList[j+1])
            //}
        }
    }
}
