const User = require('../models/user');
const Crime = require('../models/crime');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  createCrimeList,
  show,
  deletePerp,
  addFavorite
};

async function deletePerp(req, res){
  try{
   const user = await User.findById(req.body.user, (err,user) => {
     if (err) throw new Error(err);
     let perp = user.crimes.indexOf(req.body.perp);
     while(user.crimes.indexOf(req.body.perp) != -1) { // if found
        user.crimes.splice(perp,1);
      }
      user.save();
   });
  res.json(user);
  }catch (err){
    res.status(400).json(err);
  }
}

async function show(req, res){
  try{
    const user = await User.findById(req.params.id).populate('crimes').populate('favPerp')
    res.json(user)
  }catch (err) {
    res.status(400).json(err);
  }
}

async function createCrimeList(req, res){
  try {
    const randomPerp_id = req.body.randomPerp.randomPerp._id
    const likedPerp = await Crime.findById(randomPerp_id)
    const user = await User.findById(req.params.id)
    user.crimes.push(likedPerp)
    user.save()
    res.json({crimes: user.crimes})
  } catch (err){
    res.status(400).json(err);
  }
  
}

async function addFavorite(req,res){
  try {
    const favPerp_id = req.body.favPerp;
    const favPerp = await Crime.findById(favPerp_id)
    const user = await User.findOneAndUpdate(req.params.id, {favPerp: favPerp}).populate('favPerp')
    user.save()
    res.json({favPerp: user.favPerp})
  } catch (err){
    res.status(400).json(err);
  }
  
}

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}


function createJWT(user) {
  return jwt.sign(
    {user},
    SECRET,
    {expiresIn: '24h'}
  );
}