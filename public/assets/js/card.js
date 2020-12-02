const cardNumber = $('#cardnumber');
const month = $('#month');
const year = $('#year');
const cvc = $('#cvc');
const save = $('.card-button');

month.on('keyup',(e) => {
    let value = e.target.value;
    result = value.match(/(^0?[1-9]$)|(^1[0-2]$)/gm);       
    if(!result) {
        month.css('color','red');
        save.attr('disabled', true);
    } else {
        month.css('color','black');
        save.attr('disabled', false);
    }
})

cardNumber.on('keyup',(e)=>{
    let value = e.target.value;
    if (value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/gm)) {
        cardNumber.css('color', 'black');
        save.attr('disabled', false);
    } else {
        cardNumber.css('color', 'red');
        save.attr('disabled', true);
    } 
})

year.on('keyup', (e) => {
    let value = e.target.value;
    let date =  new Date().getFullYear()

    if(value.match(/^[1-9]{1}[0-9]{3}$/gm)) {
        if(parseInt(value) >= parseInt(date)) {
            year.css('color', 'black');
            save.attr('disabled', false);
        } else {
            year.css('color', 'red');
            save.attr('disabled', true);
        }
    } else {
        year.css('color', 'red');
        save.attr('disabled', true);
    }
})

cvc.on('keyup', (e) => {
    let value = e.target.value;
    if(value.match(/^[1-9]{5}$/gm)) {
        cvc.css('color', 'black');
        save.attr('disabled', false);
    } else {
        cvc.css('color', 'red');
        save.attr('disabled', true);
    }
})

$('#card-form').on('submit', function(e) {
    e.preventDefault()
    
    let data = {
        user: user,
        card: cardNumber.val(),
        month: month.val(),
        year: year.val(),
        cvc: cvc.val()
    }
    
    $('.card-button').attr('disabled', true);
    $('.card-button').text('loading...')
    Controller.registerCard(data)
})