
exports.rollStack = [];

exports.rollDice = (d) => {
    return Math.floor(Math.random() * parseInt(d.split(/[dD]/)[1])) + 1  ;
}
