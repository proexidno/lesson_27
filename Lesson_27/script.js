function startF(C, E) {
    $("#player #cname").text(C.cname);
    $("#player .avatar img").attr("src", C.avatar)
    $("#enemy #cname").text(E.cname);
    $("#enemy .avatar img").attr("src", E.avatar)
}
function update(C, E) {
    $("#player #hp .line").css("width", `${C.hp/C.maxhp*100}%`)
    $("#player #mp .line").css("width", `${C.mp/C.maxmp*100}%`)
}
function damage(dmg) {
    enemy.hp -= dmg
}
function attack(C, attackType) {
    if (C.skills[attackType].cD == 0){
        switch (C.skills[attackType].type) {
            case "magical":
                if (C.skills[attackType].needMp < C.mp) {
                    damage(Math.floor(C.mexp / 7) * 5)
                    C.sexp++
                    C.mp
                }
                break
            case "physical":
                damage(Math.floor(C.mexp / 10) * 2 + 1)
                break
            case "hybrid":
                damage(Math.max(Math.floor(C.sexp / 7) * 4, Math.floor(C.mexp / 10) * 2) * 3)
                break
    
        }
    }
}

let char = {maxhp: 20, hp: 20, maxmp: 7, mp: 7, cname: "ALO", mexp: 0, sexp: 0, skills: {punch: {type: "physical", maxcD: 10, cD: 0}, fireball: {type: "magical", needMp: 1, maxcD: 20, cD: 0}, FirePunch: {type: "hybrid", needMp: 2, maxcD: 50, cD: 0}}, avatar: "/images/MaskGroup.png"}
let enemy = {maxhp: 10, hp: 10, dmg: 1, cD: 10,  cname: "ALO2", avatar: "/images/char_0003_30a012239ad1f22b2aa29e84901d29e5.png"}

startF(char, enemy)
update(char, enemy)

for (skill in char.skills) {
    console.log(skill);
    $("#player .skills").append($("<button>").text( skill ).attr("id", skill).click( function () { attack( char, $(this).attr("id") ) }))
}

let gameUpdateTimer = setInterval( function () {
    char.hp += 0.2
    char.mp += 0.05
    for (skill in char.skills) {
        if (skill.cD > 0) {
            skill.cD -= 1
        }
    }
}, 100)