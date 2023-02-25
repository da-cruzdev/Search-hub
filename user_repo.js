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

async function getUserRepo() {
  const url = `https://api.github.com/users/${username}/repos`;

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

async function showUserRepo() {
  const userRepo = await getUserRepo();
  //   console.log(userRepo);

  userRepo.forEach((repo) => {
    console.log(repo);
    document.querySelector(".userRepo").innerHTML += createRepoBox(repo);
    if (repo.topics) {
      repo.topics.forEach((el) => {
        document
          .getElementById(`${repo.id}`)
          .querySelector(`.userRepo__tag`).innerHTML += repoTag(
          el.split("-")[0] || el
        );
      });
    }
  });

  //   document.querySelector(".userRepo").innerHTML = createRepoBox(userInfo);
}

showUserInfo();
showUserRepo();

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

function createRepoBox(repo) {
  return `
    <div class="userRepo__item" id="${repo.id}">
      <div class="userRepo__heading">
        <a href="repository_content.html?search=${search}&username=${
    repo.name
  }&repo=${repo.full_name}" class="userRepo__link"">${repo.name}
        </a>
           <img src="/img/Ellipse 210.png" alt="" class="userRepo__ellipse"/>
           <div class="userRepo__lang">${repo.language || ""}</div>
           <div class="userRepo__date">Updated on ${repo.updated_at}</div>
      </div>
      <div class="userRepo__description">${repo.description || ""}</div>
      <div class="userRepo__tag"></div>
      
    </div>`;
}
function repoTag(tag) {
  return `
    <div class="span">${tag}</div>
    `;
}
