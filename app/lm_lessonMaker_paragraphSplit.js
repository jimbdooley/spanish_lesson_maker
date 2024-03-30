
const nonBreakingPrefixes = []
function init_nonBreakingPrefixes(fileStr) {
    while (fileStr.indexOf("\r\n") !== -1) {
        fileStr = fileStr.replace("\r\n", "\n")
    }
    const lines = fileStr.split("\n")
    for (const _line of lines) {
        const lineArr = []
        for (const c of _line) {
            const upperI = UPPER.indexOf(c)
            lineArr.push(upperI != -1 ? LOWER[upperI] : c)
        }
        const line = lineArr.join("")
        if (line.length === 0) {
            continue
        }
        if (line[0] === "#") {
            continue
        }
        nonBreakingPrefixes.push(line)
    }
}

function detectDoubleNewlinePSplit(textStr) {
    // todo, detect if the text uses \+n or \+n+\+n for paragraph splits
    return false
}

const paragraphSplit = (() => {
    const charsForAbbreviationCheck = UPPER + LOWER + "."
    return function(textStr) {
        const rtn = []
        const pGroups = []
    
        let currSentence = ""
        let currWord = ""
        let isNewP = false
        for (let i = 0; i < textStr.length; i++) {
    
            if (-1 == WHITE_SPACES.indexOf(textStr[i])) {
                currSentence += textStr[i]
            } else {
                if (currSentence.length > 0 && currSentence[currSentence.length - 1] !== " ") {
                    currSentence += " "
                }
            }

            let doubleNewline = i > 0 && textStr[i] == "\n" && textStr[i - 1] == "\n"
            doubleNewline |= i > 2 && textStr[i] == "\n" && textStr[i - 1] == "\r" && textStr[i - 2] == "\n" && textStr[i - 3] == "\r"
            const newLinePSplit = detectDoubleNewlinePSplit(textStr) ? doubleNewline : textStr[i] == "\n"
            isNewP = isNewP || newLinePSplit || textStr[i] == "\t"

            let nonNameAbbreviation = false
            if (textStr[i] == "." && nonBreakingPrefixes.indexOf(currWord) !== -1) {
                nonNameAbbreviation = true
                currWord = ""
            } else if (-1 != charsForAbbreviationCheck.indexOf(textStr[i])) {
                const upperI = UPPER.indexOf(textStr[i])
                currWord += upperI != -1 ? LOWER[upperI] : textStr[i]
            } else {
                currWord = ""
            }
    
            let periodSentenceEnd = false
            if (textStr[i] === '.' && !nonNameAbbreviation) {
                periodSentenceEnd |= i + 1 < textStr.length && textStr[i] === '.'
                const nameAbbreviation = i > 1 && UPPER.indexOf(textStr[i-1]) != -1 && WHITE_SPACES.indexOf(textStr[i-2]) != -1
                periodSentenceEnd &= !nameAbbreviation
                periodSentenceEnd &= i + 1 < textStr.length && WHITE_SPACES.indexOf(textStr[i + 1]) !== -1
            }
    
            let sentenceEnd = periodSentenceEnd
            sentenceEnd |= i + 1 < textStr.length && textStr[i] === '?'
            sentenceEnd |= i + 1 < textStr.length && textStr[i] === '!'
            sentenceEnd |= i + 1 < textStr.length && textStr[i] == "\n" && textStr[i + 1] == "\n"
            sentenceEnd |= i + 1 < textStr.length && -1 != UPPER.indexOf(textStr[i + 1]) && textStr[i] == "\n"
            sentenceEnd |= i + 2 < textStr.length && -1 != UPPER.indexOf(textStr[i + 2]) && textStr[i] == "\r" && textStr[i+1] == "\n"
    
            if (sentenceEnd && currSentence.length > 0) {
                rtn.push(currSentence)
                pGroups.push(pGroups.length == 0 ? 0 : pGroups[pGroups.length-1] + (isNewP ? 1 : 0))
                isNewP = false
                currSentence = ""
                continue
            }
        }

        if (currSentence.length > 0) {
            rtn.push(currSentence)
            pGroups.push(pGroups.length == 0 ? 0 : pGroups[pGroups.length-1] + (isNewP ? 1 : 0))
            pGroups.push(pGroups.length == 0 ? 0 : 1)
        }
    
        return [rtn, pGroups]
    }

})();

