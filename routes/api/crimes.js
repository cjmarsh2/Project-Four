const express = require('express');
const router = express.Router();
const crimesCtrl = require('../../controllers/crimes');
const Crime = require('../../models/crime')


router.get('/', crimesCtrl.getKillers);
router.post('/create', (req, res)=>{
    let crime = new Crime(req.body)
    try {
        crime.save();
        res.json(crime);
    }catch (err){
        res.status(400).json(err);
    }
});




module.exports = router;