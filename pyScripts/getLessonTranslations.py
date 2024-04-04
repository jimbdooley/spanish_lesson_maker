import os
import json

def getToXlate():
    rtn = []
    for fileName in os.listdir(os.getcwd() + "/editedLessons/"):
        if len(fileName) == 0 or fileName[0] == '.':
            continue
        if len(fileName) <= 5 or ".json" not in fileName:
            continue
        with open(os.getcwd() + "/editedLessons/" + fileName, 
                  'r', encoding="utf8") as file:
            obj = json.loads(file.read())["sentenceInfoList"]
        for sentence in obj:
            rtn.append(sentence["sentence"].strip())

    return list(set(rtn))

def buildKnownXlates(toXlate):
    with open(os.getcwd() + "/pyScripts/savedTranslations.json", "r", encoding="utf8") as file:
        knownXlates = json.loads(file.read())

    forGoogle = []
    for xlate in toXlate:
        alreadyKnown = False
        for pair in knownXlates:
            if xlate == pair[0]:
                alreadyKnown = True
                break
        if not alreadyKnown:
            forGoogle.append(xlate)

    
forGoogleTest = [
    "Hola mundo",
    "Me gusta comer papas fritas",
    "Cuando es tu cumpleaños",
]

toXlate = getToXlate()
buildKnownXlates(toXlate)
