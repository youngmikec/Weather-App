let history = JSON.parse(localStorage.getItem('history'));
if(history == ''){
    let hisDiv = document.querySelector('#history');
    hisDiv.innerHTML = `<h1>history is empty</h1>`;
}else{
    populateHistoryPage(history);
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
              <div style="margin-bottom: 5%;">
                <div style="float: left; margin-right: 45%;">
                    <h2>Sun rise</h2>
                    <h3><i class="fa fa-sun-o" aria-hidden="true"></i>   ${new Date(element.daily[0].sunset).getHours()}hours</h3>
                    <h2>Sun Set</h2>
                    <h3><i class="fa fa-moon-o" aria-hidden="true">   ${new Date(element.daily[0].sunrise).getMinutes()}hours</i></h3>
                </div>
                <div id="humidity">
                  <h3>Humidity</h3>
                  <canvas id="myCanvas1" width="120px" height="120px"></canvas>
                </div>
              </div>

              <div>
                <div style="float: left; margin-right: 40%;">
                  <h2>Record Rain</h2>
                  <h3><i class="fa fa-tint" aria-hidden="true" style="color: #4db6f3"></i>   ${element.daily[0].rain}(2020)</h3>
                  <h2>Average Rain</h2>
                  <h3><i class="fa fa-tint" aria-hidden="true" style="color: #4db6f3"></i>   ${element.daily.forEach((r,i,a) => {let t; return t = (t + r.rain)})}cm</h3>
                </div>
                <div id="wind-speed">
                  <h3>Weed speed</h3>
                  <canvas id="myCanvas2" width="120px" height="120px"></canvas>
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