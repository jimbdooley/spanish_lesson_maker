

function getAllGenders(lesson) {
    for (const word in lesson.defInfo) {
        if (!(word in A.genderInfo)) continue
        if (A.genderInfo[word] == "") continue
        lesson.genders[word] = {
            q: A.genderInfo[word],
            g: lesson.defInfo[word].g
        }
    }
}
