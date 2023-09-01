import conditions from "./conditions.js";
let apikey = "361bf88fd62549e99d7212831233108";
let country = "";
let header = document.querySelector(".header");
let form = document.querySelector(".form");
let input = document.querySelector(".input");
function removeCard() {
  if (document.querySelector(".card")) {
    document.querySelector(".card").remove();
  }
}
function showError(errorMessage) {
  let error = `<div class="card">${errorMessage}</div>`;
  header.insertAdjacentHTML("afterend", error);
}
function showCard({ name, country, temp,text,loc,Folder}) {
  let html = `<div class="card">
    <h2 class="card-city">${name}<span>${country}</span></h2>
    <div class="card-weather">
        <div class="card-value">${temp}<sup>°c</sup></div>
        <img class="card-img" src="./img/${Folder}/Cloudy.png" alt="weather">
    </div>
    <div class="card-description">${text}</div>
</div>`;
  header.insertAdjacentHTML("afterend", html);
  console.log(Folder)
}
function russianCon(code,number){
    for(let item of conditions){
        if(code==item.code){
            if(number){
                return item.languages[23].day_text
            }
            return item.languages[23].night_text
        }
}

}
form.addEventListener("submit",(e) => {
  e.preventDefault();
  country = input.value;
  let url = `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${country}`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let folderPath=''
      if(data.current.is_day){
        folderPath='day'
      }
      else{
        folderPath='night'
      }
      let fileName=conditions.map((item)=>{
        if(data.current.condition.code==item.code){
            if(data.is_day){
                return item.day
            }
            else{
                return item.night
            }
        }
      })
      let fileName1=`${fileName[0]}.png`
      if (data.error) {
        removeCard();
        showError(data.error.message);
      } else {
        removeCard();
       }
        showCard({
          name: data.location.name,
          country: data.location.country,
          temp: data.current.temp_c,
          text:russianCon(data.current.condition.code,data.current.condition.is_day),
          loc:fileName1,
          Folder:folderPath
        });
      })
    });
