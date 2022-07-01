const userLogin = document.querySelector(".login_name");
const passwordLogin = document.querySelector(".login_password");
const submitBtn = document.querySelector(".submit_btn");

const userGreet = document.querySelector(".user_greeting");
const greetingPhrase = document.querySelector(".greeting p");
const curBalance = document.querySelector(".balance_total");
const displayDeposits = document.querySelector(".deposits_total");
const displayWithdrawals = document.querySelector(".withdrawals_total");
const transactionArea = document.querySelector(".transactions");

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
};

const updateUI = function (acc) {
  displayBalance(acc);
  displayActivities(acc);
  displayTransactions(acc);
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

  console.log(userLogin.value, passwordLogin.value);
};

// Event handlers
submitBtn.addEventListener("click", login);
