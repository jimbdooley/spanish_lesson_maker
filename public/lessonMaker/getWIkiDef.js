



const getWikiDef = (() => {
    const wikiShortDefs = {}
    return function(defInfoObj) {
        if (defInfoObj.shortDef == null) {
            if (!wikiShortDefs.hasOwnProperty(defInfoObj.word)) {
                let shortDef = A.wiki[defInfoObj.word][0][0]
                if (-1 != shortDef.indexOf(")") 
                    && shortDef.length > 0 
                    && shortDef[0] == "("
                    && shortDef.indexOf(")") < shortDef.length - 3) {
                    shortDef = shortDef.slice(shortDef.indexOf(")") + 1)
                    while (shortDef[0] == " ") {
                        shortDef = shortDef.slice(1)
                    }
                }
                wikiShortDefs[defInfoObj.word] = shortDef
            }
            defInfoObj.shortDef = wikiShortDefs[defInfoObj.word]
        }
        if (defInfoObj.longDef == null) {
            defInfoObj.longDef = A.wiki[defInfoObj.word]
        }
    }
})()