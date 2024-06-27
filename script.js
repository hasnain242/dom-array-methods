const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const filterBtn = document.getElementById("show-millionairs");
const sortBtn = document.getElementById("sort");
const sumBtn = document.getElementById("sum");

let data = [];

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.title} ${user.name.first} ${user.name.last}`,
    balance: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

function doubleMoney() {
  data = data.map(user => {
    return { ...user, balance: user.balance * 2 };
  });
  updateDOM();
}

function filterUsers() {
  data = data.filter(user => user.balance > 1000000);
  updateDOM();
}

function sortByBalance() {
  data.sort((a, b) => b.balance - a.balance);
  updateDOM();
}

function addData(newUser) {
  data.push(newUser);
  updateDOM();
}

function totalBalance() {
  updateDOM()
  const balance = data.reduce((acc, user) => (acc += user.balance), 0);
  const balanceElement = document.createElement('div');
  balanceElement.innerHTML = `<h3>Total Balance: ${formatNumberToDollar(balance)}</h3>`;
  main.appendChild(balanceElement);
  
}

function formatNumberToDollar(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

function updateDOM(userData = data) {
  main.innerHTML = "<h2><strong>User</strong> Wealth</h2>";
  userData.forEach(user => {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user");
    userDiv.innerHTML = `<strong>${user.name}</strong> ${formatNumberToDollar(user.balance)}`;
    main.appendChild(userDiv);
  });
}

// Event Listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
filterBtn.addEventListener("click", filterUsers);
sortBtn.addEventListener("click", sortByBalance);
sumBtn.addEventListener("click", totalBalance);

