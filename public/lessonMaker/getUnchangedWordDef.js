

function getUnchangedWordDef(defInfoObj) {
    if (A.myShortDefs.hasOwnProperty(defInfoObj.word)) {
        defInfoObj.shortDef = A.myShortDefs[defInfoObj.word]
    }

    if (A.myLongDefs.hasOwnProperty(defInfoObj.word)) {
        defInfoObj.longDef = A.myLongDefs[defInfoObj.word]
    }
    
    if (A.commonParticiplesDict.hasOwnProperty(defInfoObj.word)) {
        const shortDef = A.commonParticiplesDict[defInfoObj.word]
        defInfoObj.shortDef = shortDef
    } 
    
    if (defInfoObj.shortDef == null
        && A.master5Dict.hasOwnProperty(defInfoObj.word)
        && A.master5Dict[defInfoObj.word].hasOwnProperty("definitions")
        && A.master5Dict[defInfoObj.word].definitions.length > 0
        && typeof A.master5Dict[defInfoObj.word].definitions[0] == "string") {
        const shortDef = A.master5Dict[defInfoObj.word].definitions[0]
        defInfoObj.shortDef = shortDef
    }

    if (A.wiki.hasOwnProperty(defInfoObj.word)
        && 0 < Object.keys(A.wiki[defInfoObj.word]).length) {
        let wikiObjIsValid = true
        for (const key in A.wiki[defInfoObj.word]) {
            wikiObjIsValid &= typeof A.wiki[defInfoObj.word][key] == "object"
            if (!wikiObjIsValid) break
            wikiObjIsValid &= A.wiki[defInfoObj.word][key].length > 0
            for (let i = 0; i < A.wiki[defInfoObj.word][key].length; i++) {
                wikiObjIsValid &= A.wiki[defInfoObj.word][key][i].length > 0
                for (let j = 0; j < A.wiki[defInfoObj.word][key][i].length; j++) {
                    wikiObjIsValid &= typeof A.wiki[defInfoObj.word][key][i][j] == "string"
                }
            }
        }
        if (wikiObjIsValid) {
            getWikiDef(defInfoObj)
        }
    }

    if (defInfoObj.shortDef == null && A.manuelDict.hasOwnProperty(defInfoObj.word)) {
        const shortDef = A.manuelDict[defInfoObj.word][0]
        defInfoObj.shortDef = shortDef
    }

    if (defInfoObj.longDef == null && A.manuelDict.hasOwnProperty(defInfoObj.word)) {
        const longDef = []
        for (let i = 0; i < A.manuelDict[defInfoObj.word].length; i+=2) {
            longDef.push([A.manuelDict[defInfoObj.word][i], A.manuelDict[defInfoObj.word][i+1]])
        }
        defInfoObj.longDef = longDef
    }
}