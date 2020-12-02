const express = require('express');
const routes = express.Router();

const isAuthenticated = require('../middleware/auth')
const isLoggedIn = require('../middleware/isLoggedIn');

const cities = require('../database/cities')
const quoteController = require('../controllers/get-a-quote')

const User = require('../models/user');
const Fleet = require('../models/fleet');
const Alert = require('../models/alert');
const Subscription = require('../models/subscribe');
const Stats = require('../models/stats');
const Quotes = require('../models/get-a-quote');
const Bids = require('../models/bid');
const Chat = require('../models/chat');
const Messsages = require('../models/messages');
const Jobs = require('../models/jobs');
const Card = require('../models/cards');

const authController = require('../controllers/auth');

const checkShipper = require('../middleware/shipper');
const checkAdmin = require('../middleware/admin');
const checkAdminLoggedIn = require('../middleware/isAdminLoggedIn')
const checkNotAdmin = require('../middleware/checkNotAdmin');

routes.get('/', function(req, res)
{     
      if(req.session.user) {
            if (req.session.user.role === 'ADMIN') {
                  return res.redirect('/admin/dashboard')
        
            }     
      }
      res.redirect('/home')
});

routes.get('/change-password', authController.getChangePassword)



routes.get('/home',checkNotAdmin, async function(req, res)
{

      let cardExists = false;
      if(req.session.user) {
            let cardExists =  await Card.findOne({user: req.session.user._id})

            if(!cardExists) {
                  cardExists = false;
            } else {
                  cardExists = true
            }

            res.render('Pages/home/home', {
                  title: 'home',
                  user: req.session.user,
                  cardExists: cardExists
            });
      } else {
            res.render('Pages/home/home', {
                  title: 'home',
                  user: req.session.user,
                  cardExists: cardExists
            });
      }

      
});

routes.get('/how-it-work/shippers',checkNotAdmin, function(req, res)
{
      res.render('Pages/how-it-work/shippers', {
            
            "title": "how-it-works"

      });
});

routes.get('/how-it-work/carriers', checkNotAdmin,function(req, res)
{
      res.render('Pages/how-it-work/carriers', {
            
            "title": "how-it-works"
      });
});

routes.get('/warehouse',checkNotAdmin, function(req, res)
{
      res.render('Pages/warehouse', {
            
            "title": "warehouse"
      });
});
routes.get('/about', checkNotAdmin,function(req, res)
{
      res.render('Pages/about', {
            
            "title": "how-it-works"
      });
});
routes.get('/login', isLoggedIn ,function(req, res)
{
      res.render('Pages/login', {
            "title": ""
      });
});



routes.get('/verify-account', authController.verifyAccount);



routes.get('/register', isLoggedIn,function(req, res)
{
      res.render('Pages/register/register', {
            
            "title": ""

      });
});
routes.get('/register-carrier', isLoggedIn,function(req, res)
{
      res.redirect('/register-carrier/profile');     
});

routes.get('/register-carrier/profile', function (req,res) {
      
      res.render('Pages/register/register-carrier', {
            
            "title": "",
            "page": 'Profile'
      });
})

routes.get('/register-carrier/fleet/:id',isLoggedIn, async function (req,res) {

      let {id} = req.params;
      User
            .findById(id)
            .then((user) => {
                  res.render('Pages/register/register-carrier', {
                        
                        "title": "",
                        "page": 'Fleet',
                        "userId": user._id,
                        "fleet" : ''
                  });
            })
            .catch(err => {
                  res.redirect('/login')
            })
})

routes.get('/register-carrier/alerts/:id',isLoggedIn, async function (req,res) {

      let {id} = req.params;
      User
            .findById(id)
            .then((user) => {
                  res.render('Pages/register/register-carrier', {
                        
                        "title": "",
                        "page": 'Alerts',
                        "userId": user._id
                  });
            })
            .catch(err => {
                  res.redirect('/login')
            })
      
})

routes.get('/register-carrier/card-details/:id',  function (req,res) {

      let {id} = req.params;
      
      User
            .findById(id)
            .then((user) => {
                  res.render('Pages/register/register-carrier', {
                        
                        "title": "",
                        "page": 'Card',
                        "userId": user._id
                  });
            })
            .catch(err => {
                  res.redirect('/login')
            })
})

routes.get('/register-carrier/subscribe/:id', isLoggedIn, function (req,res) {

      let {id} = req.params;
      
      User
            .findById(id)
            .then((user) => {
                  res.render('Pages/register/register-carrier', {
                        
                        "title": "",
                        "page": 'Subscribe',
                        "userId": user._id
                  });
            })
            .catch(err => {
                  res.redirect('/login')
            })
})


routes.get('/register-shipper', isLoggedIn,function(req, res)
{
      res.redirect('/register-shipper/profile');     
      
      
});


routes.get('/register-shipper/profile', function (req,res) {

      res.render('Pages/register/register-shipper', {
            
            "title": "",
            "page": 'Profile'
      });
})

routes.get('/register-shipper/card-details/:id', function (req,res) {

      let {id} = req.params;
      
      User
            .findById(id)
            .then((user) => {
                  res.render('Pages/register/register-shipper', {
                        
                        "title": "",
                        "page": 'card',
                        "userId": user._id
                  });
            })
            .catch(err => {
                  res.redirect('/login')
            })
})

routes.get('/jobs', isAuthenticated, checkNotAdmin,function(req, res)
{
            res.render('Pages/jobs', {
                  
                  "title": "jobs"
            });
      
});


routes.get('/privacy-policy',checkNotAdmin, function(req, res)
{
      res.render('Pages/privacy', {
            
            "title": ""

      });
});

routes.get('/terms-condition',checkNotAdmin, function(req, res)
{
      res.render('Pages/terms', {
            
            "title": ""

      });
});

routes.get('/get-a-quote/cars',isAuthenticated , checkShipper,checkNotAdmin,function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'cars',
            "user": req.session.user,
            "title": "get-a-quote"

      });
});
routes.get('/get-a-quote/bike', isAuthenticated, checkShipper,checkNotAdmin,function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'bike',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/furniture',isAuthenticated,checkShipper, checkNotAdmin, function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'furniture',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/boat',isAuthenticated,checkShipper, checkNotAdmin,function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'boat',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/home',isAuthenticated,checkShipper,checkNotAdmin, function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'home',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/pallets', isAuthenticated, checkShipper,checkNotAdmin,function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'pallets',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/waste',isAuthenticated,checkShipper,checkNotAdmin, function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'waste',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/trucks',isAuthenticated, checkShipper,checkNotAdmin,function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'trucks',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/trucks',isAuthenticated,checkShipper,checkNotAdmin, function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'trucks',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/other-vehicle',isAuthenticated,checkShipper,checkNotAdmin, function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'other-vehicle',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/container',isAuthenticated,checkShipper,checkNotAdmin, function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'container',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/houlage',isAuthenticated,checkShipper, checkNotAdmin,function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'houlage',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/livestock',isAuthenticated,checkShipper, checkNotAdmin,function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'livestock',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/heavy',isAuthenticated,checkShipper,checkNotAdmin, function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'heavy',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/agriculture',isAuthenticated,checkShipper,checkNotAdmin, function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'agriculture',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/mining-machine',isAuthenticated,checkShipper,checkNotAdmin, function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'mining-machine',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/automotive',isAuthenticated, checkShipper,checkNotAdmin,function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'automotive',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/refrigrated',isAuthenticated,checkShipper,checkNotAdmin, function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'refrigrated',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});
routes.get('/get-a-quote/warehouse',isAuthenticated,checkShipper,checkNotAdmin, function(req, res)
{
      res.render('Pages/get-a-quote/get-a-quote', {
            "category": 'warehouse',
            "user": req.session.user,
            "title": "get-a-quote"
      });
});



routes.get('/shipment-detail/:id',isAuthenticated,checkNotAdmin, async function(req, res)
{

      const id = req.params.id;

      let quote = await Quotes.findById(id)
      
      if (!quote) {
            return res.redirect('/profile');
      }     

      let bids = await Bids.find({quote: id}).populate('user quote');
      Jobs
            .findOne({job: id})
            .populate({
                  path: 'carrierFeedback',
                  model: 'carrierFeedback',
                  populate: {
                        path: 'user',
                        model: 'User'
                  }
            })
            .populate({
                  path: 'shipperFeedback',
                  model: 'shipperFeedback',
                  populate: {
                        path: 'user',
                        model: 'User'
                  }
            })
            .populate('job')
            .then((jobs) => {
                  res.render('Pages/shipment-details-page', {
                        "page": "Shipment Details",
                        "user": req.session.user,
                        "bids": bids,
                        "jobs": jobs,
                        "quote": quote,
                        "title": ""
                  });
            })

      
      
});




routes.get('/profile',isAuthenticated,checkNotAdmin, async function(req, res)
{
     
      res.redirect('/user-profile');      
     
});


routes.get('/user-profile',isAuthenticated,checkNotAdmin, async function(req, res)
{
      let id = req.session.user._id;
      let user = await User.findById(id);
      
      let stats = await Stats.findOne({user: id})
      // if(req.session.user.role === 'Carrier') {
      //       fleet = await Fleet.findOne({userId: id});
      //       alerts = await Alert.findOne({userId: id});
      //       subscription = await Subscription.findOne({userId: id});
      // }

      
      res.render('Pages/profile', {
            "user": user,
            "title": "",
            "stats": stats,
            "page": "Profile"
      });
});

routes.get('/user-fleet',isAuthenticated,checkNotAdmin, async function(req, res)
{
      let id = req.session.user._id;
      let user = await User.findById(id);
      let fleet = '';
      
      if(req.session.user.role === 'Carrier') {
            fleet = await Fleet.findOne({userId: id});
      }

      res.render('Pages/profile', {
            "user": user,
            "fleet": fleet,
            "title": "",
            "page": "Fleet"
      });
});

routes.get('/user-payments',isAuthenticated,checkNotAdmin, async function(req, res)
{
      let id = req.session.user._id;
      let user = await User.findById(id);

      res.render('Pages/profile', {
            "user": user,
            "title": "",
            "page": "Payments"
      });
});



routes.get('/track-order',isAuthenticated, checkShipper,checkNotAdmin,function(req, res)
{
      res.render('Pages/track-order', {
            "user": req.session.user,
            "title": "jobs"

      });
});


routes.get('/chat',isAuthenticated,checkNotAdmin, function(req, res)
{

      let user = req.session.user._id;

      Chat
            .find({ $or: [{ carrier: user }, { shipper:  user}] }) 
            .populate('carrier shipper job')
            .sort([['createdAt', -1]])
            .then((chats) => {
                  res.render('Pages/chat', {
                        "user": req.session.user,
                        "title": "chat",
                        "chats": chats,
                        "messages": null,
                        "open": false,
                        "chat": '',
                        'job': ''
                  });
            })
            .catch(err => {
                  console.log(err)
                  return res.redirect('/bad-request')
            })
      
});



routes.get('/chat/:id',isAuthenticated,checkNotAdmin, function(req, res)
{
      let chatId = req.params.id;
      let user = req.session.user._id;

      Chat
      .find({ $or: [{ carrier: user }, { shipper:  user}] }) 
      .populate('carrier shipper job')     
      .sort([['createdAt', -1]])
      
      .then(async (chats) => {

            let chat = await Chat.findById(chatId).populate('carrier shipper job')

            let job = await Jobs.findOne({job: chat.job })            

            if(!chat) {
                  return res.redirect('/bad-request')
            }

            Messsages
            .find({chat: chatId})
            .sort([['createdAt', -1]])
            .limit(20)
            .then((messages) => {


                  messages = messages.reverse()
                  res.render('Pages/chat', {
                        "user": req.session.user,
                        "title": "chat",
                        "chats": chats,
                        "messages": messages,
                        "open": true,
                        "chat": chat,
                        'job': job
                  });
            })
            .catch(err => {
                  console.log(err)
                  return res.redirect('/bad-request')
            })
      })
      
      .catch(err => {
            console.log(err)
            return res.redirect('/bad-request')
      })

});





routes.get('/feedback',isAuthenticated,checkNotAdmin, function(req, res)
{
      res.render('Pages/feedback', {
            "user": req.session.user,
            "title": ""
      });
});

routes.get('/get-quotes', isAuthenticated ,checkNotAdmin, quoteController.getQuote );

// Admin Routes

routes.get('/admin/dashboard',checkAdmin , function(req, res)
{
      res.render('Pages/admin/admin', {
            page: 'dashboard',
            user: req.session.user
      });
});

routes.get('/admin/signin', checkAdminLoggedIn,function(req, res)
{
      res.render('Pages/admin/signin',{
            "user": req.session.user,
            "title": ""
      });
});



routes.get('/admin/shippers', function(req, res)
{
      res.render('Pages/admin/admin', {
            page: 'shippers',
            user: req.session.user
      });
});


routes.get('/admin/shipment/:id', function(req, res)
{


      res.render('Pages/admin/admin', {
            page: 'shipment-details',
            user: req.session.user
      });
});


routes.get('/admin/carriers', function(req, res)
{
      res.render('Pages/admin/admin', {
            page: 'carriers',
            user: req.session.user
      });
});

routes.get('/admin/payment', function(req, res)
{
      res.render('Pages/admin/admin', {
            page: 'payment',
            user: req.session.user
      });
});

routes.get('/admin/email', function(req, res)
{
      res.render('Pages/admin/admin', {
            page: 'email',
            user: req.session.user
      });
});

routes.get('/admin/feedback', function(req, res)
{
      res.render('Pages/admin/admin', {
            page: 'feedback',
            user: req.session.user
      });
});


routes.get('/get-cities', (req,res,next) => {
      res.status(200).json({'msg': 'cities', 'cities':  cities})
})

routes.get('/bad-request', (req,res,next) => {
      return res.render('Pages/pages_500',{
            "user": req.session.user,
            "title": ""
      });
})

routes.get('/forget-password', (req,res,next) => {
      return res.render('Pages/forget-password',{
            "user": req.session.user,
            "title": ""
      });
})


routes.get('/**', (req,res,next) => {
      return res.render('Pages/pages_404',{
            "user": req.session.user,
            "title": ""
      });
})


module.exports = routes;