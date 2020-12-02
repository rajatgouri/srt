const express = require('express');
const postRouter = express.Router();
const AuthController = require('../controllers/auth');
const AdminController = require('../controllers/admin')
const QuoteController = require('../controllers/get-a-quote');
const User = require('../models/user');
const chatController  = require('../controllers/chatController');
const shipperController = require('../controllers/shipper');
const carrierController = require('../controllers/carrier');

const isAuthenticated = require('../middleware/auth');

const multer = require('multer');

var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        
        if (file.fieldname === 'myfile') {
          cb(null, 'uploads'); 
        } 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 

const fileFilter = (req, file, cb) => {
    if ( file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ) { 
      cb(null, true);
    } else {
      cb(null, false);
    }
};

var upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
})


postRouter.post('/login',  AuthController.login);

postRouter.post('/logout',  isAuthenticated ,AuthController.logout);

postRouter.post('/forget-password',  AuthController.forgetPassword);

postRouter.post('/change-password',  AuthController.changePassword);

postRouter.post('/add-admin',  AdminController.addAdmin);

postRouter.post('/resend-link',  AuthController.resendAccountActivationLink);

postRouter.post('/register-card',  AuthController.registerCard);


postRouter.post('/end-job', isAuthenticated, QuoteController.endJob);

// Shippers
postRouter.post('/shipper-signup',  AuthController.shipperSignup);

postRouter.post('/update-shipper',  shipperController.updateShipper);

postRouter.post('/get-shipper-posts', isAuthenticated , shipperController.getShipperPosts);

postRouter.post('/assign-job', isAuthenticated , shipperController.assignJob);

postRouter.post('/decline-job', isAuthenticated , shipperController.declineJob);




// Carrier
postRouter.post('/carrier-profile-signup', AuthController.carrierProfile); 

postRouter.post('/carrier-fleet-signup', AuthController.carrierFleet);

postRouter.post('/carrier-alerts-signup', AuthController.carrierAlert);

postRouter.post('/carrier-subscribe-signup', AuthController.carrierSubscription);

postRouter.post('/update-carrier-profile', carrierController.updateCarrierProfile);

postRouter.post('/update-carrier-fleet', carrierController.updateCarrierFleet);

postRouter.post('/update-carrier-alert', carrierController.updateCarrierAlert);

postRouter.post('/update-carrier-subscription', carrierController.updateCarrierSubscription);

postRouter.post('/get-a-quote', isAuthenticated ,upload.single('myfile') , QuoteController.postQuote);

postRouter.post('/get-carrier-jobs', isAuthenticated , carrierController.getCarrierJobs);

postRouter.post('/do-bid', isAuthenticated , carrierController.doBid);

postRouter.post('/get-selected-quote', isAuthenticated , carrierController.getSelectedQuote);

postRouter.post('/get-selected-quote', isAuthenticated , carrierController.getSelectedQuote);



// chat 

postRouter.post('/setup-chat', isAuthenticated , chatController.setupChat);

postRouter.post('/get-rest-messages', isAuthenticated , chatController.getRestMessages);





// admin

postRouter.post('/admin-login', AdminController.addAdmin)

postRouter.post('/admin-signin', AdminController.loginAdmin);




module.exports = postRouter;