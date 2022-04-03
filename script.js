"use strict";
const box = document.querySelector(".box");
const malumot = document.querySelector(".malumot");
const findBtn = document.querySelector(".findBtn");
const inputCreate = document.querySelector(".inputCreate");
const search = document.querySelector(".search");
const select1 = document.querySelector(".select1");
const select = document.querySelector(".select");
const select2 = document.querySelector(".select2");
const convertBtn = document.querySelector(".convertBtn");
const sumInput2 = document.querySelector(".sumInput2");
const sumInput1 = document.querySelector(".sumInput1");

const getFetch = (pul) => {
  fetch(
    `https://v6.exchangerate-api.com/v6/a3f4e6e79601c90d29816ff1/latest/${pul}`
  )
    .then((response) => response.json())
    .then((data) => {
      renderFunc(data);
      selectedFun(data.conversion_rates);
    })
    .catch((err) => {
      box.innerHTML = `<h2 class="erorr">${err}  (Iltimos qayta urining)</h2> `;
      console.log(err);
    })
    .finally(() => {
      document.querySelector(".loading").style.opacity = "0";
      document.querySelector(".loading").style.display = "none";
    });
};
const renderFunc = (data) => {
  select.style.opacity = "1";
  malumot.innerHTML = "";
  box.innerHTML = "";
  let malumotHtml = `
  <div class="main">${data.base_code} uchun Valyutalar</div>
             <div class="time">Oxirgi ozgarish : ${
               data.time_last_update_utc.split("22")[0] + "22"
             }</div>`;
  malumot.insertAdjacentHTML("afterbegin", malumotHtml);
  let arr = data.conversion_rates;
  let r = Object.entries(arr);

  //   search.innerHTML = ` <input
  // class="inputCreate searchInput"
  // type="text"
  // placeholder="Search"
  // 🔍
  // />
  // <button class="searchBtn">Search</button>`;
  // let searchInput = document.querySelector(".searchInput");
  // let searchBtn = document.querySelector(".searchBtn");

  for (let [key, val] of r) {
    let html = `
     <div class="element">
    <div class="name">${key}</div>
      <div class="kurs">${val}</div>
    </div>
    <div class="draw"></div>`;
    box.insertAdjacentHTML("beforeend", html);
  }
  // function filterFunc() {
  //   searchBtn.addEventListener("click", () => {
  //     console.log("salom");
  //     let obj = Object.entries(data.conversion_rates);
  //     let d = obj.filter((val) => {
  //       let [key, ind] = val;
  //       return ind[0] == "UZS";
  //     });
  //     console.log(d);
  //   });
  // }
  // filterFunc();
};

findBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".loading").style.opacity = "1";
  document.querySelector(".loading").style.display = "flex";
  let sorov = inputCreate.value.toUpperCase();
  getFetch(sorov);
  inputCreate.value = "";
});
function selectedFun(data) {
  let a = 0;
  let b = 0;
  let sel2Val;
  let r = Object.entries(data);
  for (let [key, val] of r) {
    let opt1 = ` <option value="${val}">${key}</option>`;
    select1.insertAdjacentHTML("beforeend", opt1);
    a = val;
  }
  for (let [key, val] of r) {
    let opt2 = ` <option value="${val}">${key}</option>`;
    select2.insertAdjacentHTML("beforeend", opt2);
  }
  select2.addEventListener("change", () => {
    b = select2.value;
  });
  select1.addEventListener("change", () => {
    a = select2.value;
  });

  convertBtn.addEventListener("click", () => {
    sumInput2.value = a * Number(sumInput1.value) * b;
  });
}
