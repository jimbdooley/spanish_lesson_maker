
function customAdd(lesson, word, group) {
    function _customAddWord(lesson, cause, group, toDefine) {
        if (lesson.defInfo.hasOwnProperty(toDefine)) {
            lesson.defInfo[toDefine].group = Math.min(
                lesson.defInfo[toDefine].group, group
            )
            if (-1 == lesson.defInfo[toDefine].causes.indexOf(cause)) {
                lesson.defInfo[toDefine].causes.push(cause)
            }
        } else {
            const potentialDefInfo = {
                word: toDefine,
                shortDef: null,
                group: group,
                causes: [cause],
                longDef: null,
            }
            getUnchangedWordDef(potentialDefInfo)
            if (potentialDefInfo.longDef != null
                || potentialDefInfo.shortDef != null) {
                lesson.defInfo[toDefine] = potentialDefInfo
            }
        }
    } 
    function _customAddWords(lesson, cause, group, toDefineList) {
        for (const toDefine of toDefineList) {
            _customAddWord(lesson, cause, group, toDefine)
        }
    }

    if (word == "dimelo" || word == "dímelo") {
        _customAddWords(lesson, word, group, ["decir", "me", "lo"])
        return true
    }

    if (word == "dime" || word == "díme") {
        _customAddWords(lesson, word, group, ["decir", "me"])
        return true
    }

    return false
}