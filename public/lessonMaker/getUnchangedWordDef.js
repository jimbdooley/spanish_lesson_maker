

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

    if (A.wiki.hasOwnProperty(defInfoObj.word)) {
        if (A.wiki[defInfoObj.word].length > 0 
            && A.wiki[defInfoObj.word][0].length > 0
            && typeof A.wiki[defInfoObj.word][0][0] == "string"
            && A.wiki[defInfoObj.word][0][0].length > 0) {
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