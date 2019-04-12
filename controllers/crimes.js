var Crime = require('../models/crime');

module.exports = {
    index,
    // show
};

async function index(req, res) {
    const crimes = await Crime.find({}, function(err, crimes){
        res.json(crimes);
    })
}

// async function show(req, res) {
//     try {
//         const perp = await Crime.findById(req.params.id)
//         console.log("this is the criminal", perp)
//         res.json({perp})
//     } catch {
//         res.status(400).json(err);
//     }
// }