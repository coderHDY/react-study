var oneEditAway = function (first, second) {
    if (first === second) return true;
    if (Math.abs(first.length - second.length) > 1) return false;
    const len = Math.max(first.length, second.length);
    let chance = true;
    for (let i = 0; i < len; i++) {
        if (first[i] !== second[i]) {
            if (chance) {
                chance = false;
            } else {
                return false;
            }
        }
    }
    return true;
};


console.log(oneEditAway('ab', 'bc'));
