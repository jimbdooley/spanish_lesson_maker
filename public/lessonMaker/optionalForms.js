
function optionalForms(lesson) {
    for (const word in lesson.defInfo) {
        for (const optArr of [A.optsAdj, A.optsDeterminer]) {
            for (let i = 0; i < optArr.length; i++) {
                let matchFound = false
                for (let j = 0; j < optArr[i].length; i++) {
                    matchFound = matchFound || lesson.defInfo.hasOwnProperty(optArr[i][j])
                }
                if (!matchFound) continue
                if (!lesson.defInfo[word].hasOwnProperty('opts')) {
                    lesson.defInfo[word].opts = []
                }
                for (let j = 0; j < optArr[i].length; i++) {
                    if (lesson.defInfo.opts.hasOwnProperty(optArr[i][j])) continue
                    lesson.defInfo[word].opts.push(optArr[i][j])     
                }
            }
        }

        if (A.reverseConjugations.hasOwnProperty(wordInfo.word)
            && -1 != A.reverseConjugations[wordInfo.word].indexOf('7')) {
            if (!lesson.defInfo[word].hasOwnProperty('opts')) {
                lesson.defInfo[word].opts = []
            }
            const base = word.substring(0, word.length - 1)
            const opts = [
                base + "a",
                base + "os",
                base + "as",
            ]
            for (const opt of opts) {
                if (lesson.defInfo.opts.hasOwnProperty(opt)) continue
                lesson.defInfo[word].opts.push(opt)
            }
        }
    }
}