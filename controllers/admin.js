const config = require('../config');
const bcrypt = require('bcryptjs');
const User = require('../models/user')

exports.addAdmin = (req,res,next) => {
    

    let password = 'Admin@123'

    User
        .findOne({email: 'admin123@gmail.com'})
        .then((user) => {

            if (user) {
                return res.status(401).json({'error': 'Admin already exists'})
            }

            bcrypt
            .hash(password, 12)
            .then( async (hashedPassword) => {
                let user;
                    user = await new User({
                        'firstName': 'Admin', 
                        'lastName': 'G', 
                        'email': 'admin123@gmail.com', 
                        'password':hashedPassword,  
                        'phone': '1234567890', 
                        'address': '-', 
                        'type': 'Admin', 
                        'activated': true,
                        'role': 'ADMIN'})
    
                
                return user.save();
            })
            .then((user) => {
                return res.status(200).json({'msg': 'Admin Registered', status: true})
            })
            .catch(err => {
                return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'Internal Server Error', status: false})
            })
        })
        .catch((err) => {

        })
    
}


exports.loginAdmin = (req,res,next) => {
    const {email , password} = req.body;

    User
        .findOne({email: email})
        .then((user) => {
            if (!user) {
                return res.status(401).json({"error": "NOT_EXISTS", "msg": "Admin Not Exits", status: false})
            }


            bcrypt
                .compare(password, user.password)
                .then((doMatch) => {

                    if(!doMatch) {
                        return res.status(401).json({"error": "INVALID_PASSWORD", "msg": "Password not Mached", status: false})
                    }

                    req.session.isLoggedIn = true;
                    req.session.user = user;

                    return req.session.save(err => {
                        console.log(err);
                        return res.status(201).json({'msg': 'User Logged in', status: true})
                    });
                })
                .catch(err => {
                    return res.status(401).json({"error": "INTERNAL_SERVER", "msg": "Error in decrypt user Password", status: false})
                })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in Login User!', status: false});
        })

}