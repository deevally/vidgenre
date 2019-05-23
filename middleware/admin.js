

function admin(req , res, next){
if(!req.currentUser.isAdmin) return res.status(403).send('Access Denied!!!');

next();
}

module.exports = admin;