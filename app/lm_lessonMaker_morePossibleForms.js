

// depluralize a spanish word
function depluralize(s) {
    const rtn = []
    
    if (s.length == 0 || s[s.length - 1] != "s") return rtn

    rtn.push(s.substring(0, s.length - 1))
    if (s.length > 2 && s[s.length - 2] == "e") {
        if (s.length > 3 && s[s.length - 3] == "c") {
            rtn.push(s.substring(0, s.length - 3) + "z")
        } else {
            rtn.push(s.substring(0, s.length - 2))
        }
    }
    return rtn
}

function malify(s) {
    const rtn = []
    if (s.length < 3) return rtn
    if (s[s.length-1] == "a") {
        rtn.push(s.substring(0, s.length - 1) + "o")
    }
    if (s.substring(s.length - 2, s.length) == "as") {
        rtn.push(s.substring(0, s.length - 2) + "o")
    }
    return rtn
}

function deappendage(s) {
    function _deappendage(s, arr, depth) {
        if (depth == 2) return
        if (s.length < 4) return
        for (const appendage of APPENDABLE) {
            if (s.substring(s.length - appendage.length) != appendage) continue
            const newForm = s.substring(0, s.length - appendage.length)
            arr.push(newForm)
            let deAccented = ""
            for (let i = 0; i < newForm.length; i++) {
                const accentI = ACCENTED.indexOf(newForm[i])
                deAccented += accentI == -1 ? newForm[i] : DE_ACCENTED[accentI]
            }
            if (deAccented != newForm) arr.push(deAccented)
            _deappendage(newForm, arr, depth + 1)
        }
    }

    const rtn = []
    _deappendage(s, rtn, 0)
    return rtn
}