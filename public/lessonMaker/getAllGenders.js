

function getAllGenders(lesson) {
    for (const word in lesson.defInfo) {
        if (!(word in A.genderInfo)) continue
        lesson.genders[word] = A.genderInfo[word]
    }
}
