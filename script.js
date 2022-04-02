"use strict";
const box = document.querySelector(".box");
const malumot = document.querySelector(".malumot");
const findBtn = document.querySelector(".findBtn");
const inputCreate = document.querySelector(".inputCreate");
const getFetch = (pul) => {
  fetch(
    `https://v6.exchangerate-api.com/v6/a3f4e6e79601c90d29816ff1/latest/${pul}`
  )
    .then((response) => response.json())
    .then((data) => {
      renderFunc(data);
    })
    .catch((err) => {
      box.innerHTML = `<h2 class="erorr">${err}  (Iltimos qayta urining)</h2> `;
    })
    .finally(() => {
      document.querySelector(".loading").style.opacity = "0";
      document.querySelector(".loading").style.display = "none";
    });
};
const renderFunc = (data) => {
  malumot.innerHTML = "";
  box.innerHTML = "";
  let malumotHtml = `<div class="main">${data.base_code} uchun Valyutalar</div>
             <div class="time">Oxirgi ozgarish : ${
               data.time_last_update_utc.split("22")[0] + "22"
             }</div>`;
  malumot.insertAdjacentHTML("afterbegin", malumotHtml);
  let arr = data.conversion_rates;
  let r = Object.entries(arr);
  for (let [key, val] of r) {
    let html = ` <div class="element">
    <div class="name">${key}</div>
      <div class="kurs">${val}</div>
    </div>
    <div class="draw"></div>`;
    box.insertAdjacentHTML("beforeend", html);
  }
};

findBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".loading").style.opacity = "1";
  document.querySelector(".loading").style.display = "flex";
  let sorov = inputCreate.value.toUpperCase();
  getFetch(sorov);
  inputCreate.value = "";
});
