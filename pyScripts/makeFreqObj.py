import json

def makeFreqObj():
    with open("pyScripts/frequency.csv", "r", encoding="utf8") as f:
        rows = f.read().splitlines()
    obj = {}
    for i in range(1, len(rows)):
        csvRowArr = rows[i].split(",")
        if len(csvRowArr) != 5: continue
        statArr = csvRowArr[4].split("|")
        for el in statArr:
            elArr = el.split(":")
            if len(elArr) != 2: continue
            if elArr[1] in obj:
                obj[elArr[1]] = min(obj[elArr[1]], elArr[0])
            else:
                obj[elArr[1]] = elArr[0]
    
    with open("public/assets/txt/freqObj.json", "w", encoding="utf8") as f:
        f.write(json.dumps(obj, indent=4))

makeFreqObj()