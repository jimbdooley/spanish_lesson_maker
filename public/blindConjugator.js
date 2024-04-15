
const BC_ENDS = {"indicative": {}, "subjunctive": {}}

const addAccent = {"n":"ñ","a":"á","e":"é","i":"í","o":"ó","u":"ú","N":"Ñ","A":"Á","E":"É","I":"Í","O":"Ó","U":"Ú"}
const removeAccent = {"ñ":"n","á":"a","é":"e","í":"i","ó":"o","ú":"u","Ñ":"N","Á":"A","É":"E","Í":"I","Ó":"O","Ú":"U"}

BC_ENDS["indicative"]["present"] = {}
BC_ENDS["indicative"]["present"]["ar"] = ["o", "as", "a", "amos", "áis", "an"]
BC_ENDS["indicative"]["present"]["er"] = ["o", "es", "e", "emos", "éis", "en"]
BC_ENDS["indicative"]["present"]["ir"] = ["o", "es", "e", "imos", "ís", "en"]
BC_ENDS["indicative"]["present"]["ír"] = BC_ENDS["indicative"]["present"]["ir"]

//regular conjugation
BC_ENDS["indicative"]["preterite"] = {}
BC_ENDS["indicative"]["preterite"]["ar"] = ["é", "aste", "ó", "amos", "asteis", "aron"]
BC_ENDS["indicative"]["preterite"]["er"] = ["í", "iste", "ió", "imos", "isteis", "ieron"]
BC_ENDS["indicative"]["preterite"]["ir"] = BC_ENDS["indicative"]["preterite"]["er"]
BC_ENDS["indicative"]["preterite"]["ír"] = BC_ENDS["indicative"]["preterite"]["ir"]

//regular conjugation
BC_ENDS["indicative"]["imperfect"] = {}
BC_ENDS["indicative"]["imperfect"]["ar"] = ["aba", "abas", "aba", "ábamos", "abais", "aban"]
BC_ENDS["indicative"]["imperfect"]["er"] = ["ía", "ías", "ía", "íamos", "íais", "ían"]
BC_ENDS["indicative"]["imperfect"]["ir"] = BC_ENDS["indicative"]["imperfect"]["er"]
BC_ENDS["indicative"]["imperfect"]["ír"] = BC_ENDS["indicative"]["imperfect"]["ir"]

//appends to infinitive
BC_ENDS["indicative"]["conditional"] = ["ía", "ías", "ía", "íamos", "íais", "ían"]

//appends to infinitive
BC_ENDS["indicative"]["future"] = ["é", "ás", "á", "emos", "éis", "án"]

//appends to infinitive
BC_ENDS["subjunctive"]["present"] = {}
BC_ENDS["subjunctive"]["present"]["ar"] = ["e", "es", "e", "emos", "éis", "en"]
BC_ENDS["subjunctive"]["present"]["er"] = ["a", "as", "a", "amos", "áis", "an"]
BC_ENDS["subjunctive"]["present"]["ir"] = BC_ENDS["subjunctive"]["present"]["er"]
BC_ENDS["subjunctive"]["present"]["ír"] = BC_ENDS["subjunctive"]["present"]["ir"]

BC_ENDS["subjunctive"]["imperfect"] = ["ra","ras","ra","ramos","rais","ran"]
BC_ENDS["subjunctive"]["imperfect 2"] = ["se","ses","se","semos","seis","sen"]
BC_ENDS["subjunctive"]["future"] = ["re","res","re","remos","reis","ren"]



function pastParticipleConjugator(verb) {
    if (verb[verb.length - 2] == "a") {
        return verb.substring(0, verb.length - 2) + "ado";
    } else {
        return verb.substring(0, verb.length - 2) + "ido";
    }
}

function presentParticipleConjugator(verb) {
    if (verb[verb.length - 2] == "a") {
        return verb.substring(0, verb.length - 2) + "ando";
    } else {
        return verb.substring(0, verb.length - 2) + "iendo";
    }
}


function indicativeConjugator(verb, tenseStr, subject) {
    if (["present", "preterite", "imperfect"].indexOf(tenseStr) != -1) {
        const verbEnding = verb.substring(verb.length - 2, verb.length);
        return verb.substring(0, verb.length - 2) + BC_ENDS["indicative"][tenseStr][verbEnding][subject];
    }
    if (["conditional", "future"].indexOf(tenseStr) != -1) {
        return verb + BC_ENDS["indicative"][tenseStr][subject];
    }
}

function subjunctiveConjugator(verb, tenseStr, subject) {
    if (tenseStr == "present") {
        const yoForm = indicativeConjugator(verb, "present", 0);
        const verbEnding = verb.substring(verb.length - 2, verb.length);
        return yoForm.substring(0, yoForm.length - 1) + BC_ENDS["subjunctive"][tenseStr][verbEnding][subject];
    }
    if (tenseStr == "imperfect" || tenseStr == "imperfect 2" || tenseStr == "future") {
        let ellos_form = indicativeConjugator(verb, "preterite", 5);
        if(subject == 3){
            let ellos_form_temp = "";
            for(let i = 0; i < ellos_form.length; i++){
                if(i==ellos_form.length-4){
                    if(ellos_form[i] in addAccent){
                        ellos_form_temp += addAccent[ellos_form[i]]; 
                    } else {
                        ellos_form_temp += ellos_form[i]
                    }
                } else {
                    if(ellos_form[i] in removeAccent){
                        ellos_form_temp += removeAccent[ellos_form[i]]; 
                    } else {
                        ellos_form_temp += ellos_form[i]
                    }
                }
            }
            ellos_form = ellos_form_temp;
        }
        return ellos_form.substring(0, ellos_form.length - 3) + BC_ENDS["subjunctive"][tenseStr][subject]
    }

}


function imperativeConjugator(verb, tenseStr, subject) {
    if (tenseStr == "affirmative") {
        if(subject == 0) return "-";
        if(subject == 1){
            return indicativeConjugator(verb, "present", 2);
        }
        if( (subject == 2) || (subject == 3) || (subject == 5) ){
            return subjunctiveConjugator(verb, "present", subject);
        }
        if(subject == 4){
            return verb.substr(0, verb.length-1) + "d";
        }
    }
    if (tenseStr == "negative") {
        if(subject == 0) return "-";
        if(subject == 1){
            return "no " + subjunctiveConjugator(verb, "present", 2) + "s";
        }
        if( (subject == 2) || (subject == 5) || (subject == 3) ){ 
            return "no " + subjunctiveConjugator(verb, "present", subject);
        }
        if(subject == 4){
            return "no " + subjunctiveConjugator(verb, "present", subject);
        }
    }
}

const conjugateBlind = (() => {
    const indicativeTenses = [
        "present",
        "preterite",
        "imperfect",
        "conditional",
        "future"
    ]
    const subjunctiveTenses = [
        "present",
        "imperfect",
        "imperfect 2",
        "future"
    ]
    const imperativeTenses = [
        "affirmative",
        "negative"
    ]
    return function(inf, conjKey) {
        if (conjKey == "6") return presentParticipleConjugator(inf)
        if (conjKey == "7") return pastParticipleConjugator(inf)
        if (conjKey[0] == "0") {
            const tense = indicativeTenses[parseInt(conjKey[1])]
            const personI = parseInt(conjKey[2])
            return indicativeConjugator(inf, tense, personI)
        }
        if (conjKey[0] == "1") {
            const tense = subjunctiveTenses[parseInt(conjKey[1])]
            const personI = parseInt(conjKey[2])
            return subjunctiveConjugator(inf, tense, personI)
        }
        if (conjKey[0] == "2") {
            const tense = imperativeTenses[parseInt(conjKey[1])]
            const personI = parseInt(conjKey[2])
            return imperativeConjugator(inf, tense, personI)
        }

    }
})();
