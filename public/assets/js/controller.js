
(function($) {
    
    var Controller;
    
    Controller = {
        success: function(msg) {
            return Swal.fire(
                'Done!',
                msg,
                'success'
              )
        },
        error: function(msg) {
            return Swal.fire({
                icon: 'error',
                title: 'Error Occurs',
                html: msg
            })
        },
        errorMessages: function(error) {
            let errorMessage = 'Unknown Error Occurs';

            switch(error) {
                case 'USER_EXISTS':
                    errorMessage = 'User Already Exists';
                    break;
                case 'NOT_EXISTS':
                    errorMessage = 'User Not Exists';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'Password Does Not Match';
                    break;
                case 'INTERNAL_SERVER':
                    errorMessage = 'Internal Server Error';
                    break;
                case 'IS_EMPTY':
                    errorMessage = 'Fields are Empty'
                    break;
                case 'INVALID_EMAIL': 
                    errorMessage = 'Email is Invalid'
                    break;
                case 'NOT_ACTIVATED': 
                    errorMessage = 'Account not activated! <a class="resend-link">Resend Link</a>'
                    break;
                case 'CARD_EXISTS':
                    errorMessage = 'Card Already Exists!'
                    break;
                
            }

            
            Controller.error(errorMessage);
        },
        resendLink: function (data) {
            $.ajax({
                url: '/resend-link',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data
            }).done((response) => {
                Controller.success('Email Activation Link Send to your Email')
                    .then(() => {
                        window.location.reload();
                    })
            }).fail((err) => {
                
                let response = (err.responseJSON)
                Controller.errorMessages(response.error)
            })
        },
        forgetPassword: function(data) {
            $.ajax({
                url: '/forget-password',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data
            }).done((response) => {
                $('.forget-password-button').attr('disabled', false);
                $('.forget-password-button').text('Send');
    
                Controller.success('Link Send to this email!');
            }).fail((err) => {
                 $('.forget-password-button').attr('disabled', false);
                $('.forget-password-button').text('Send');

                let response = (err.responseJSON)
                Controller.errorMessages(response.error)
            })
        },
        registerCard: function(data) {
            $.ajax({
                url: '/register-card',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data
            }).done((response) => {
                $('.card-button').attr('disabled', false);
                $('.card-button').text('Loading...');
                window.location.href = `${response.redirect}`
                // Controller.success('Link Send to this email!');
            }).fail((err) => {
                 $('.card-button').attr('disabled', false);
                $('.card-button').text('Save');

                let response = (err.responseJSON)
                Controller.errorMessages(response.error)
            })
        },
        adminLogin: function(data) {
            $.ajax({
                url: '/admin-signin ',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data
            }).done((response) => {
                $('.admin-login-button').attr('disabled', false);
                $('.admin-login-button').text('Log In');
                
                window.location.href = '/admin/dashboard'
            }).fail((err) => {
                 $('.admin-login-button').attr('disabled', false);
                $('.admin-login-button').text('Log In');

                let response = (err.responseJSON)
                Controller.errorMessages(response.error)
            })
        },
        changePassword: function(data) {
            $.ajax({
                url: '/change-password',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data
            }).done((response) => {
                $('.change-password-button').attr('disabled', false);
                $('.change-password-button').text('Reset Password');
    
                Controller.success('Reset Password Successfully!').then(() => {
                    window.location.href=" /login"
                });
            }).fail((err) => {
                 $('.change-password-button').attr('disabled', false);
                $('.change-password-button').text('Reset Password');

                let response = (err.responseJSON)
                Controller.errorMessages(response.error)
            })
        },
        carrierSignup: function (data) {
            $.ajax({
                url: '/carrier-profile-signup',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data
            }).done((response) => {
                
                    $('.signup-button').attr('disabled', false);
                    $('.signup-button').text('Register');

                    Controller
                        .success('Email Activation Link send to your Email!')
                        .then(() => {
                            window.location.href= "/login";
                        });
            }).fail((err) => {
                $('.signup-button').attr('disabled', false);
                $('.signup-button').text('Register');

                let response = (err.responseJSON)
                Controller.errorMessages(response.error)
            })
        },
        carrierAlert: function (data) {
            $.ajax({
                url: '/carrier-alerts-signup',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data
            }).done((response) => {
                if(response.status) {
                    window.location.href = `/register-carrier/card-details/${response.userId}`
                }
            }).fail((err) => {
                console.log(err)
                $('.signup-button').attr('disabled', false);
                $('.signup-button').text('Submit');
    
                let response = (err.responseJSON)
                Controller.errorMessages(response.error)
            })
        },
        carrierFleet: function(data) {
            $.ajax({
                url: '/carrier-fleet-signup',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data
            }).done((response) => {
                if (response.status) {
                    window.location.href= `/register-carrier/card-details/${response.userId}`
                }
            }).fail((err) => {
                console.log(err)
                $('.fleet-button').attr('disabled', false);
                $('.fleet-button').text('Submit');
    
                let response = (err.responseJSON)
                Controller.errorMessages(response.error)
            })
        },
        carrierSubscription: function (data) {
            $.ajax({
                url: '/carrier-subscribe-signup',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data
            }).done((response) => {
                console.log(response)
    
                window.location.href = "/login"
            }).fail((err) => {
                console.log(err)
                
                $('.subscribe-button').attr('disabled', false);
                $('.subscribe-button').text('Subscribe Now');
        
                let response = (err.responseJSON)
                Controller.errorMessages(response.error);
            })
        },
        updateCarrierProfile: function (data) {
            $.ajax({
                url: '/update-carrier-profile',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data
            }).done((response) => {
                if(response.status) {
                    Controller
                        .success('Profile Updated Successfully!')
                        .then(() => {
                            window.location.href = `/profile`
                        });
                }
            }).fail((err) => {
                console.log(err)
                $('.signup-button').attr('disabled', false);
                $('.signup-button').text('Submit');

                let response = (err.responseJSON)
                Controller.errorMessages(response.error)
            })
        },
        updateCarrierFleet: function(data) {
            $.ajax({
                url: '/update-carrier-fleet',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data
            }).done((response) => {
                Controller
                    .success('Fleet Details Updated Successfully!')
                    .then(() => {
                        window.location.href = '/profile'
                    });
                
            }).fail((err) => {
                console.log(err)
                $('.fleet-button').attr('disabled', false);
                $('.fleet-button').text('Submit');
    
                let response = (err.responseJSON)
                Controller.errorMessages(response.error)
            })
        },
        updateCarrierAlert: function (data) {
            $.ajax({
                url: '/update-carrier-alert',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data
            }).done((response) => {
                Controller
                    .success('Alerts Updated Successfully!')
                    .then(() => {
                        window.location.href ='/profile'
                    });
            }).fail((err) => {
                console.log(err)
                $('.signup-button').attr('disabled', false);
                $('.signup-button').text('Submit');
    
                let response = (err.responseJSON)
                Controller.errorMessages(response.error)
            })
        },
        shipperSignup : function (data) {
            $.ajax({
                url: '/shipper-signup',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data
            }).done((response) => {
                if(response.status) {
                    $('.signup-button').attr('disabled', false);
                    $('.signup-button').text('Sign up');

                    Controller
                        .success('Account Activation Link send to your Email!')
                        .then(() => {
                            window.location.href= "/register-shipper/card-details/" + response.user;
                        });
                }
            }).fail((err) => {
                $('.signup-button').attr('disabled', false);
                $('.signup-button').text('Sign up');
        
                let response = (err.responseJSON)
                Controller.errorMessages(response.error);
        
            })
        },
        updateShipper: function (data) {
            $.ajax({
                url: '/update-shipper',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data
            }).done((response) => {
                Controller.
                    success('Shipper Profile Updated')
                    .then(() => {
                        window.location.href= "/profile"
                    });
            }).fail((err) => {
                console.log(err)
                $('.signup-button').attr('disabled', false);
                $('.signup-button').text('Sign up');
        
                let response = (err.responseJSON)
                Controller.errorMessages(response.error)
        
            })
        }

    };
    
    window.Controller = Controller;
    
})(this.jQuery);


