const mongoose = require('mongoose');
const router = express.Router();
const  { PRODUCT,ADMIN,USER}   = require('../dbmod/db.js')
router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    // function callback(admin) {
    //   if (admin) {
    //     res.status(403).json({ message: 'Admin already exists' });
    //   } else {
    //     const obj = { username: username, password: password };
    //     const newAdmin = new ADMIN(obj);
    //     newAdmin.save();

    //     const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    //     res.json({ message: 'Admin created successfully', token });
    //   }
  
    // }
    Admin.findOne({ username }).then(admin =>{
if (admin){
    res.status(403).json({message: 'admin exists kidly try another username '})
}
else {
    const obj = {username,password};
    const newadmin = new ADMIN(obj);
    newadmin.save();
    const token = jwt.sign({ username, role: 'admin'},SECRET,{expiresIn : '1h'})
    res.json({
        message : 'admin created '
        ,token 
    })
}
   


});
  



});
  
  router.post('/login', async (req, res) => {
    const { username, password } = req.headers;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });