import os

with open(os.getcwd() + "/public/assets/txt/verb_conjs.txt", "r", encoding="utf8") as f:
    lines = f.read().split("\n")
for line in lines:
    if "," not in line:
        continue
    sides = line.split(",")
    sides2 = []
    for side in sides:
        ss = side.split(" ")
        for s in ss:
            sides2.append(s)
    #print(sides2)
    anyTheSame = False
    for i in range(len(sides2)-1):
        for j in range(i+1, len(sides2)):
            if sides2[i] == sides2[j]:
                anyTheSame = True
                break
    if anyTheSame:
        print(line)