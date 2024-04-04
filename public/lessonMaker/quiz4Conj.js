
function addQuiz4Conj(lesson) {
    for (let i = 0; i < lesson.sentenceInfoList.length; i++) {
        for (const wordInfo of lesson.sentenceInfoList[i].wordInfoList) {
            if (wordInfo.word in A.reverseConjugations) {
                if (A.maybeNotVerbs.indexOf(wordInfo.word) !== -1) continue
                lesson.conjs[wordInfo.word] = []
                const conjList = A.reverseConjugations[wordInfo.word]
                for (let j = 0; j < conjList.length; j++) {
                    if (!lesson.defInfo.hasOwnProperty(conjList[j+1])) continue
                    lesson.conjs[wordInfo.word].push(conjList[j], conjList[j+1])
                }
            }
        }
    }
}
