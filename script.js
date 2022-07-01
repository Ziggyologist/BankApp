const userLogin = document.querySelector(".login_name");
const passwordLogin = document.querySelector(".login_password");
const submitBtn = document.querySelector(".submit_btn");

const userGreet = document.querySelector(".user_greeting");
const curBalance = document.querySelector(".balance_total");

const displayBalance = function (acc) {
  const totalBalance = acc.transactions.reduce(
    (transaction, cur) => cur + transaction,
    0
  );
  curBalance.textContent = `${totalBalance}${acc.currency}`;
  console.log(
    `From display balance: ${acc.name}: ${totalBalance}${acc.currency}`
  );
};
const displayActivities = function (acc) {};
const displayTransactions = function (acc) {};

const updateUI = function (acc) {
  displayBalance(acc);
  displayActivities(acc);
  displayTransactions(acc);
};

// LOGIN IMPLEMENTATION
let currentAcc;
const login = function (e) {
  e.preventDefault();
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
  }

  console.log(userLogin.value, passwordLogin.value);
};

// Event handlers
submitBtn.addEventListener("click", login);
