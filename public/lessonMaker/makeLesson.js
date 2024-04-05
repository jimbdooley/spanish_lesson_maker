
function makeLesson(textStr, title) {
    const lesson = {
        lenTotal: 0,
        lenAveSent: 0,
        sentenceInfoList: [],
        defInfo: {},
        title: title,
        genders: {},
        conjs: {},
    }

    const sentences_paragraphs = paragraphSplit(textStr)
    const sentences = sentences_paragraphs[0]
    for (let i = 0; i < sentences.length; i++) {
        lesson.lenTotal += sentences[i].length
        const wordInfoList = sentenceSplit(sentences[i])
        lesson.sentenceInfoList.push({
            sentence: sentences[i],
            wordInfoList: wordInfoList,
            pGroup : sentences_paragraphs[1][i],
        })
    }
    lesson.lenAveSent = lesson.lenTotal / lesson.sentenceInfoList.length

    getAllDefs(lesson)
    getAllGenders(lesson)
    addQuiz4Conj(lesson)
    optionalForms(lesson)
    return lesson
}

