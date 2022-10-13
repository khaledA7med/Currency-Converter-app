const dropList = document.querySelectorAll(".drop-list select"),
      fromCurrency = document.querySelector(".from select"),
      toCurrency = document.querySelector(".to select"),
      getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
    for(cuurency_code in country_code){
        let selected;
        if (i == 0) {
            selected = cuurency_code == "USD" ? "selected" : "";
        } else if (i == 1) {
            selected = cuurency_code == "EGP" ? "selected" : "";
        }
        let optionTag = `<option value="${cuurency_code}" ${selected}>${cuurency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target);
    });
}

/* load flag */ 
function loadFlag(element) {
    for(let code in country_code){
        if (code == element.value) {
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://www.countryflagicons.com/FLAT/64/${country_code[code]}.png`;
        }
    }
};

window.addEventListener("load", () =>{
    getExchangeRate();
});

getButton.addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRate();
});

/* exchange icon */
const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});

/* exchange cuurency */
function getExchangeRate() {
    const amount = document.querySelector(".amount input"),
          exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...."
    let url = ` https://v6.exchangerate-api.com/v6/d555fe0f582cd456d72bb7cd/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate =  result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
        
    }).catch(()=>{
        exchangeRateTxt.innerText = `sorry, there is something wrong!!`
    });
};
