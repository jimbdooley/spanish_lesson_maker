
const A = {
    conjugations: {},
    reverseConjugations: {},
    irregularPastParticiples: [],
    maybeNotVerbs: [],
    typeFrequency: null,
    subwordsToIgnore: null,

    myGender: null,
    autoGender: null,
    genderInfo: {},
    myShortDefs: null,
    myLongDefs: null,
    wiki: null,
    freqInfo: null,
    myFreqInfo: null,
    manuelDict: null,
    manuelDictKeys: null,
    master5Dict: null,
    master5DictKeys: null,
    commonParticiplesArr: null,
    commonParticiplesDict: {},

    conflictingDefs: {}
}

function prepareConflictingDefs(_fileStr) {
    let fileStr = null
    if (_fileStr.indexOf("\r") != -1) {
        const fileStrArr = []
        for (let i = 0; i < _fileStr.length; i++) {
            if (_fileStr[i] == "\r") continue
            fileStrArr.push(_fileStr[i])
        }
        fileStr = fileStrArr.join("")
    } else {
        fileStr = _fileStr
    }

    const lines = fileStr.split("\n")
    for (let i = 0; i < lines.length; i++) {
        const arr = lines[i].split(" ")
        if (arr.length < 2) continue
        for (const el of arr) {
            if (el == "") continue
            if (!A.conflictingDefs.hasOwnProperty(el)) {
                A.conflictingDefs[el] = []
            }
            for (const el2 of arr) {
                if (el2 == "") continue
                if (el == el2) continue
                if (-1 == A.conflictingDefs[el].indexOf(el2)) {
                    A.conflictingDefs[el].push(el2)
                }
            
            }
        }
    }

}

function prepareIrregularPastParticiples() {
    for (const inf in A.conjugations) {
        const pps = A.conjugations[inf][4].split(",")
        for (const pp of pps) {
            last3 = pp.substring(pp.length - 3)
    
            if (last3 == "ido" || last3 == "ado") continue
            A.irregularPastParticiples.push(pp)
        }
    }
}

function prepareTypeFrequency() {
    const obj = A.freqInfo
    const myObj = A.myFreqInfo
    for (const key in myObj) {
        obj[key] = myObj[key]
    }
    A.typeFrequency = obj
}

function prepareMaybeNotVerbs(_fileStr) {
    let fileStr = null
    if (_fileStr.indexOf("\r") != -1) {
        const fileStrArr = []
        for (let i = 0; i < _fileStr.length; i++) {
            if (_fileStr[i] == "\r") continue
            fileStrArr.push(_fileStr[i])
        }
        fileStr = fileStrArr.join("")
    } else {
        fileStr = _fileStr
    }
    
    const lines = fileStr.split("\n")
    for (const line of lines) {
        if (line.length < 3 || line[0] == "#" || -1 == line.indexOf(" ")) continue
        const notVerb = line.substring(0, line.indexOf(" "))
        A.maybeNotVerbs.push(notVerb)
    }
}

function prepareSubwordsToIgnore(_fileStr) {
    let fileStr = null
    if (_fileStr.indexOf("\r") != -1) {
        const fileStrArr = []
        for (let i = 0; i < _fileStr.length; i++) {
            if (_fileStr[i] == "\r") continue
            fileStrArr.push(_fileStr[i])
        }
        fileStr = fileStrArr.join("")
    } else {
        fileStr = _fileStr
    }
    A.subwordsToIgnore = fileStr.split("\n")
    while (A.subwordsToIgnore[A.subwordsToIgnore.length - 1].length == 0) {
        A.subwordsToIgnore.pop()
    }
}

function prepareConjugations(_fileStr) {
    let fileStr = null
    if (_fileStr.indexOf("\r") != -1) {
        const fileStrArr = []
        for (let i = 0; i < _fileStr.length; i++) {
            if (_fileStr[i] == "\r") continue
            fileStrArr.push(_fileStr[i])
        }
        fileStr = fileStrArr.join("")
    } else {
        fileStr = _fileStr
    }

    const lines = fileStr.split("\n")
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] != "_") continue
        const inf = lines[i + 1]
        A.conjugations[inf] = [
            [[], [], [], [], []],
            [[], [], [], []],
            [[], []], 
            lines[i+2], 
            lines[i+3]
        ]
        for (j = 0; j < 2; j++) {
            const possParts = lines[i+2+j].split(",")
            for (const part of possParts) {
                if (!(part in A.reverseConjugations)) A.reverseConjugations[part] = []
                A.reverseConjugations[part].push((j + 6) + "", inf)
            }
        }
        for (let j = 0; j < 11; j++) {
            let moodI = 0
            let tenseI = j
            if (5 <= j && j < 9) {
                moodI = 1
                tenseI = j - 5
            } else if (9 <= j) {
                moodI = 2
                tenseI = j - 9
            }
            for (let pnI = 0; pnI < 6; pnI++) {
                const verbs = lines[i + 4 + j * 6 + pnI]
                A.conjugations[inf][moodI][tenseI].push(verbs)
                const possVerbs = lines[i + 4 + j * 6 + pnI].split(",")
                for (const _verb of possVerbs) {
                    let verb = _verb
                    if (verb == "-") continue
                    while (verb.indexOf(" ") != -1) {
                        verb = verb.substring(1 + verb.indexOf(" "), verb.length)
                    }
                    if (!(verb in A.reverseConjugations)) {
                        A.reverseConjugations[verb] = []
                    }
                    A.reverseConjugations[verb].push(`${moodI}${tenseI}${pnI}`, inf)
                }
            }
        }
    }
}

function prepareCommonParticiplesDict(fileStr) {
    for (const sarr of A.commonParticiplesArr) {
        A.commonParticiplesDict[sarr[0]] = sarr[2]
        A.commonParticiplesDict[sarr[1]] = sarr[3]
    }
}

function prepareAssets() {
    const start = Date.now()

    prepareCommonParticiplesDict(assets["txt/common_participle_defs.json"])
    prepareSubwordsToIgnore(assets["txt/subwordsToIgnore.txt"])
    
    prepareTypeFrequency()
    for (const key in A.freqObj) {
        A.freqObj[key] = parseInt(A.freqObj[key])
    }

    prepareMaybeNotVerbs(assets["txt/maybeNotVerbs.txt"])

    for (const word in A.autoGender) {
        A.genderInfo[word] = A.autoGender[word]
    }
    for (const word in A.myGender) {
        A.genderInfo[word] = A.myGender[word]
    }

    prepareConflictingDefs(assets["txt/myConflictingDefs.txt"])

    init_nonBreakingPrefixes(assets["txt/esSplitterInfo.txt"])

    prepareIrregularPastParticiples() 
    A.manuelDictKeys = Object.keys(A.manuelDict)
    A.master5DictKeys = Object.keys(A.master5Dict)

    console.log("assets prepped: " + (Date.now() - start))
}
