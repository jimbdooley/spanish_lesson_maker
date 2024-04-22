
const customAdd = (() => {
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
    const customAddDict = {
        dimelo: ["decir", "me", "lo"],
        dímelo: ["decir", "me", "lo"],
        diselo: ["decir", "se", "lo"],
        díselo: ["decir", "se", "lo"],
        dime: ["decir", "me"],
        díme: ["decir", "me"],
        son: ["ser"],
        lista: ["lista", "listo"],
        listas: ["lista", "listo"],
        les: ["le"],
        amos: ["amo"],
        aguas: ["agua", "aguar", "aguas"],
        pocos: ["poco"],
        pocas: ["poco"],
        poca: ["poco"],
        algunos: ["alguno"],
        algunas: ["alguno"],
        alguna: ["alguno"],
        algún: ["alguno"],
    }
    return function(lesson, word, group) {
        if (customAddDict.hasOwnProperty(word)) {
            _customAddWords(lesson, word, group, customAddDict[word])
            return true
        }
        return false
    }
})();
