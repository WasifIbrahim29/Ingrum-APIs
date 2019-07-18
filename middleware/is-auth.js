var User=require('../models/user');
var jwt=require('jsonwebtoken');
module.exports = (req, res, next) => {

    console.log('I am here');

    const bearerHeader= req.headers['authorization'];
    if(typeof bearerHeader!== 'undefined'){
        const bearer=bearerHeader.split(" ");
        const bearerToken=bearer[1];
        console.log(bearerToken);
        jwt.verify(bearerToken,'secret1',(err,authData)=>{
            if(err){
                console.log(err);
                res.send('<html><h1>Forbidden</h1></html>')
                // res.json({
                //     message: "<h1>You're not authorized to access this</h1>"
                // })
            }else{
                next();
            }
        })
    }else{
        res.send('<html><h1>Forbidden</h1></html>')
        // res.json({
        //     message: "You're not authorized to access this"
        // })
    }
}