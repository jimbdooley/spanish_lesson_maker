
function optionalForms(lesson) {
    for (const word in lesson.defInfo) {
        for (const optArr of [A.optsAdj, A.optsDeterminer]) {
            for (let i = 0; i < optArr.length; i++) {
                let matchFound = false
                for (let j = 0; j < optArr[i].length; j++) {
                    matchFound = matchFound || word == optArr[i][j]
                }
                if (!matchFound) continue
                if (!lesson.defInfo[word].hasOwnProperty('opts')) {
                    lesson.defInfo[word].opts = []
                }
                for (let j = 0; j < optArr[i].length; j++) {
                    if (word == optArr[i][j]) continue
                    if (-1 != lesson.defInfo[word].opts.indexOf(optArr[i][j])) continue
                    lesson.defInfo[word].opts.push(optArr[i][j])     
                }
            }
        }

        if (A.reverseConjugations.hasOwnProperty(word)
            && -1 != A.reverseConjugations[word].indexOf('7')) {
            if (!lesson.defInfo[word].hasOwnProperty('opts')) {
                lesson.defInfo[word].opts = []
            }
            const base = word.substring(0, word.length - 1)
            const optsToTry = [
                base + "a",
                base + "os",
                base + "as",
            ]
            for (const optToTry of optsToTry) {
                if (-1 != lesson.defInfo[word].opts.indexOf(optToTry)) continue
                lesson.defInfo[word].opts.push(optToTry)
            }
        }
    }
}