
import os
import json

def getToXlate():
    with open(os.getcwd() + "/pyScripts/savedTranslations.json", "r", encoding="utf8") as file:
        knownXlates = json.loads(file.read())
    rtn = []
    for fileName in os.listdir(os.getcwd() + "/editedLessons/"):
        if len(fileName) == 0 or fileName[0] == '.':
            continue
        if len(fileName) <= 5 or ".json" not in fileName:
            continue
        with open(os.getcwd() + "/editedLessons/" + fileName, 
                  'r', encoding="utf8") as file:
            obj = json.loads(file.read())["sentenceInfoList"]
        for i in range(len(obj)):
            lessonSentence = obj[i]["sentence"].strip()
            for pair in knownXlates:
                if lessonSentence == pair[0] and pair[1] != "":
                    newSentence = {}
                    newSentence["sentence"] = lessonSentence
                    newSentence["translation"] = pair[1]
                    newSentence["pGroup"] = obj[i]["pGroup"]
                    for key in obj[i]:
                        if key != "sentence" and key != "translation" and key != "pGroup":
                            newSentence[key] = obj[i][key]
                    obj[i] = newSentence
            rtn.append(lessonSentence)
        with open(os.getcwd() + "/editedLessons/" + fileName, 
                    'w', encoding="utf8") as file:
            # save with indent of 1
            file.write(json.dumps({"sentenceInfoList": obj}, indent=1))

    return list(set(rtn))

def buildKnownXlates(toXlate):
    with open(os.getcwd() + "/pyScripts/savedTranslations.json", "r", encoding="utf8") as file:
        knownXlates = json.loads(file.read())

    forGoogle = []
    for xlate in toXlate:
        alreadyInserted = False
        for pair in knownXlates:
            if xlate == pair[0]:
                alreadyInserted = True
                break
        if not alreadyInserted:
            knownXlates.append([xlate, ""])
    
    with open(os.getcwd() + "/pyScripts/savedTranslations.json", "w", encoding="utf8") as file:
        file.write(json.dumps(knownXlates))




    

toXlate = getToXlate()
buildKnownXlates(toXlate)
