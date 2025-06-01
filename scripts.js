const form = document.getElementById("converterForm");
const amout = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertedAmount = document.getElementById("convertedAmount");
const converterBtn = document.getElementById("converterBtn");
const loading = document.querySelector(".loading");
const result = document.querySelector(".result");
const error = document.querySelector(".error");

const API_URL = "https://api.exchangerate-api.com/v4/latest/";

async function convertMoney() {
  converterBtn.style.display = "none";
  loading.style.display = "block";
  error.style.display = "none";
  result.style.display = "none";
  try {
    const response = await fetch(API_URL + fromCurrency.value);
    const data = await response.json();
    const rate = data.rates[toCurrency.value];
    const convertedValue = (amout.value * rate).toFixed(2);

    convertedAmount.value = convertedValue;
    result.style.display = "block";

    result.innerHTML = `
    <div style="font-size: 1.2rem;">
        ${amount.value} ${fromCurrency.value} = ${convertedAmount.value} ${toCurrency.value}
    </div> 
    <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 10px;">
      Taxa de conversão: 1 ${fromCurrency.value} = ${rate} ${toCurrency.value}
    </div>
    `
  } catch (err) {
    error.style.display = "block";
    error.innerHTML = ` Falha ao converter moeda.Tente novamente.  `
    
  }
  loading.style.display = "none";
  converterBtn.style.display = "inline-block";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  convertMoney();
});
