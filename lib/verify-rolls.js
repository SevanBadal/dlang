
exports.vDice = (dice) => {
    const isD = /[dD]/;
    if(dice.split(isD).length !== 2) return false;

    return isD.test(dice.charAt(0)) && Number.isInteger(parseInt(dice.split(isD)[1]));
}

exports.vMod = (mod) => {
    if(mod === undefined) {
        return true;
    } else {
        return Number.isInteger(mod);
    }
}