var Crime = require('../models/crime');

module.exports = {
    getKillers
};

async function getKillers(req, res) {
    const crimes = await Crime.find({}, function(err, crimes){
        res.json(crimes);
    })
}