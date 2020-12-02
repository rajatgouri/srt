const User = require('../models/user');
const Fleet = require('../models/fleet');
const Alert = require('../models/alert');
const Subscribe = require('../models/subscribe');
const config = require('../config');
const Stats = require('../models/stats')
const Card = require('../models/cards');

const bcrypt = require('bcryptjs');
const stripe = require('stripe')(config.stripeKey);
const jwt = require('jsonwebtoken');
const aws = require('./awsController');

const { validationResult } = require('express-validator/check');


function updateStep(id, step) {
    return new Promise(async (resolve, reject) => {
        resolve(await User.findByIdAndUpdate(id, {'step': step}))
    })
}


exports.verifyAccount = async (req,res,next) => {

    let id = req.query.id;

    jwt.verify(id, config.jwt.email.secretKey, (err, data) => {
        if(err) {
            console.log(err)
            return res.redirect('/bad-request')
        }
        let userData = data.data;

        User
            .findOne({email: userData})
            .then((user) => {
                if(user) {
                    user.activated = true;
                    user
                        .save()
                        .then(() => {
                            return res.redirect('/login');
                        })
                        .catch(err => {
                            return res.redirect('/bad-request');

                        })

                } else {
                    return res.redirect('/bad-request');
                }
            })
            .catch(err => {
                console.log(err)
                return res.redirect('/bad-request');
            })
    })
    
}

exports.registerCard = async (req,res,next) => {

    const {card,  month, year,cvc, user} = req.body;

    cardExists = await Card.findOne({user: user})

    if (cardExists) {
        return res.status(500).json({'error': 'CARD_EXISTS', 'msg' :'Card Already Exists' })
    }

    let registerCard = new Card({
        cardNumber: card,
        month: month,
        year: year,
        cvc: cvc,
        user: user
    })


    registerCard
        .save()
        .then(() => {
            return res.status(200).json({'msg': 'card registered successfully!', redirect: '/login'})
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'Internal server error in registering card'})
        })


}

exports.resendAccountActivationLink = async (req,res,next) => {
    const {email} = req.body;
    const token = jwt.sign({
        data: req.body.email
    }, config.jwt.email.secretKey, { expiresIn: config.jwt.email.expiresIn });
      
    let host=req.get('host');
    await aws.sendConfirmationMail(token, host, email);

    return res.status(200).json({'msg': 'Link Send successfully!',status: true})

}

exports.shipperSignup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({'error': 'IS_EMPTY', 'msg': 'All Fields are mandatory!', status: false})
    }

    const {username, firstName, lastName, email, password, phone, address,type,  role} = req.body;

    User
        .findOne({email: email})
        .then( async (user) => {
            if (user) {
                return res.status(401).json({'error': 'USER_EXISTS', 'msg': 'User Already Exists!', status: false})
            }

            const token = jwt.sign({
                data: req.body.email
            }, config.jwt.email.secretKey, { expiresIn: config.jwt.email.expiresIn });
              
            let host=req.get('host');


            bcrypt
                .hash(password, 12)
                .then((hashedPassword) => {
                    let user = new User({
                        'username': username,
                        'firstName': firstName, 
                        'lastName': lastName, 
                        'email': email, 
                        'password':hashedPassword,  
                        'phone': phone, 
                        'address': address, 
                        'type': type, 
                        'activated': false,
                        'role': role
                    })

                    user
                        .save()
                        .then(async (user) => {
                            await aws.sendConfirmationMail(token, host, email);
                            let stats = new Stats({
                                JobsPost : 0,
                                jobsDone: 0,
                                jobsInProgress: 0,
                                user: user._id
                            })

                            await stats.save()
                            return res.status(200).json({'msg': 'User Registered successfully!', user: user._id,  status: true})
                        })
                })
                .catch(err => {
                    return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'Error in Hasing Password'})
                })

        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in Registering shipper!', status: false});
        })

}


exports.carrierProfile = async(req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({'error': 'IS_EMPTY', 'msg': 'All Fields are mandatory!', status: false})
    }

    const {username, firstName, lastName, email, password, phone, address,type, driverLicense, role} = req.body;

    console.log(req.body)
    User
        .findOne({
            email: email
        })
        .then(async (user) => {
            if (user) {
                return res.status(401).json({'error': 'USER_EXISTS', 'msg': 'User Already Exists!', status: false})
            }

            const token = jwt.sign({
                data: req.body.email
            }, config.jwt.email.secretKey, { expiresIn: config.jwt.email.expiresIn });
              
            let host=req.get('host');

            bcrypt
                .hash(password, 12)
                .then((hashedPassword) => {
                    let user = new User({
                        'username': username,
                        'firstName': firstName, 
                        'lastName': lastName, 
                        'email': email, 
                        'password':hashedPassword,  
                        'phone': phone, 
                        'address': address, 
                        'driverLicense': driverLicense,                        
                        'type': type, 
                        'step': 1,
                        'activated': false,
                        'role': role
                    })

                    user
                        .save()
                        .then(async (user) => {
                            await aws.sendConfirmationMail(token, host, email);
                            let stats = new Stats({
                                JobsPost : 0,
                                jobsDone: 0,
                                jobsInProgress: 0,
                                user: user._id
                            })

                            await stats.save()
                            return res.status(200).json({'msg': 'User Registered successfully!', user: user._id,  status: true})
                        })
                })
                .catch(err => {
                    return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'Error in Hasing Password'})
                })
            

        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in Registering User!', status: false});
        })

}


exports.carrierFleet = async (req,res,next) => {


    const body = (JSON.parse(req.body.data));

    const {userId } = body;

    console.log(body)
    const fleetData = {
        truck: {
            primeMover: body.primeMover,
            craneTruck: body.craneTruck, 
            tiltTray: body.tiltTray, 
            regidBeavertail: body.regidBeavertail,  
            regidFlattop: body.regidFlattop, 
            regidPantech: body.regidPantech, 
            regidWithTailgator: body.regidWithTailgator, 
            retriverTowTruck: body.retriverTowTruck,
        },
        trailer: {
            dropDeck: body.dropDeck,
            flatTop: body.flatTop,
            curtainSlider: body.curtainSlider,
            deckWinder: body.deckWinder,
            lowLoader: body.lowLoader,
            carCarrier: body.carCarrier,
            dolly: body.dolly,
            refrigrated: body.refrigrated,
            sideLoader: body.sideLoader,
            skel: body.skel,
            megaTilt: body.megaTilt,
            platform: body.platform,
            wakingFloor: body.wakingFloor,
            liveStock: body.liveStock,
            grainTrailer: body.grainTrailer,
            tipper: body.tipper,
            extendable: body.extendable,
            sideTipper: body.sideTipper,
            tanker: body.tanker,
            dogTrailer: body.dogTrailer,
            horseFloat: body.horseFloat,
            logging: body.logging,
            poleJinker: body.poleJinker,
            pigTrailer: body.pigTrailer
        },
        configrations: {
            bDouble: body.bDouble ,
            roadTrain: body.roadTrain
        },
        other: {
            pilot: body.pilot,
            hotshot: body.hotshot,
            ute :body.ute,
            depotFacilities: body.depotFacilities,
            bobtailOperator :body.bobtailOperator,
            driveHire: body.driveHire,
            tradePlates: body.tradePlates
        }
    }
   
    const fleetExists = await Fleet.findOne({userId: userId})
    

    if (!fleetExists) {

        const fleet = new Fleet({
            truck: fleetData.truck,
            trailer: fleetData.trailer,
            configrations: fleetData.configrations,
            other: fleetData.other,
            userId: userId
        })
    
        fleet
            .save()
            .then((fleet) => {
                let updatedSteps = updateStep(userId, 2);

                return  res.status(201).json({'msg': 'fleet registered successfully!', userId: userId ,status: true})
            })
            .catch((err => {
                console.log(err)
                return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in Registering Fleet!', status: false});
    
            }))
    } else {
        let updatedFleet = await Fleet.findOneAndUpdate({userId: userId}, fleetData)
        return  res.status(201).json({'msg': 'fleet registered successfully!', userId: userId ,status: true})
        
    }

}


exports.carrierAlert = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({'error': 'IS_EMPTY', 'msg': 'All Fields are mandatory!', status: false})
    }

    var {userId ,mobile, email} = req.body, alert;

    
    const alertsExists = await Alert.findOne({userId: userId})

    if (!alertsExists) {
        const alert = new Alert({
            mobile: mobile,
            email: email,
            userId: userId
        })

        alert
            .save()
            .then((alert) => {
                let updatedSteps = updateStep(userId, 3);
                return  res.status(201).json({'msg': 'Alerts registered successfully!', userId: userId ,status: true})

            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in Registering Alerts!', status: false});
      
            })
    } else {
        let updatedAlert = await Alert.findOneAndUpdate({userId: userId}, alert)
        return  res.status(201).json({'msg': 'alert registered successfully!', userId: userId ,status: true})
    }
}


exports.carrierSubscription = async (req,res,next) => {

    // const {token, plan,userId, expiration  } = req.body;

    // let isSubscribed = await Subscribe.findOne({userId: userId})
    
    // if(isSubscribed) {
    //     return  res.status(201).json({'msg': 'Already Subscribed!', userId: userId ,status: true})
    // }

    // if (plan !== 'FREE') {
    //     charge = await stripe.charges.create({
    //         amount: +plan *100,
    //         currency: 'usd',
    //         description: 'Carrier Subscription Charge',
    //         source: token,
    //     });
   
    // } else {
    //     charge = {
    //         status: 'succeeded'
    //     }
    // }
    
    // const subscribe = new Subscribe({
    //     plan: plan,
    //     expiration: expiration
    // })


    // if (charge.status === 'succeeded') {

    //     const subscribe = new Subscribe({
    //         plan: plan,
    //         expiration: expiration,
    //         userId: userId
    //     })

    //     subscribe
    //         .save()
    //         .then(()=> {
    //             let updatedSteps = updateStep(userId, 4);
    //             return  res.status(201).json({'msg': 'Subscribe  successfully!', userId: userId ,status: true})

    //         })
    //         .catch((err) => {  
    //             console.log(err)
    //             return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in saving Subscription!', status: false});

    //         })
    // } else {
    //     console.log(err)
    //     return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in Subscription!', status: false});

    // }
}

exports.login = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(401).json({'error': 'IS_EMPTY', 'msg': 'All Fields are mandatory!', status: false})
    }

    const { email, password, role, remember} = req.body;

    User
        .findOne({email: email , role: role})
        .then((user) => {
            if (!user) {
                return res.status(401).json({"error": "NOT_EXISTS", "msg": "User Not Found", status: false})
            }

            if (!user.activated) {
                return res.status(401).json({"error": "NOT_ACTIVATED", "msg": "Account not activated", user: user.email, status: false})
            }

            bcrypt
                .compare(password, user.password)
                .then((doMatch) => {
                    if(!doMatch) {
                        return res.status(401).json({"error": "INVALID_PASSWORD", "msg": "Password not Mached", status: false})
                    }

                    if (role === 'Carrier' && user.step < 2) {
                        return res.status(201).json({'msg': 'User Logged in', step: user.step, user: user._id, status: true})
                    }
                
                    req.session.isLoggedIn = true;
                    req.session.user = user;

                    if (remember === 'false') {
                        req.session.cookie.maxAge =  8.64e+7;
                    } else {
                        req.session.cookie.maxAge =  8.64e+7 * 15
                    }


                    return req.session.save(err => {
                        console.log(err);
                        console.log(req.session)
                        return res.status(201).json({'msg': 'User Logged in', status: true})
                    });
                })
                .catch(err => {
                    return res.status(401).json({"error": "INTERNAL_SERVER", "msg": "Error in decrypt user Password", status: false})
                })
        })
        .catch(err => {
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in Login User!', status: false});
        })
}

exports.forgetPassword = (req,res,next) => {
    const {email} = req.body;

    User
        .findOne({email: email})
        .then(async (user) => {
            if (!user) {
                return res.status(401).json({"error": "NOT_EXISTS", "msg": "User Not Exists", status: false})
            }

            let host=req.get('host');
            
            const token = jwt.sign({
                data: {'email': user.email}
            }, config.jwt.password.secretKey, { expiresIn: config.jwt.password.expiresIn });

            let emailSend = await aws.forgetPasswordMail(token, host, email);

            if (emailSend) {
                return res.status(200).json({'msg': 'Email send Successfully!','email': email, status: true})
            } else {
                return res.status(500).json({'error': 'INVALID_EMAIL', 'msg': 'error in Sending Email!', status: false});
            }

        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in Login User!', status: false});
        })
}

exports.getChangePassword = (req,res,next) => {
    const id = req.query.id;

    
    jwt.verify(id, config.jwt.password.secretKey, (err, data) => {
        if (err) {
            return res.redirect('/bad-request');
        }

        const userData =  data.data

        return res.render('Pages/change-password', {
            title: 'Change Password',
            user: req.session.user,
            email: userData.email
      });
    })
}

exports.changePassword = (req,res,next) => {
    const {email, password} = req.body;

    User
        .findOne({email: email})
        .then((user) => {
            if (!user) {
                return res.status(401).json({"error": "NOT_EXISTS", "msg": "User Not Exists", status: false})
            }

            bcrypt
                .hash(password, 12)
                .then( async (hashedPassword) => {
                    user.password = hashedPassword
                    return user.save()
                })
                .then((user) => {
                    return res.status(200).json({'msg': 'Password Change Successfully!','email': email, status: true})
                })
                .catch(err => {
                    return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in Bcrypt Password!', status: false});

                })

        })
        .catch(err => {
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in Finding User on Change Password!', status: false});

        })
}



exports.logout = (req,res,next) => {
    req.session.destroy(err => {
        console.log(err);
        res.status(201).json({'msg': 'User Logged Out', status: true});
      });
}