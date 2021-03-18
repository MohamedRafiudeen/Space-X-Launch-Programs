window.onload(fetchData());
var launches = [];
var year = '2016';
var launch_success = false;

//fetch data from api
function fetchData() {
  //fetch th edata from the API
  fetch("https://api.spaceXdata.com/v3/launches?limit=10")
    .then((res) => {
      return res.json();
    })
    .then((value) => {
      launches = value;
      console.log("launches:", launches);
    })
    .then(() => {
      //display filter years(hard coded)
      var yrs = document.querySelector(".yrs");

      for (i = 2006; i <= 2020; i++) {
        var li = document.createElement("button");
        li.classList.add("yearsList");
        li.textContent = i;
        li.onclick = filterByYear;
        yrs.appendChild(li);
      }

      //display the fetched data in view
      var cardContainer = document.querySelector(".cardContainer");

      launches.forEach((ele) => {
        var card = document.createElement("div");
        card.classList.add("card");

        //display image
        var img = document.createElement("img");
        img.classList.add("cardImg");
        img.setAttribute("src", ele.links.mission_patch);

        //display title
        var title = document.createElement("h4");
        title.classList.add("title");
        title.textContent = ele.mission_name;

        //display missionId
        var missionIds = document.createElement("h4");
        missionIds.classList.add("missionIds");
        missionIds.textContent = "Mission ID: ";

        var missionId = document.createElement("span");
        missionId.classList.add("missionId");
        missionId.textContent = ele.mission_id[0] ? ele.mission_id[0] : "NA";

        //display Launch year:
        var launchYear = document.createElement("h4");
        launchYear.classList.add("launchYear");
        launchYear.textContent = "Launch Year: ";

        var year = document.createElement("span");
        year.classList.add("year");
        year.textContent = ele.launch_year;

        //display successful launch:
        var successfulLaunch = document.createElement("h4");
        successfulLaunch.classList.add("successfulLaunch");
        successfulLaunch.textContent = "Successful Launch: ";

        var sLauch = document.createElement("span");
        sLauch.classList.add("sLauch");
        sLauch.textContent = ele.launch_success;


        cardContainer.appendChild(card);
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(launchYear);
        launchYear.appendChild(year);
        card.appendChild(missionIds);
        missionIds.appendChild(missionId);
        card.appendChild(successfulLaunch);
        successfulLaunch.appendChild(sLauch);
      });
    })
    .catch((err) => console.log(err));
}

//upon year filter
function filterByYear(e) {
  year = e.target.textContent;
  const buttons = document.querySelectorAll('.yearsList')
  buttons.forEach( ele => {
      if(ele.classList.contains('active')){
          ele.classList.remove('active')
        }else if(!ele.classList.contains('active')){
            e.target.classList.add('active')
        }
    })
  e.target.classList.add('active')
 
    filter(year,launch_success);
}

// upon launch_success filter
function filterBylaunchSuccess(e) {
  console.log(e,e.value);
  launch_success = e.value ? e.value : false;
  console.log("launch success clicked: ", launch_success, year);
  console.log(year)
//   filter(this.year,this.launch_success);

  const buttons = document.querySelectorAll('.sLaunch')
  buttons.forEach( ele => {
    if(ele.classList.contains('active')){
        ele.classList.remove('active')
    }else if(!ele.classList.contains('active')){
        e.classList.add('active')
    }
})
e.classList.add('active');

filter(year,launch_success)

}


//fetch data with applied filters
function filter(year,launch_success) {
  console.log("launches", year,launch_success, launches);
  fetch(
    `https://api.spaceXdata.com/v3/launches/?limit=100&launch_year=${year}&launch_success=${launch_success}`
  )
    .then((res) => {
      return res.json();
    })
    .then((value) => {
      console.log("sort by year:", value);
      launches = value;
      console.log("launches", year, launch_success, launches);

      //display the fetched data in view
      var cardContainer = document.querySelector(".cardContainer");
      let cards = document.querySelectorAll(".card");
      cards.forEach(ele => {
          ele.parentNode.removeChild(ele);
      })

      launches.forEach((ele) => {
        let card = document.createElement("div");
        card.classList.add("card");

        //display image
        var img = document.createElement("img");
        img.classList.add("cardImg");
        img.setAttribute("src", ele.links.mission_patch);

        //display title
        var title = document.createElement("h4");
        title.classList.add("title");
        title.textContent = ele.mission_name;

        //display missionId
        var missionIds = document.createElement("h4");
        missionIds.classList.add("missionIds");
        missionIds.textContent = "Mission ID: ";

        var missionId = document.createElement("span");
        missionId.classList.add("missionId");
        missionId.textContent = ele.mission_id[0] ? ele.mission_id[0] : "NA";

        //display Launch year:
        var launchYear = document.createElement("h4");
        launchYear.classList.add("launchYear");
        launchYear.textContent = "Launch Year: ";

        var year = document.createElement("span");
        year.classList.add("year");
        year.textContent = ele.launch_year;

        //display successful launch:
        var successfulLaunch = document.createElement("h4");
        successfulLaunch.classList.add("successfulLaunch");
        successfulLaunch.textContent = "Successful Launch: ";

        var sLauch = document.createElement("span");
        sLauch.classList.add("sLauch");
        sLauch.textContent = ele.launch_success;

        //display Successful landing:
        var successfulLanding = document.createElement("h4");
        successfulLanding.classList.add("successfulLanding");
        successfulLanding.textContent = "Successful Landing: ";

        var sLand = document.createElement("span");
        sLand.classList.add("sLand");
        sLand.textContent = ele.launch_landing;

        cardContainer.appendChild(card);
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(launchYear);
        launchYear.appendChild(year);
        card.appendChild(missionIds);
        missionIds.appendChild(missionId);
        card.appendChild(successfulLaunch);
        successfulLaunch.appendChild(sLauch);
        card.appendChild(successfulLanding);
        successfulLanding.appendChild(sLand);

    });
    // const message = document.createElement('div');
    // message.classList.add('errMsg');
    // cardContainer.appendChild(message);
    // const span = document.createElement('h4');
    if(value.length == 0){
        alert('No launches matching the filter.. Please try another combination of filters..')
    }
    });
}
