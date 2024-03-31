import os
import json

def makeAssets(info):
    inlineJSONS = {
        "es_to_en_wiki.json": "wiki",
        "myShortDefs.json": "myShortDefs",
        "myLongDefs.json": "myLongDefs",
        "dict.json": "manuelDict",
        "master5.json": "master5Dict",
        "type_frequency_info.json": "freqInfo",
        "my_type_frequency_info.json": "myFreqInfo",
        "common_participle_defs.json": "commonParticiplesArr",

    }
    commStr = "const assets = {}\n"
    assetsLoc = os.getcwd() + "/public/assets/"
    for folder in os.listdir(assetsLoc):
        if folder[0] == ".":
            continue
        for file in os.listdir(assetsLoc + folder):
            if file[0] == ".":
                continue
            with open(assetsLoc + folder + "/" + file, "r", encoding="utf8") as f:
                if file in inlineJSONS:
                    fReadpt = f.read()
                    x = json.loads(fReadpt)
                    y = json.dumps(x)
                    commStr += f"A.{inlineJSONS[file]} = " + y + "\n\n"
                    continue
                s = f.read()
                if len(file) > 5 and file[-5:] == ".json":
                    s = json.dumps(json.loads(s))
                commStr += "assets['" + folder + "/" + file + "'] = `" + s + "`\n\n"
    return commStr
                

def xfer(info):

    
    srcFolder = info["loc"]
    jsOrder = []
    with open(os.getcwd() + "/public/main.html", "r", encoding="utf8") as f:
        mainHtml = f.read().split("\n")
        while "\r" in mainHtml:
            loc = mainHtml.index("\r")
            mainHtml = mainHtml[:loc] + mainHtml[loc+1:]
            
        for line in mainHtml:
            if "<script " not in line:
                continue
            else:
                startI = line.index("src=") + 5
                endI = line.index(".js") + 3
                jsOrder.append(line[startI:endI])

    fullStr = "" 
    for js in jsOrder:
        if js == "comm.js":
            fullStr += makeAssets(info) + "\n\n"
            continue
        with open(os.getcwd() + "/public/" + js, "r", encoding="utf8") as f:
            fullStr += f.read() + "\n\n"

    with open(os.getcwd() + "/app/lm_main.js", "w", encoding="utf8") as f:
        f.write(fullStr)

lessonMakerInfo = {
    "loc": os.getcwd() + "/app/",
    "prefix": "lm_",
}
xfer(lessonMakerInfo)
