import os
import json

allDefsToDelete = [
    ["Casilda (pt 1).json", "toledo", "mar\u00eda", "castillo"],
]

def applyLessonEdits():
    for defsToDelete in allDefsToDelete:
        with open(os.getcwd() + "/editedLessons/" + defsToDelete[0], "r", encoding="utf8") as json_file:
            obj = json.load(json_file)
        for i in range(1, len(defsToDelete)):
            if defsToDelete[i] in obj["defInfo"]:
                obj["defInfo"].pop(defsToDelete[i])
            if defsToDelete[i] in obj["genders"]:
                obj["genders"].pop(defsToDelete[i])

        with open(os.getcwd() + "/editedLessons/" + defsToDelete[0], "w", encoding="utf8") as json_file:
            json.dump(obj, json_file, indent=1)

applyLessonEdits()