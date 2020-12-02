const address = $('#address');
const username = $('#username');
const firstName = $('#first_name');
const lastName = $('#last_name');
const email = $('#email');
const password = $('#password');
const cPassword = $('#cpassword');
const phone = $('#phone');
const nicn = $('#nicn');
const driverLicense = $('#dl');
const type = $('#type');
const role = 'Carrier';
const terms = $('.terms')

$('.signup-button').attr('disabled', true);

terms.on('change', (e) => {
    let checked = terms.prop('checked');
    if(checked) {
        $('.signup-button').attr('disabled', false);
    } else {
        $('.signup-button').attr('disabled', true);
    }
})


$('#carrier-profile-form').on('submit', (e) => {
    e.preventDefault();
    
    if(password.val() !== cPassword.val()) {
        return alert('Password Not Matched!')
    }

    profile = {
        username: username.val(),
        address : address.val(),
        firstName : firstName.val(),
        lastName : lastName.val(),
        email : email.val(),
        password : password.val(),
        phone : phone.val(), 
        nicn: nicn.val(),
        driverLicense: driverLicense.val(),
        type: type.val(),
        role: role
    }

    $('.signup-button').attr('disabled', true);
    $('.signup-button').text('Loading ...');

    Controller.carrierSignup(profile)

})
