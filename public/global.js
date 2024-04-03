
const A = {
    conjugations: {},
    reverseConjugations: {},
    maybeNotVerbs: [],
    typeFrequency: null,
    subwordsToIgnore: null,

    myGender: null,
    autoGender: null,
    myShortDefs: null,
    myLongDefs: null,
    wiki: null,
    freqInfo: null,
    myFreqInfo: null,
    manuelDict: null,
    master5Dict: null,
    commonParticiplesArr: null,
    commonParticiplesDict: {},
}

function prepareShortDefs() {

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
            [[], []],
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
        for (let j = 0; j < 9; j++) {
            let moodI = 0
            let tenseI = j
            if (5 <= j && j < 7) {
                moodI = 1
                tenseI = j - 5
            } else if (7 <= j) {
                moodI = 2
                tenseI = j - 7
            }
            for (let pnI = 0; pnI < 6; pnI++) {
                let verb = lines[i + 4 + j * 6 + pnI]
                A.conjugations[inf][moodI][tenseI].push(verb)
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

function prepareCommonParticiplesDict(fileStr) {
    for (const sarr of A.commonParticiplesArr) {
        A.commonParticiplesDict[sarr[0]] = sarr[2]
        A.commonParticiplesDict[sarr[1]] = sarr[3]
    }
}

function prepareAssets() {
    const start = performance.now()

    prepareCommonParticiplesDict(assets["txt/common_participle_defs.json"])
    prepareSubwordsToIgnore(assets["txt/subwordsToIgnore.txt"])
    
    prepareTypeFrequency()

    prepareMaybeNotVerbs(assets["txt/maybeNotVerbs.txt"])
    prepareConjugations(assets["txt/verb_conjs.txt"])

    init_nonBreakingPrefixes(assets["txt/esSplitterInfo.txt"])
    console.log("assets prepped: " + (performance.now() - start))
}
