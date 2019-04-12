var Crime = require('../models/crime');

module.exports = {
    index,
    // show
};

async function index(req, res) {
    try {
        const crimes = await Crime.find({}, function(err, crimes){
            res.json(crimes);
        })
    } catch (err) {
        return res.status(401).json(err);
    }
    
}

