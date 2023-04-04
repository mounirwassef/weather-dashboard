var input = document.querySelector("input");
var button = document.querySelector("button");
var divall = document.querySelector(".all");
var seragain = document.querySelector(".seragain");
var divmain = document.createElement("section");


console.log(seragain);
console.log(input);
console.log(button);
console.log(divall);

button.addEventListener("click", function (event) {
    event.preventDefault();
    divall.textContent = "";

    var inputV = input.value;
    console.log(inputV);

    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?appid=ad861d2dad0b19f061e52ca6a8c5d639&q=${inputV}&units=imperial`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var div1new = document.createElement('div');
            var cardTitNew = document.createElement("h4");
            var carddatNew = document.createElement("p");
            var imgNew = document.createElement("img");
            var div2New = document.createElement("div")
            var ulNew = document.createElement("ul");
            var linNew = document.createElement("li");
            var lineNew = document.createElement("li");
            var linewNew = document.createElement("li");

            div1new.classList.add('card');
            cardTitNew.textContent = data.name;;
            carddatNew.textContent = dayjs(data.dt_txt).format('M/D/YYYY');
            imgNew.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            linNew.textContent = `Temp: ${data.main.temp} F`;
            lineNew.textContent = `Wind: ${data.wind.speed} MPH`;
            linewNew.textContent = `Humidity: ${data.main.humidity} %`;

            console.log(data.weather[0].icon);

            div1new.appendChild(cardTitNew);
            div1new.appendChild(carddatNew);
            div1new.appendChild(imgNew);
            div1new.appendChild(div2New);
            div2New.appendChild(ulNew);
            ulNew.appendChild(linNew);
            ulNew.appendChild(lineNew);
            ulNew.appendChild(linewNew);


            divall.appendChild(div1new);

            var requestUrlTwo = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=ad861d2dad0b19f061e52ca6a8c5d639`;

            fetch(requestUrlTwo)
                .then(function (responseTwo) {
                    return responseTwo.json();
                })

                .then(function (dataTwo) {
                    console.log(dataTwo);

                    var divMainBe = document.createElement("div");
                    var mainTi = document.createElement("h4");
                    mainTi.textContent = "5-Day Forecast:";

                    divMainBe.appendChild(mainTi);
                    divall.appendChild(divMainBe);


                    for (var i = 7; i < dataTwo.list.length; i += 7) {
                        var currentObj = dataTwo.list[i];
                        console.log(currentObj);

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

button.addEventListener("click", function (event) {
    event.preventDefault();

    var storedValues = JSON.parse(localStorage.getItem("values")) || [];
    var uniqueValues = Array.from(new Set(storedValues));
    var buttonnew = document.createElement("button");
    
    var currentValue = input.value;
    if (currentValue) {
        storedValues.push(currentValue);
        localStorage.setItem("values", JSON.stringify(storedValues));
    }
    
    for (var i = 0; i < uniqueValues.length; i++) {
        var value = uniqueValues[i];
        if (!localStorage.getItem(value)) {
            
            buttonnew.textContent = value;
            buttonnew.classList.add("btn");
            seragain.appendChild(buttonnew);
            localStorage.setItem(value, true);
        }
    }
    buttonnew.addEventListener("click", function (event) {
        event.preventDefault();
        input.value = buttonnew.textContent;
    });

});