
function makeLesson(textStr, title) {

    const lesson = {
        sentenceInfoList: [],
        defInfo: {},
        title: title,
    }

    const sentences_paragraphs = paragraphSplit(textStr)
    const sentences = sentences_paragraphs[0]
    for (let i = 0; i < sentences.length; i++) {
        const wordInfoList = sentenceSplit(sentences[i])
        lesson.sentenceInfoList.push({
            sentence: sentences[i],
            wordInfoList: wordInfoList,
            pGroup : sentences_paragraphs[1][i],
        })
    }

    getAllDefs(lesson)

    return lesson
}

