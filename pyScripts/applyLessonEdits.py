import os
import json

allDefsToDelete = [
    ["Casilda (pt. 1).json", "toledo"],
]

def applyLessonEdits():
    for defsToDelete in allDefsToDelete:
        with open(os.getcwd() + "/editedLessons/" + defsToDelete[0]) as json_file:
            obj = json.load(json_file)
        for i in range(1, len(defsToDelete)):
            obj["defInfo"].pop(defsToDelete[i])

        with open(os.getcwd() + "/editedLessons/" + defsToDelete[0], "w") as json_file:
            json.dump(obj, json_file, indent=1)

applyLessonEdits()