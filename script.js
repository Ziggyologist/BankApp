const userLogin = document.querySelector(".login_name");
const passwordLogin = document.querySelector(".login_password");
const submitBtn = document.querySelector(".submit_btn");

const userGreet = document.querySelector(".user_greeting");
const greetingPhrase = document.querySelector(".greeting p");
const curBalance = document.querySelector(".balance_total");
const displayDeposits = document.querySelector(".deposits_total");
const displayWithdrawals = document.querySelector(".withdrawals_total");
const transactionArea = document.querySelector(".transactions");
const UIheader = document.querySelector(".balance");
const UIheader2 = document.querySelector(".info_balance");
const UImain = document.querySelector("main");

// EMPTY FIELDS
greetingPhrase.classList.add("hidden");
const emptyFields = function () {
  transactionArea.innerHTML = "";
  curBalance.textContent = "0";
  userGreet.textContent = "User";
};

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
};

const displayActivities = function (acc) {};

const displayTransactions = function (acc) {
  acc.transactions.forEach(transaction => {
    const transactionType = transaction >= 0 ? "deposit" : "widthdrawal";
    const HTMLrow = `<div class="transaction_row">
          <div class="transaction_type ${transactionType}_style">${transactionType}</div>
          <div class="transaction_amount">${transaction} ${acc.currency}</div>
        </div>`;
    transactionArea.insertAdjacentHTML("afterbegin", HTMLrow);
  });
  greetingPhrase?.classList.remove("hidden");
  transactionArea?.classList.remove("hidden");
  UIheader?.classList.remove("hidden");
  UIheader2?.classList.remove("hidden");
  UImain?.classList.remove("hidden");
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
logoutBtn?.addEventListener("click", function (e) {
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
});

// __________________________

const updateUI = function (acc) {
  displayBalance(acc);
  displayActivities(acc);
  displayTransactions(acc);
  displayLogoutBtn(acc);
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
};

// Event handlers
submitBtn.addEventListener("click", login);
