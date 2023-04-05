//var selected and created
var input = document.querySelector("input");
var button = document.querySelector("button");
var divall = document.querySelector(".all");
var seragain = document.querySelector(".seragain");
var divmain = document.createElement("section");

//console loging them to make sure they are working
console.log(seragain);
console.log(input);
console.log(button);
console.log(divall);

//first event Listener which will send a request and response and create 
//elements on web page based on data from the respons of the api
//blew as well call 2 api one for todays weather and the other for the next 5 days
button.addEventListener("click", function (event) {

    //preventing Default
    event.preventDefault();

    //setting the result page to black when the button is clicked
    divall.textContent = "";

    //getting the input and puting it in the first API 
    var inputV = input.value;
    console.log(inputV);

    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?appid=ad861d2dad0b19f061e52ca6a8c5d639&q=${inputV}&units=imperial`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //console to check the response
            console.log(data);

            //creating the elements created a div,h4,p,img,and li 
            var div1new = document.createElement('div');
            var cardTitNew = document.createElement("h4");
            var carddatNew = document.createElement("p");
            var imgNew = document.createElement("img");
            var div2New = document.createElement("div")
            var ulNew = document.createElement("ul");
            var linNew = document.createElement("li");
            var lineNew = document.createElement("li");
            var linewNew = document.createElement("li");

            //adding data and class to the elements
            div1new.classList.add('card');
            cardTitNew.textContent = data.name;;
            carddatNew.textContent = dayjs(data.dt_txt).format('M/D/YYYY');
            imgNew.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            linNew.textContent = `Temp: ${data.main.temp} F`;
            lineNew.textContent = `Wind: ${data.wind.speed} MPH`;
            linewNew.textContent = `Humidity: ${data.main.humidity} %`;

            //here i was checking how can i get the img to work 
            console.log(data.weather[0].icon);

            //addending child for the elements 
            div1new.appendChild(cardTitNew);
            div1new.appendChild(carddatNew);
            div1new.appendChild(imgNew);
            div1new.appendChild(div2New);
            div2New.appendChild(ulNew);
            ulNew.appendChild(linNew);
            ulNew.appendChild(lineNew);
            ulNew.appendChild(linewNew);


            divall.appendChild(div1new);

            // i added the secound api inside the first one response so the first one would compleat
            //as we need data from it to the secound 

            var requestUrlTwo = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=ad861d2dad0b19f061e52ca6a8c5d639`;

            fetch(requestUrlTwo)
                .then(function (responseTwo) {
                    return responseTwo.json();
                })

                .then(function (dataTwo) {
                    //checking the response
                    console.log(dataTwo);

                    //creating the h4 5-day forcast 

                    var divMainBe = document.createElement("div");
                    var mainTi = document.createElement("h4");
                    mainTi.textContent = "5-Day Forecast:";

                    divMainBe.appendChild(mainTi);
                    divall.appendChild(divMainBe);

                    //weather is updated every 3 hours there is 24 our a day so 24/3 is 7 so 
                    //that is why the below for loop is i+7

                    for (var i = 7; i < dataTwo.list.length; i += 7) {
                        var currentObj = dataTwo.list[i];
                        console.log(currentObj);

                       //creating the elements and it will be the same as above
                       //but the diffrence having a section to them so i can style them differently
                        var divmain = document.createElement("section")
                        var div1 = document.createElement('div');
                        var carddat = document.createElement("p");
                        var img = document.createElement("img");
                        var div2 = document.createElement("div")
                        var ul = document.createElement("ul");
                        var lin = document.createElement("li");
                        var line = document.createElement("li");
                        var linew = document.createElement("li");

                        div1.classList.add('card');
                        carddat.textContent = dayjs(currentObj.dt_txt).format('M/D/YYYY');
                        img.setAttribute('src', `https://openweathermap.org/img/wn/${currentObj.weather[0].icon}@2x.png`);
                        lin.textContent = `Temp: ${currentObj.main.temp} F`;
                        line.textContent = `Wind: ${currentObj.wind.speed} MPH`;
                        linew.textContent = `Humidity: ${currentObj.main.humidity} %`;

                        console.log(currentObj.weather[0].icon);

                        div1.appendChild(carddat);
                        div1.appendChild(img);
                        div1.appendChild(div2);
                        div2.appendChild(ul);
                        ul.appendChild(lin);
                        ul.appendChild(line);
                        ul.appendChild(linew);

                        divmain.appendChild(div1);
                        divall.appendChild(divmain);

                    };


                });
        });
});

//this line gets the items from the local storage and 
// If there are no previously stored values, then it creates an empty array.
var storedValues = JSON.parse(localStorage.getItem("values")) || [];

//This loop iterates through the stored values and creates a button element for each value.
//and the input value will be the text content of the button
for (var i = 0; i < storedValues.length; i++) {
    var currentValue = storedValues[i];
    var buttonnew = document.createElement("button");
    buttonnew.textContent = currentValue;
    buttonnew.classList.add("btn");
    seragain.appendChild(buttonnew);
  
    buttonnew.addEventListener("click", function (event) {
      event.preventDefault();
      input.value = event.target.textContent;
    });
  }
//This code adds a click event listener to the "button" element. When the button is clicked, 
//and gets the text of the button and putit in the input
button.addEventListener("click", function (event) {
    event.preventDefault();

    var currentValue = input.value;
    if (currentValue && storedValues.indexOf(currentValue) === -1) {
        storedValues.push(currentValue);
        localStorage.setItem("values", JSON.stringify(storedValues));

        var buttonnew = document.createElement("button");
        buttonnew.textContent = currentValue;
        buttonnew.classList.add("btn");
        seragain.appendChild(buttonnew);

        buttonnew.addEventListener("click", function (event) {
            event.preventDefault();
            input.value = buttonnew.textContent;
        });

    }
});