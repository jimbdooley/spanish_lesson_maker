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
            with open(assetsLoc + folder + "/" + file, "r") as f:
                if file in inlineJSONS:
                    print(file)
                    print(inlineJSONS[file])
                    commStr += f"A.{inlineJSONS[file]} = " + json.dumps(json.loads(f.read())) + "\n\n"
                    continue
                s = f.read()
                if len(file) > 5 and file[-5:] == ".json":
                    s = json.dumps(json.loads(s))
                commStr += "assets['" + folder + "/" + file + "'] = `" + s + "`\n\n"
    with open(info["loc"] + info["prefix"] + "comm.js", "w") as f:
        f.write(commStr)
                

def xfer(info):

    makeAssets(info)
    srcFolder = info["loc"]
    with open(os.getcwd() + "/public/main.html", "r") as f:
        mainHtml = f.read().split("\n")
        while "\r" in mainHtml:
            loc = mainHtml.index("\r")
            mainHtml = mainHtml[:loc] + mainHtml[loc+1:]
        with open(srcFolder + info["prefix"] + "main.html", "w") as f:
            for line in mainHtml:
                if "<script " not in line and "<link rel=\"stylesheet\"" not in line:
                    f.write(line + "\n")
                    continue
                if "src=" in line:
                    start = line.index("src=") + 5
                    end = line.index(".js") + 3
                    scriptSrc = line[start:end].replace("/", "_")
                    f.write(line[:start] + info["prefix"] + scriptSrc + "\"></script>\n")
                if "<link rel=\"stylesheet\"" in line:
                    start = line.index("href=\"") + 6
                    end = line.index(".css") + 4
                    cssSrc = line[start:end].replace("/", "_")
                    f.write(line[:start] + info["prefix"] + cssSrc + "\">\n")

    for file in os.listdir(os.getcwd() + "/public/"):
        rightEnding = file[-3:] == ".js" or file[-4:] == ".css"
        if not rightEnding or file == "local.js" or file == "comm.js":
            continue
        with open(os.getcwd() + "/public/" + file, "r") as f:
            js = f.read()
        with open(srcFolder + info["prefix"] + file, "w") as f:
            f.write(js)
    for folder in info["subFolders"]:
        for file in os.listdir(os.getcwd() + "/public/" + folder):
            with open(os.getcwd() + "/public/" + folder + "/" + file, "r") as f:
                js = f.read()
            with open(srcFolder + info["prefix"] + folder + "_" + file, "w") as f:
                f.write(js)

subFolders = [
    "lessonMaker",
]
lessonMakerInfo = {
    "loc": os.getcwd() + "/app/",
    "prefix": "lm_",
    "subFolders": subFolders
}
xfer(lessonMakerInfo)
