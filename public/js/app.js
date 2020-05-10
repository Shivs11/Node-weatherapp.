

console.log("Client side JS.");




const search_now = document.querySelector('input');
const weatherform = document.querySelector('form');
const messageone = document.querySelector('#message-1');
const messagetwo = document.querySelector('#message-2');

messageone.textContent = 'From Javascript.';
messagetwo.textContent = '';

weatherform.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Testing!');
    const search_val = search_now.value;
    if(search_val === ''){
        messagetwo.textContent = 'Please enter a location!'
    }
    else{
        messagetwo.textContent = 'Loading....'
        fetch('http://api.weatherstack.com/current?access_key=2d7944100448dbf24f7ae2649c2ad4cf&query=' + search_val)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(!data.error){
                messagetwo.textContent = `${data.location.name} right now has a temperature of ${data.current.temperature} degrees.`;
            }
            else{
                messagetwo.textContent = 'An error has occured.';
            }
        })
    }
})
