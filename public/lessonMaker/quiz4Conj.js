
function addQuiz4Conj(lesson) {
    for (let i = 0; i < lesson.sentenceInfoList.length; i++) {
        for (const wordInfo of lesson.sentenceInfoList[i].wordInfoList) {
            if (!A.reverseConjugations.hasOwnProperty(wordInfo.word)) continue
            if (A.maybeNotVerbs.indexOf(wordInfo.word) !== -1) continue
            if (lesson.conjs.hasOwnProperty(wordInfo.word)) continue

            lesson.conjs[wordInfo.word] = {
                g: i,
                c: []
            }
            const conjList = A.reverseConjugations[wordInfo.word]
            for (let j = 0; j < conjList.length; j+=2) {
                if (!lesson.defInfo.hasOwnProperty(conjList[j+1])) continue
                lesson.conjs[wordInfo.word].c.push(conjList[j], conjList[j+1])
            }
        }
    }
}
