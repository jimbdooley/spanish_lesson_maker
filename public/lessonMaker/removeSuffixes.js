

/*
    takes a word, and tries to remove varius suffixes from it
    returning an array of the possible base words
    its ok if they are not real words, the point
    is to get a list of *_potential_* base words
*/

const removeSuffixes = (() => {
    const exceptions = {
        pajarito: "pájaro",
        cafecito: "café",
        lapicito: "lápiz",
        rinconcito: "rincón",
        pudo: null,
    }
    return function(_word) {
        const rtn = []
        if (_word.length < 4) return rtn
        const word = _word[_word.length-1] != "s" ? _word : _word.substring(0, _word.length-1)
        if (word.length < 4) return rtn

        if (exceptions.hasOwnProperty(word)) { return [exceptions[word]] }
        if (word[word.length - 1] == "a") {
            const mf = word.substring(0, word.length - 1) + "o"
            if (exceptions.hasOwnProperty(mf)) {
                if (exceptions[mf][exceptions[mf].length - 1] == "o") {
                    rtn.push(exceptions[mf].substring(0, exceptions[mf].length - 1) + "a")
                } else {
                    rtn.push(exceptions[mf])
                }
                if (rtn[0] == null) {
                    return []
                } else {
                    return rtn
                }
            }
        }
        
        removeSuffix(rtn, word, "it", "oa")
        removeSuffix(rtn, word, "ic", "oa")
        removeSuffix(rtn, word, "ill", "oa")
        removeSuffix(rtn, word, "ísim", "oa")
        removeSuffix(rtn, word, "zuel", "oa")
        removeSuffix(rtn, word, "ot", "ea")
        removeSuffix(rtn, word, "az", "oa")
        removeSuffix(rtn, word, "ach", "oa")
        removeSuffix(rtn, word, "uch", "oa")
        removeSuffix(rtn, word, "ud", "oa")
        removeSuffix(rtn, word, "aj", "oa")
        
        const toDel = []
        for (let i = 0; i < rtn.length; i++) {
            if (rtn[i].length > 1) continue
            toDel.push(i)
        }
        for (let i = toDel.length - 1; i >= 0; i--) {
            rtn.splice(toDel[i], 1)
        }
    
        return rtn
    }
})();



function removeSuffix(arr, _word, suffix, endingLetters) {
    if (_word.length == 0) return
    let word = _word
    if (word[word.length - 1] == "s") {
        word = word.substring(0, word.length - 1)
    }
    const lastLetter = word[word.length - 1]
    if (-1 == endingLetters.indexOf(lastLetter)) return
    word = word.substring(0, word.length - 1)

    if (word.length <= suffix.length) return
    const wordEnd = word.substring(word.length - suffix.length, word.length)
    if (wordEnd != suffix) return

    const lastLetterForSimple = lastLetter == "e" ? "o" : lastLetter
    arr.push(word.substring(0, word.length - suffix.length) + lastLetterForSimple)
    arr.push(word.substring(0, word.length - suffix.length))

    // c -> qu
    if (-1 != ["it", "ill", "ísim", "ico"].indexOf(suffix)
        && word.length > 2 + suffix.length
        && word.substr(word.length - 2 - suffix.length, 2) == "qu") {
        
        const pWord = word.substring(0, word.length - 2 - suffix.length) + "c" + lastLetter
        if (-1 == arr.indexOf(pWord)) arr.push(pWord)
    }

    // g -> gu
    if (-1 != ["it", "ill", "ísim", "ico"].indexOf(suffix)
        && word.length > 2 + suffix.length
        && word.substr(word.length - 2 - suffix.length, 2) == "gu") {
        
        const pWord = word.substring(0, word.length - 2 - suffix.length) + "g" + lastLetter
        if (-1 == arr.indexOf(pWord)) arr.push(pWord)
    }

    // ec + prefix
    if (-1 != ["it", "ill", "ísim", "ico"].indexOf(suffix)
        && word.length > 2 + suffix.length
        && word.substr(word.length - 2 - suffix.length, 2) == "ec") {
        
        const pWords = [
            word.substring(0, word.length - 2 - suffix.length), // florecita -> flor
            word.substring(0, word.length - 2 - suffix.length) + lastLetter, // nuevecito -> nuevo
            word.substring(0, word.length - 2 - suffix.length) + "e", // fuentecita -> fuente
            word.substring(0, word.length - 2 - suffix.length) + "ez",
            word.substring(0, word.length - 2 - suffix.length) + "ez" + lastLetter, // cervecita -> cerveza
            word.substring(0, word.length - 2 - suffix.length) + "é", // cafecito -> café
        ]
        if (word[word.length - 3 - suffix.length] == "c") {
            pWords.push(word.substring(0, word.length - 3 - suffix.length) + "z") // lucecita -> luz
            pWords.push(word.substring(0, word.length - 3 - suffix.length) + "z" + lastLetter)
        }

        for (const pWord of pWords) {
            if (-1 == arr.indexOf(pWord)) arr.push(pWord)
        }
        // (n/r)c + prefix
    } else if (-1 != ["it", "ill"].indexOf(suffix)
        && word.length > 2 + suffix.length
        && word[word.length - 1 - suffix.length]== "c"
        && -1 != "nr".indexOf(word[word.length - 2 - suffix.length])) {
        
        const pWord = word.substring(0, word.length - 1 - suffix.length)
        if (-1 == arr.indexOf(pWord)) arr.push(pWord)
    } else if (-1 != ["it", "ill"].indexOf(suffix)
        && word.length > 2 + suffix.length
        && word[word.length - 1 - suffix.length]== "c"
        && -1 == "enr".indexOf(word[word.length - 2 - suffix.length])) {
        const pWord = word.substring(0, word.length - 1 - suffix.length) + "z"
        if (-1 == arr.indexOf(pWord)) arr.push(pWord)
    }

}
