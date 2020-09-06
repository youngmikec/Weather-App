
window.addEventListener('load', ()=>{
  setTimeout(()=>{
    let main = document.querySelector('#main');
    let Intro = document.querySelector('#Intro');

    main.classList.replace('dp-h', 'dp-b');
    Intro.classList.replace('dp-b', 'dp-h');
    
  }, 2000);

});



class WeatherApp{
  constructor(location = ''){

  }
  data;

  getDataFromStorage(){
    let obj = JSON.parse(localStorage.getItem('weather'));
    //console.log(obj);
    return obj;
  }

  // for displaying the result in google map.

  // function showPosition(position) {
  //   var latlon = position.coords.latitude + "," + position.coords.longitude;
  
  //   var img_url = "https://maps.googleapis.com/maps/api/staticmap?center=
  //   "+latlon+"&zoom=14&size=400x300&sensor=false&key=YOUR_KEY";
  
  //   document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
  // }
  
  save(obj){
    localStorage.setItem('weather', JSON.stringify(obj));
  }

  fetchData(LAT, LON){
   //console.log(LAT, LON);
    let API_KEY = '22d07d00abe21b42f42813b12e1b9380';
    let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&exclude=hourly,daily&appid=${API_KEY}`;
    fetch(api)
    .then(res => {
       return res.json();
    }).then(result =>{
      this.data = result;
      return this.data;
    }).catch(err => console.error(err));
  }
  getData(){
    console.log(this.data);
    return this.data;
  }
  checkData(){
    if( this.getDataFromStorage() !== null || undefined){
      this.data = this.getDataFromStorage() ;
      return true;
    }else{
      return false;
    }
  }

  populateTemperature(obj){
    let temp = document.querySelector('#temp');
    let heading1 = document.createElement('h2');
    let heading2 = document.createElement('h1');
    let heading3 = document.createElement('h2');
    let sup = document.createElement('sup');
    let progress = document.querySelector('#thermo-progress');

    progress.style.top = `${100 - Math.ceil(obj.current.temp - 273)}%`;
    sup.innerHTML = 'oc';
    heading1.innerHTML = obj.timezone;
    heading2.innerHTML = Math.ceil(obj.current.temp - 273);
    heading2.appendChild(sup);
    heading3.innerHTML = obj.current.weather[0].description;

    heading1.setAttribute('class', 'center');
    heading2.setAttribute('class', 'center');
    heading3.setAttribute('class', 'center');

    temp.appendChild(heading1);
    temp.appendChild(heading2);
    temp.appendChild(heading3);
    console.log(heading1);
  }
}



    let weather = new WeatherApp();
    if(weather.checkData()){
      //let weatherData = weather.getDataFromStorage();
      let data = weather.data;
      console.log(data);
      weather.populateTemperature(data);
      // weather.save();
    }else{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) =>{
          weather.fetchData(position.coords.latitude, position.coords.longitude);
          //console.log(forecast);
          console.log(weather.data);
        });
        
      }
    }
    