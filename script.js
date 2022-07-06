const userLogin = document.querySelector(".login_name");
const passwordLogin = document.querySelector(".login_password");
const submitBtn = document.querySelector(".submit_btn");

const userGreet = document.querySelector(".user_greeting");
const greetingPhrase = document.querySelector(".greeting p");
const curBalance = document.querySelector(".balance_total");
const todayDate = document.querySelector(".today_date");
const displayDeposits = document.querySelector(".deposits_total");
const displayWithdrawals = document.querySelector(".withdrawals_total");
const transactionArea = document.querySelector(".transactions");
const UIheader = document.querySelector(".balance");
const UIheader2 = document.querySelector(".info_balance");
const UImain = document.querySelector("main");

const sortBtn = document.querySelector(".sort button");
const timer = document.querySelector(".timer_rundown");

// EMPTY FIELDS
greetingPhrase.classList.add("hidden");
const emptyFields = function () {
  transactionArea.innerHTML = "";
  curBalance.textContent = "0";
  userGreet.textContent = "User";
};

// LOG OUT
let logoutBtn;
const HTMLbtn = `<button class="logout_btn">Log out</button>`;
document.querySelector(".login").insertAdjacentHTML("beforeend", HTMLbtn);
document.querySelector(".logout_btn").classList.add("hidden");
logoutBtn = document.querySelector(".logout_btn");

const displayLogoutBtn = function (acc) {
  if (currentAcc) {
    document.querySelector(".login_form").classList.add("hidden");
    logoutBtn.classList.remove("hidden");
    // logoutBtn = document.querySelector(".logout_btn");
  } else {
    document.querySelector(".logout_btn").classList.add("hidden");
    document.querySelector(".login_form").style.opacity = "0";
  }
};
const logout = function (e) {
  e.preventDefault();
  document.querySelector(".logout_btn").classList.add("hidden");
  document.querySelector(".login_form").style.opacity = "100";
  currentAcc = 0;
  console.log(currentAcc);
  greetingPhrase.classList.add("hidden");
  transactionArea.classList.add("hidden");
  UIheader.classList.add("hidden");
  UIheader2.classList.add("hidden");
  UImain.classList.add("hidden");
};

logoutBtn?.addEventListener("click", logout);

// --FORMAT DATES--
const formatTransactionDate = function (date) {
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = `${date.getFullYear()}`;
  return `${day}/${month}/${year}`;
};

// SET TIMEOUT
let timerX;
const startLogoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    timer.innerHTML = `${min}:${sec}`;

    if (time === 0) {
      setTimeout(function () {
        greetingPhrase.innerHTML = "Please log in to get started";
        timer.innerHTML = `00:00`;
        document.querySelector(".logout_btn").classList.add("hidden");
        document.querySelector(".login_form").style.opacity = "100";
        currentAcc = 0;
        greetingPhrase.classList.add("transAnimation");
        greetingPhrase.classList.add("hidden");
        transactionArea.classList.add("transAnimation");
        transactionArea.classList.add("hidden");
        UIheader.classList.add("transAnimation");
        UIheader.classList.add("hidden");
        UIheader2.classList.add("transAnimation");
        UIheader2.classList.add("hidden");
        UImain.classList.add("transAnimation");
        UImain.classList.add("hidden");
        userLogin.value = "";
        passwordLogin.value = "";
        clearInterval(timerX);
        console.log(currentAcc);
      }, 1000);
    }
    time--;
  };
  let time = 60;
  tick();
  const timerX = setInterval(tick, 1000);
  return timerX;
};

// ---DISPLAY BALANCE---
const displayBalance = function (acc) {
  const totalBalance = acc.transactions.reduce(
    (transaction, cur) => cur + transaction,
    0
  );
  curBalance.textContent = `${totalBalance}${acc.currency}`;
  const totalDeposits = acc.transactions
    .filter(transaction => transaction > 0)
    .reduce((transaction, cur) => cur + transaction, 0);
  displayDeposits.textContent = `${totalDeposits}${acc.currency}`;
  const totalWithdrawals = acc.transactions
    .filter(t => t < 0)
    .reduce((t, cur) => cur + t, 0);
  displayWithdrawals.textContent = `${Math.abs(totalWithdrawals)}${
    acc.currency
  }`;
  if (totalDeposits < Math.abs(totalWithdrawals)) {
    displayWithdrawals.textContent = `${Math.abs(totalWithdrawals)}${
      acc.currency
    }  ❗`;
  }
  const today = new Date();
  const day = today.getDay();
  const dateDay = today.getDate();
  const month = today.toLocaleString("default", {
    month: "long",
  });
  // const [hours, minutes] = [today.getHours(), today.getMinutes()];
  const hours = `${today.getHours()}`.padStart(2, 0);
  const minutes = `${today.getMinutes()}`.padStart(2, 0);

  const formatDate = function (dayX) {
    const week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return week[dayX];
  };
  todayDate.innerHTML = `${formatDate(
    day
  )}, ${month} ${dateDay}, ${hours}:${minutes} `;
};

// --DISPLAY ACTIVITIES---

const displayActivities = function (acc) {};

const displayTransactions = function (acc, sort = false) {
  transactionArea.innerHTML = "";
  const sorted = sort
    ? acc.transactions.slice().sort((a, b) => a - b)
    : acc.transactions;

  sorted.forEach((transaction, i) => {
    const transactionType = transaction >= 0 ? "deposit" : "widthdrawal";
    const date = new Date(acc.transactionDate[i]);
    const displayDate = formatTransactionDate(date);
    const HTMLrow = `<div class="transaction_row">
          <div class="transaction_type ${transactionType}_style">${transactionType}</div>
          <div class="transaction_date"> ${displayDate} </div>
          <div class="transaction_amount">${transaction.toFixed(2)} ${
      acc.currency
    }</div>
        </div>`;
    transactionArea.insertAdjacentHTML("afterbegin", HTMLrow);
  });
  greetingPhrase?.classList.remove("hidden");
  transactionArea?.classList.remove("hidden");
  UIheader?.classList.remove("hidden");
  UIheader2?.classList.remove("hidden");
  UImain?.classList.remove("hidden");
};

// ---DISPLAY DATE---
const displayDate = function () {
  console.log("date is");
};
// __________________________

const updateUI = function (acc) {
  displayBalance(acc);
  displayActivities(acc);
  displayTransactions(acc);
  displayLogoutBtn(acc);
  displayDate();
};

// LOGIN IMPLEMENTATION
let currentAcc;
const login = function (e) {
  e.preventDefault();
  emptyFields();
  greetingPhrase.classList.remove("hidden");
  const accUsernames = accounts.flatMap(acc => acc.username.toLowerCase());
  const accPasswords = accounts.flatMap(acc => acc.password.toLowerCase());
  currentAcc = accounts.find(
    acc => acc.username === userLogin.value.toLowerCase()
  );
  if (currentAcc?.password === passwordLogin.value) {
    userGreet.textContent = `${currentAcc.name}`;
    console.log(`The current account is: ${currentAcc.username}`);
    updateUI(currentAcc);
  } else {
    alert("The username or password you entered is invalid");
    greetingPhrase.classList.add("hidden");
  }
  document.querySelector(".logout_btn").classList.remove("hidden");
  document.querySelector(".login_form").style.opacity = "0";
  console.log(userLogin.value, passwordLogin.value);
  if (timerX) clearInterval(timerX);
  timerX = startLogoutTimer();
};

// Event handlers
submitBtn.addEventListener("click", login);

//
let sorted = false;
sortBtn.addEventListener("click", function (e) {
  e.preventDefault();
  displayTransactions(currentAcc, !sorted);
  sorted = !sorted;
  if (timerX) clearInterval(timerX);
  timerX = startLogoutTimer();
});
