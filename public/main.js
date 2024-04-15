
const S = {
    prepared : false,
    status: "right now just 0",
    eMsg: "nuthin yut",
}

prepareConjugations(assets["txt/verb_conjs.txt"])
function API_makeLesson(textStr, title) {
    S.status = "right now just " + 1
    if (!S.prepared) {
        try {
            prepareAssets()
        } catch (e) {
            S.eMsg = e
            return
        }
        S.prepared = true
    }
    S.status = "right now just " + 2

    const lesson = makeLesson(textStr, title)

    S.status = "right now just " + 3
    if (lesson.title == null) {
        if (lesson.sentenceInfoList.length > 0) {
            lesson.title = lesson.sentenceInfoList[0].sentence
        }
    }
    S.status = "right now just " + 4
    if (lesson.title == null || lesson.title.length == 0) {
        lesson.title = "Unnamed Lesson"
    }
    S.status = "right now just " + 5
    return lesson
}

function getStatus() {
    return S.status + " e: " + S.eMsg
}

function API_makeLessonToString(textStr, title) {
    return JSON.stringify(API_makeLesson(textStr, title))
}
