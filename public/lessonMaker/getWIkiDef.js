
function removeWikiNewline(s) {
    if (s.indexOf("\n") == -1) return s
    let rtn = s.substring(0, s.indexOf("\n"))
    while (rtn.length > 0 && -1 != ":;,-".indexOf(rtn[rtn.length-1])) {
        rtn = rtn.substring(0, rtn.length - 1)
    }
    return rtn
}


const addWikiKeyToLongDef = (() => {
    const done = {}
    return function(longDef, defInfoObj, key) {
        const wikiDefArr = A.wiki[defInfoObj.word][key]
        for (let i = 0; i < Math.min(2, wikiDefArr.length); i++) {
            longDef.push(wikiDefArr[i])
            if (done.hasOwnProperty(defInfoObj.word)) continue
            longDef[longDef.length - 1][0] = removeWikiNewline(longDef[longDef.length - 1][0])
            longDef[longDef.length - 1][0] = `(${key}) ` + longDef[longDef.length - 1][0]
        }
        done[defInfoObj.word] = [key, wikiDefArr[0][0]]
    }
})();

const getWikiDef = (() => {
    const wikiShortDefs = {}
    return function(defInfoObj) {
        const freqInfo = A.typeFrequency.hasOwnProperty(defInfoObj.word)
            ? A.typeFrequency[defInfoObj.word] : []
        if (defInfoObj.shortDef == null) {
            let firstKey = freqInfo.length > 0 ? freqInfo[0] : null
            for (const key in A.wiki[defInfoObj.word]) {
                firstKey = firstKey == null ? key : firstKey            
                break
            }
            if (!wikiShortDefs.hasOwnProperty(defInfoObj.word)) {
                const shortDef = A.wiki[defInfoObj.word][firstKey][0][0]
                wikiShortDefs[defInfoObj.word] = removeWikiNewline(shortDef)
                if (shortDef.length > 0 && shortDef[0] == "(" && shortDef.indexOf(")") != -1) {
                    if (shortDef.indexOf(")") + 4 < shortDef.length) {
                        wikiShortDefs[defInfoObj.word] = wikiShortDefs[defInfoObj.word].substring(shortDef.indexOf(")") + 2)
                    }
                }
            }
            defInfoObj.shortDef = wikiShortDefs[defInfoObj.word]
        }
        if (defInfoObj.longDef == null) {
            const longDef = []
            for (const key of freqInfo) {
                if (!(key in A.wiki[defInfoObj.word])) continue
                addWikiKeyToLongDef(longDef, defInfoObj, key)
            }
            for (const key in A.wiki[defInfoObj.word]) {
                if (-1 != freqInfo.indexOf(key)) continue
                addWikiKeyToLongDef(longDef, defInfoObj, key)
            }
            defInfoObj.longDef = longDef
        }
    }
})()