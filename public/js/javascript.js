const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.getElementById('msg1');
const msgTwo = document.getElementById('msg2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    console.log(location);
    msgOne.textContent = 'Loading...';
    msgTwo.textContent = '';

    fetch(`/weather?address=${location}`).then((err, response) => {
        console.log(err);
        msgOne.textContent = err;
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                msgOne.textContent = data.error;
            } else {
                console.log(data);
                msgOne.textContent = data.location;
                msgTwo.textContent = data.forecast;
            }
        });
    });
});