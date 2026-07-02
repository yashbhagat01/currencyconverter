const amount = document.querySelector("input");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");

const fromFlag = document.querySelector(".from img");
const toFlag = document.querySelector(".to img");

const button = document.querySelector("button");
const msg = document.querySelector(".msg");

const countryList = {
    USD: "US",
    INR: "IN",
    EUR: "FR",
    GBP: "GB",
    JPY: "JP",
    AUD: "AU",
    CAD: "CA"
};

function updateFlag(select, img) {
    let countryCode = countryList[select.value];
    img.src = `https://flagsapi.com/${countryCode}/shiny/64.png`;
}

// set initial flags
updateFlag(from, fromFlag);
updateFlag(to, toFlag);

// update flag when selection changes
from.addEventListener("change", () => {
    updateFlag(from, fromFlag);
});

to.addEventListener("change", () => {
    updateFlag(to, toFlag);
});

// convert currency on button click
button.addEventListener("click", async (e) => {
    e.preventDefault();

    let amt = amount.value;

    if (amt === "" || amt === "0") {
        amt = "1";
        amount.value = "1";
    }

    try {
        const URL = `https://open.er-api.com/v6/latest/${from.value}`;

        const response = await fetch(URL);
        const data = await response.json();

        const rate = data.rates[to.value];
        const finalRate = (amt * rate).toFixed(2);

        msg.innerText = `${amt} ${from.value} = ${finalRate} ${to.value}`;
    }
    catch (error) {
        msg.innerText = "Error Fetching Data";
        console.log(error);
    }
});