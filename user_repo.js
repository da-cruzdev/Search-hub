let currentPage = 1;
let perPage = 10;

const urlParams = new URLSearchParams(window.location.search);
const input = document.getElementById("input");

const search = urlParams.get("search");
let username = urlParams.get("username");
console.log(search);

input.setAttribute("value", `${search}`);

async function getUserInfo() {
  const url = `https://api.github.com/users/${username}`;

  const response = await fetch(url);
  const data = await response.json();
  //   console.log(data);
  return data;
}

async function showUserInfo() {
  const userInfo = await getUserInfo();
  console.log(userInfo);

  document.querySelector(".userInfo").innerHTML = userInfoBox(userInfo);
}

showUserInfo();

function userInfoBox(user) {
  return ` 
  <div class="userInfo__img">
    <img src="https://avatars.githubusercontent.com/${
      user.name
    }" alt="" class="img">
    <img src="/img/reddit.png" alt="" class="reddit">
</div>
<div class="userInfo__name">
<div class="name">${user.name}</div>
<div class="login">${user.login}</div>
</div>
<div class="userInfo__bio">${user.bio || ""}</div>`;
}
