
function customAdd(lesson, word, group) {
    function _customAddWord(lesson, cause, group, toDefine) {
        if (lesson.defInfo.hasOwnProperty(toDefine)) {
            lesson.defInfo[toDefine].g = Math.min(
                lesson.defInfo[toDefine].g, group
            )
            if (-1 == lesson.defInfo[toDefine].causes.indexOf(cause)) {
                lesson.defInfo[toDefine].causes.push(cause)
            }
        } else {
            const potentialDefInfo = {
                word: toDefine,
                shortDef: null,
                g: group,
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
        return true
    }

    if (word == "dimelo" || word == "dímelo") 
        return _customAddWords(lesson, word, group, ["decir", "me", "lo"])
    if (word == "diselo" || word == "díselo") 
        return _customAddWords(lesson, word, group, ["decir", "se", "lo"])
    if (word == "dime" || word == "díme") 
        return _customAddWords(lesson, word, group, ["decir", "me"])
    if (word == "son")
        return _customAddWords(lesson, word, group, ["ser"])

    return false
}