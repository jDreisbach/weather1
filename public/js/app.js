



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const er=document.querySelector('#er');
const mes=document.querySelector('#mes');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const location=search.value;
    

    er.textContent='content is loading';
    mes.textContent='';

    fetch('/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            er.innerHTML=data.error;
        }
       else{
           er.innerHTML=data.location;
           mes.innerHTML='It is currently ' + data.Forecast.Weather + ' and ' + data.Forecast.Temperature + ' degrees.  Although it feels like ' + data.Forecast.realFeel + ' degrees, with a ' + data.Forecast.Precip + ' Percent chance of rain. There is ' + data.Forecast.humidity + ' percent humidity.  These readings were observed at ' + data.Forecast.observed + '.';

           console.log(data.Forecast)
           
       }
       
    });
});

    console.log(location);
});