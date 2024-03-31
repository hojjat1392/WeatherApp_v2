const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");


weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch("http://localhost:3000/weather?address=" + location).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
          messageTwo.textContent = "";

          // console.log(data.error);
        } else {
          messageOne.textContent = `You choose ${data.forecast.cityname}. temp is ${data.forecast.temp}`;
          messageTwo.textContent = data.forecast.description;

          // console.log(`You choose ${data.forecast.cityname}. temp is ${data.forecast.temp}`);
          // console.log(data.forecast.description);
        }
      });
    }
  );
});
