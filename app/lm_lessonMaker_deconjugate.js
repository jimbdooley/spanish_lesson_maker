
const revEndingsMap = {
    "o": {
        "000": "aeií"
    },
    "as": {
        "001": "a",
        "101": "eií",
        "211": "eií"
    },
    "es": {
        "001": "eií",
        "101": "a",
        "211": "a"
    },
    "a": {
        "002": "a",
        "100": "eií",
        "102": "eií",
        "201": "a",
        "202": "eií",
        "212": "eií"
    },
    "e": {
        "002": "eií",
        "100": "a",
        "102": "a",
        "201": "eií",
        "202": "a",
        "212": "a"
    },
    "amos": {
        "003": "a",
        "013": "a",
        "103": "eií",
        "203": "eií",
        "213": "eií"
    },
    "emos": {
        "003": "e",
        "043": "aeií",
        "103": "a",
        "203": "a",
        "213": "a"
    },
    "imos": {
        "003": "ií",
        "013": "eií"
    },
    "áis": {
        "004": "a",
        "104": "eií",
        "214": "eií"
    },
    "éis": {
        "004": "e",
        "044": "aeií",
        "104": "a",
        "214": "a"
    },
    "ís": {
        "004": "ií"
    },
    "an": {
        "005": "a",
        "105": "eií",
        "205": "eií",
        "215": "eií"
    },
    "en": {
        "005": "eií",
        "105": "a",
        "205": "a",
        "215": "a"
    },
    "é": {
        "010": "a",
        "040": "aeií"
    },
    "í": {
        "010": "eií"
    },
    "aste": {
        "011": "a"
    },
    "iste": {
        "011": "eií"
    },
    "ó": {
        "012": "a"
    },
    "ió": {
        "012": "eií"
    },
    "asteis": {
        "014": "a"
    },
    "isteis": {
        "014": "eií"
    },
    "aron": {
        "015": "a"
    },
    "ieron": {
        "015": "eií"
    },
    "aba": {
        "020": "a",
        "022": "a"
    },
    "ía": {
        "020": "eií",
        "022": "eií",
        "030": "aeií",
        "032": "aeií"
    },
    "abas": {
        "021": "a"
    },
    "ías": {
        "021": "eií",
        "031": "aeií"
    },
    "ábamos": {
        "023": "a"
    },
    "íamos": {
        "023": "eií",
        "033": "aeií"
    },
    "abais": {
        "024": "a"
    },
    "íais": {
        "024": "eií",
        "034": "aeií"
    },
    "aban": {
        "025": "a"
    },
    "ían": {
        "025": "eií",
        "035": "aeií"
    },
    "ás": {
        "041": "aeií"
    },
    "á": {
        "042": "aeií"
    },
    "án": {
        "045": "aeií"
    },
    "ra": {
        "110": "aeií",
        "112": "aeií"
    },
    "ras": {
        "111": "aeií"
    },
    "ramos": {
        "113": "aeií"
    },
    "rais": {
        "114": "aeií"
    },
    "ran": {
        "115": "aeií"
    },
    "se": {
        "120": "aeií",
        "122": "aeií"
    },
    "ses": {
        "121": "aeií"
    },
    "semos": {
        "123": "aeií"
    },
    "seis": {
        "124": "aeií"
    },
    "sen": {
        "125": "aeií"
    },
    "re": {
        "130": "aeií",
        "132": "aeií"
    },
    "res": {
        "131": "aeií"
    },
    "remos": {
        "133": "aeií"
    },
    "reis": {
        "134": "aeií"
    },
    "ren": {
        "135": "aeií"
    },
    "ad": {
        "204": "a"
    },
    "ed": {
        "204": "e"
    },
    "id": {
        "204": "i"
    },
    "íd": {
        "204": "í"
    },
    "ando": {
        "6": "a"
    },
    "yendo": {
        "6": "eií"
    },
    "endo": {
        "6": "eií"
    },
    "iendo": {
        "6": "eií"
    },
    "ado": {
        "7": "a"
    },
    "ído": {
        "7": "eií"
    },
    "ido": {
        "7": "eií"
    }
};

function deconjugatable(ending, conjKey, word) {
    if (word.length < ending.length) return false;
    if (ending != word.substring(word.length - ending.length, word.length)) return false;
    if (!(conjKey in revEndingsMap[ending])) return false;
    return true;
}

function deconjugateIndicative(ending, conjKey, word, lastVowels) {
    const rtn = [];
    if (!deconjugatable(ending, conjKey, word)) return rtn;
    if (conjKey[1] == "0") {
      if ((word.length > 1) && (word.substring(word.length - 2, word.length) == "jo")) {
        const ger = word.substring(0, word.length - 2) + "ger";
        const gir = word.substring(0, word.length - 2) + "gir";
        rtn.push(ger, conjKey);
        rtn.push(gir, conjKey);
      }
      if ((word.length > 1) && (word.substring(word.length - 2, word.length) == "go")) {
        const guir = word.substring(0, word.length - 2) + "guir";
        rtn.push(guir, conjKey);
      }
    }
    if (0 <= ("012").indexOf(conjKey[1])) {
      for (let i = 0; i < lastVowels.length; i++) {
        const guess = word.substring(0, word.length - ending.length) + lastVowels[i] + "r";
        rtn.push(guess, conjKey);
      }
    } else {
      const guess = word.substring(0, word.length - ending.length);
      rtn.push(guess, conjKey);
    }
    return rtn;
  }


function deconjugateSubjunctive(ending, conjKey, word, lastVowels) {
    const rtn = [];
    if (!deconjugatable(ending, conjKey, word)) return rtn;
    if (conjKey[1] == "0") {
        const presentIndicativeYo = word.substring(0, word.length - ending.length) + "o";
        const guesses = deconjugateIndicative("o", "000", presentIndicativeYo, lastVowels);
        for (let i = 0; i < guesses.length; i += 2) {
            rtn.push(guesses[i], conjKey);
        }
    }
    if (0 <= ("123").indexOf(conjKey[1])) {
        let pretIndicativeEllos = word.substring(0, word.length - ending.length) + "ron";
        if (conjKey[2] == "3") {
            if (!(word.charAt(word.length - 6) in delAccent)) {
                return rtn;
            }
            let ellosNoAccent = "";
            for (let i = 0; i < pretIndicativeEllos.length; i++) {
                if (pretIndicativeEllos[i] in delAccent) {
                ellosNoAccent += delAccent[pretIndicativeEllos[i]];
                } else {
                ellosNoAccent += pretIndicativeEllos[i];
                }
            }
            pretIndicativeEllos = ellosNoAccent;
        }
        
        let guesses = deconjugateIndicative("ieron", "015", pretIndicativeEllos, lastVowels);
        guesses = guesses.concat(deconjugateIndicative("aron", "015", pretIndicativeEllos, lastVowels));
        for (let i = 0; i < guesses.length; i += 2) {
            rtn.push(guesses[i], conjKey);
        }
    }
    return rtn;
}

function deconjugateParticiple(ending, conjKey, word) {
    const rtn = [];
    const lastVowels = revEndingsMap[ending][conjKey];
    for (let i = 0; i < lastVowels.length; i++) {
        const guess = word.substring(0, word.length - ending.length) + lastVowels[i] + "r";
        rtn.push(guess, conjKey);
    }
    return rtn;
}

function deconjugateImperative(ending, conjKey, word, lastVowels) {
    const rtn = [];
    if (!deconjugatable(ending, conjKey, word)) return rtn;
    if ((conjKey[1] == "0") && (conjKey[2] == "1")) {
        const guesses = deconjugateIndicative(ending, "002", word, lastVowels);
        for (let i = 0; i < guesses.length; i += 2) {
            rtn.push(guesses[i], conjKey);
        }
    } else if ((conjKey[1] == "1") && (conjKey[2] == "1")) {
        const wordM1 = word.substring(0, word.length - 1);
        const endingM1 = ending.substring(0, ending.length - 1);
        const guesses = deconjugateSubjunctive(endingM1, "102", wordM1, lastVowels);
        for (let i = 0; i < guesses.length; i += 2) {
            rtn.push(guesses[i], conjKey);
        }
    } else if ((conjKey[1] == "0") && (conjKey[2] == "4")) {
        rtn.push(word.substring(0, word.length - 1) + "r", conjKey);
    } else {
        const guesses = deconjugateSubjunctive(ending, "10" + conjKey[2], word, lastVowels);
        for (let i = 0; i < guesses.length; i += 2) {
            rtn.push(guesses[i], conjKey);
        }
    }
    return rtn;
}

function deconjugateBlind(word) {
    if (word.length > 4 && (
        word.substring(word.length - 4, word.length) == "adas"
        || word.substring(word.length - 4, word.length) == "ados"
        || word.substring(word.length - 4, word.length) == "idas"
        || word.substring(word.length - 4, word.length) == "idos"
    )) {
        const newWord = word.substring(0, word.length - 3) + "do"; 
        return deconjugateBlind(newWord)
    }
    let rtn = [];
    if (word.length > 3 && word.substring(word.length - 3, word.length) == "ada") {
        rtn = deconjugateBlind(word.substring(0, word.length - 2) + "do");
    }
    for (const ending in revEndingsMap) {
        if (!(ending in revEndingsMap)) continue;
        if (word.length < ending.length) continue;
        if (word.substring(word.length - ending.length, word.length) != ending) continue;
        for (const conjKey in revEndingsMap[ending]) {
        if (!(conjKey in revEndingsMap[ending])) continue;
        if (0 <= ("67").indexOf(conjKey[0])) {
            rtn = rtn.concat(deconjugateParticiple(ending, conjKey, word));
        }
        if (conjKey[0] == "0") {
            rtn = rtn.concat(deconjugateIndicative(ending, conjKey, word, revEndingsMap[ending][conjKey]));
        }
        if (conjKey[0] == "1") {
            rtn = rtn.concat(deconjugateSubjunctive(ending, conjKey, word, revEndingsMap[ending][conjKey]));
        }
        if (conjKey[0] == "2") {
            rtn = rtn.concat(deconjugateImperative(ending, conjKey, word, revEndingsMap[ending][conjKey]));
        }
        }
    }
    return rtn;
}
