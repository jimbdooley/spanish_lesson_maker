
const S = {
    prepared : false,
}

function API_makeLesson(textStr, title) {
    if (!S.prepared) {
        prepareAssets()
        S.prepared = true
    }

    const lesson = makeLesson(textStr, title)
    if (lesson.title == null) {
        if (lesson.sentenceInfoList.length > 0) {
            lesson.title = lesson.sentenceInfoList[0].sentence
        }
    }
    if (lesson.title == null || lesson.title.length == 0) {
        lesson.title = "Unnamed Lesson"
    }
    return lesson
}