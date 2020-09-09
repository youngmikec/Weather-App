

const drawHumidityCircle = (obj) =>{
  let canvas = document.createElement('canvas');
  canvas.setAttribute('width', '100%');
  canvas.setAttribute('height', '100%');
  // parent.appendChild(canvas);
  let ctx = canvas.getContext("2d");
  let value = (obj.current.humidity * 2)/100;
  ctx.beginPath();
  ctx.arc(50, 50, 40, 0, 2 * Math.PI);
  ctx.lineWidth = 4; 
  ctx.strokeStyle = "#294a5f";
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(50, 50, 40, 0, value * Math.PI);
  ctx.lineWidth = 4; 
  ctx.strokeStyle = "#4db6f3";
  ctx.stroke();
  ctx.font = '20px Roboto';
  ctx.fillStyle = 'white';
  ctx.fillText(`${obj.current.humidity}%`, 35, 55)
  return canvas;

}

const drawPressureCircle = (obj) =>{
  
  let canvas = document.createElement('canvas');
  canvas.setAttribute('width', '100%');
  canvas.setAttribute('height', '100%');
  let ctx = canvas.getContext("2d");
  let value = (obj.current.wind_speed * 2)/100;
  ctx.beginPath();
  ctx.arc(50, 50, 40, 0, 2 * Math.PI);
  ctx.lineWidth = 4; 
  ctx.strokeStyle = "#294a5f";
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(50, 50, 40, 0, value * Math.PI);
  ctx.lineWidth = 4; 
  ctx.strokeStyle = "#4db6f3";
  ctx.stroke();
  ctx.font = '20px Roboto';
  ctx.fillStyle = 'white';
  ctx.fillText(`${Math.ceil(obj.current.wind_speed)}`, 40, 55);
  ctx.font = '10px Roboto';
  ctx.fillText(`km/h`, 35, 65);
  return canvas;
}

function populateHistoryPage(history){
    history.forEach(element => {
        // create the html elements
        let hisDiv = document.querySelector('#history');
        let container = document.createElement('div');
        let leftdiv = document.createElement('div');
        let rightdiv = document.createElement('div');
        let heading1 = document.createElement('h2');
        let heading2 = document.createElement('h1');
        let heading3 = document.createElement('h2');
        //let heading1 = document.createElement('h2');

        //set attributes and properties
        container.style.display = 'flex';
        heading1.textContent = `${element.timezone}`;
        heading2.innerHTML = `${Math.ceil(element.current.temp - 273)}<sup>oc</sup>`;
        heading3.textContent = `${element.current.weather[0].description}`;
        leftdiv.style.flex = '1';
        rightdiv.style.flex = '1';
        rightdiv.innerHTML = `
        <div class="f-1">
        <h1>History</h1>
              <div style="margin-bottom: 5%;">
                <div style="float: left; margin-right: 48%;">
                    <h2>Sun rise</h2>
                    <h3><i class="fa fa-sun-o" aria-hidden="true"></i>   ${new Date(element.daily[0].sunset).getHours()}hours</h3>
                    <h2>Sun Set</h2>
                    <h3><i class="fa fa-moon-o" aria-hidden="true">   ${new Date(element.daily[0].sunrise).getMinutes()}hours</i></h3>
                </div>
                <div class="humidity">
                  <h3>Humidity</h3>
                  
                </div>
              </div>

              <div>
                <div style="float: left; margin-right: 40%;">
                  <h2>Record Rain</h2>
                  <h3><i class="fa fa-tint" aria-hidden="true" style="color: #4db6f3"></i>   ${element.daily[0].rain}(2020)</h3>
                  <h2>Average Rain</h2>
                  <h3><i class="fa fa-tint" aria-hidden="true" style="color: #4db6f3"></i>   ${element.daily.forEach((r,i,a) => {let t; return t = (t + r.rain)})}cm</h3>
                </div>
                <div class="wind-speed">
                  <h3>Wind speed</h3>
                  
                </div>
              </div>
              
            </div>
        `;
        

        
        leftdiv.appendChild(heading1);
        leftdiv.appendChild(heading2);
        leftdiv.appendChild(heading3);
        
        container.appendChild(leftdiv);
        container.appendChild(rightdiv);
        hisDiv.appendChild(container);

        

        hisDiv.addEventListener('click', ()=>{

        })

    })
}

let history = JSON.parse(localStorage.getItem('history'));
if(history == ''){
    let hisDiv = document.querySelector('#history');
    hisDiv.innerHTML = `<h1>history is empty</h1>`;
}else{
    populateHistoryPage(history);
    history.forEach(element => {
      drawHumidityCircle(element);
        drawPressureCircle(element);
    })
}

let parents1 = document.querySelectorAll('.humidity');
let parents2 = document.querySelectorAll('.wind-speed');

Array.from(parents1).forEach((element, ind) =>{
  console.log(element);
  element.appendChild(drawHumidityCircle(history[ind])); 
});
Array.from(parents2).forEach((element, ind) =>{
  console.log(element);
  element.appendChild(drawPressureCircle(history[ind])); 
});
