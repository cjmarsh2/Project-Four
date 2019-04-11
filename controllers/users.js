const User = require('../models/user');
const Crime = require('../models/crime');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  createCrimeList,
  show
};

async function show(req, res){
  try{
    const user = await User.findById(req.params.id).populate('crimes')
    console.log("this is the pop:", user)
    res.json({user})
  }catch {
    res.status(400).json(err);
  }
}

async function createCrimeList(req, res){
  try {
    const randomPerp_id = req.body.randomPerp.randomPerp._id
    console.log(randomPerp_id)
    const likedPerp = await Crime.findById(randomPerp_id)
    const user = await User.findById(req.params.id)
    console.log(likedPerp)
    user.crimes.push(likedPerp)
    user.save()
    res.json({crimes: user.crimes})
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