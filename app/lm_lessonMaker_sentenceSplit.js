

function sentenceSplit(sentenceStr) {
    const rtn = []
    let currWord = ""
    let lastStart = -1
    for (let i = 0; i < sentenceStr.length; i++) {
        const c = sentenceStr[i]
        const upperI = UPPER.indexOf(c)
        const lowerI = LOWER.indexOf(c)
        if (upperI == -1 && lowerI == -1) {
            if (currWord.length > 0) {
                rtn.push({
                    word: currWord,
                    loc: [lastStart, i]
                })
                lastStart = -1
                currWord = ""
            }
            lastStart = -1
        } else {
            if (lastStart == -1) {
                lastStart = i
            }
            currWord += LOWER[Math.max(upperI, lowerI)]
        }
    }
    if (currWord.length > 0) {
        rtn.push({
            word: currWord,
            loc: [lastStart, sentenceStr.length]
        })
    }
    return rtn
}
