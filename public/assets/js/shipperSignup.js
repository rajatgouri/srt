const terms = $('.terms-condition')

$('.signup-button').attr('disabled', true);

terms.on('change', (e) => {
    let checked = terms.prop('checked');
    if(checked) {
        $('.signup-button').attr('disabled', false);
    } else {
        $('.signup-button').attr('disabled', true);
    }
})


$("#shipper-profile-form").on('submit',function (e) {
    e.preventDefault();

    const username = $('#username');
    const firtsName = $('#first_name');
    const lastName = $('#last_name');
    const email = $('#email');
    const password = $('#password');
    const cPassword = $('#cpassword');
    const phone = $('#phone');
    const address = $('#address');
    const nicn = $('#nicn')
    const type = $('#type');


    

    if (password.val() !== cPassword.val()) {
        return alert('Password Not Matched')
    }


    


    $('.signup-button').text('Loading...');
    $('.signup-button').attr('disabled', true);

    const signupFormData =  {
        "username": username.val(),
        "firstName": firtsName.val(),
        "lastName": lastName.val(),
        "email": email.val(),
        "password": password.val(),
        "phone": phone.val(),
        "type": type.val(),
        "address": address.val(),
        "nicn": nicn.val(),
        "role": "Shipper"
    }


    Controller.shipperSignup(signupFormData);
})