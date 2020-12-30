// console.log('added js');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1=  document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');
// msg1.textContent = 'added new in paragraph';

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    // console.log(location);
    msg1.textContent = 'Loading....';
    msg2.textContent = '';

    fetch('http://localhost:3000/weather?address='+location).then((res)=>{
        res.json().then((data)=>{
            if (data.err) {
                msg1.textContent = data.err;
            }else{
                msg1.textContent = data.location;
                msg2.textContent = data.forecast;
            }
        });
    });

})

// goal : Use input value to get weather

// 1. Migrate fetch call into the submit callback
// 2. Use the search text as the address query string value.
// 3. Submit the form with a valid and invalid value to test

// goal 2 : Render context to paragraphs
// 1. Select the second msg paragraph from javascript.
// 2. Just before fetch, render loading message and empty p.
// 3. If error, render error.
// 4. If no error, render location and forecast.
// 5. Test your work! Search for errors and for valid locations.