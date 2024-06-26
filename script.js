const main = document.getElementById("main");
const adduserbtn = document.getElementById("ad-user");
const doublebtn = document.getElementById("double");
const filterbtn = document.getElementById("filter-millionairs");
const sortbtn = document.getElementById("sort");
const sumbtn = document.getElementById("sum");

let data = [];

async function getrandomuser() {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();
  const user = data.results[0];
  console.log(user);
  const newuser = {
    name: `${user.name.title}${user.name.first} ${user.name.last}`,
    balance: Math.floor(Math.random() * 100000),
  };

  adddata(newuser);
}
function doublemoney() {
  data = data.map((user) => {
    return { ...user, balance: user.balance * 2 };
  });
  updatedom();
}

function filterusers(){
    data.filter()
}
function adddata(newuser) {
  data.push(newuser);
  updatedom();
}

function formatnumbertodollar(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
function updatedom(userdata = data) {
  main.innerHTML = "<h2><strong>user</strong>wealth</h2>";
  userdata.forEach((user) => {
    const userdiv = document.createElement("div");
    userdiv.classList.add("user");
    userdiv.innerHTML = `<strong>${user.name}</strong>${formatnumbertodollar(
      user.balance
    )}`;
    main.appendChild(userdiv);
  });
}

adduserbtn.addEventListener("click", getrandomuser);
doublebtn.addEventListener("click", doublemoney);
filterbtn.addEventListener('click',filterusers)
