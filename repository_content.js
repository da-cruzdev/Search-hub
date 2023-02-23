const urlParams = new URLSearchParams(window.location.search);
const input = document.getElementById("input");

const search = urlParams.get("search");
const repo = urlParams.get("repo");
const username = urlParams.get("username");
console.log(username);

input.setAttribute("value", `${search}`);

async function getRepoContent() {
  const url = `https://api.github.com/repos/${repo}/contents`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

async function showRepoContent() {
  const data = await getRepoContent();

  data.forEach((el) => {
    document.querySelector(".content__file").innerHTML +=
      hr() + fileBox(el.name, el.type, el.size);
  });
}

showRepoContent();

/*function createContentGrid(repos) {
const page = console.log();
const container = document.createElement("div");
container.classList.add("repocontent");
const user = document.createElement("div");
user.classList.add("user__info");
const image = document.createElement("img");
image.classList.add("user__img");
image.src = `https://avatars.githubusercontent.com/${username};`;
const name = document.createElement("a");
name.classList.add("user__name");
name.href = `https://api.github.com/users/${username}/repos`;
name.textContent = `${username}`;
user.appendChild(image);
user.appendChild(name);
container.prepend(user);

for (const repo of repos) {
  const gridItem = document.createElement("div");
  gridItem.classList.add("repocontent__item");

  if (repo.type === "dir") {
    const image = document.createElement("img");
    image.classList.add("repocontent__img");
    image.src = "img/folder.png";
    image.alt = "";
    gridItem.appendChild(image);
  } else {
    const image = document.createElement("img");
    image.classList.add("repocontent__img--file");
    image.src = "img/Vector.png";
    image.alt = "";
    gridItem.appendChild(image);
  }

  const name = document.createElement("h5");
  name.classList.add("repocontent__name");
  name.textContent = repo.name;

  gridItem.appendChild(name);

  const size = document.createElement("p");
  size.classList.add("repocontent__size");
  size.textContent = repo.size;
  gridItem.appendChild(size);

  container.appendChild(gridItem);
}
return container;
}*/

function userRepoName() {
  return `
  <div class="userNameRepo">
  <img src="/img/_OBJECTS.png" alt="">
  <div class="repoName"><a href="">${username}</a>/${repo}</div>
  <div class="public">public</div>
</div>`;
}
document.querySelector(".content__user").innerHTML = userRepoName();

function userBox() {
  return `<div class="userBox">
  <img src="https://avatars.githubusercontent.com/${username}" alt="" />
  <a href="">${username}</a>
</div>`;
}
document.querySelector(".content__file").innerHTML = userBox();

function fileBox(name, type, size) {
  let fileType = type == "file" ? "file.png" : "folder.png";
  let fileSize = "";
  if (size != 0) {
    fileSize = formatSize(size);
  }
  return `
  <div class="iconName">
  <img src="/img/${fileType}" alt="" />
  <div class="fileName">${name}</div>
</div>
<div class="size">${fileSize}</div>`;
}

function formatSize(sizeInBytes) {
  const units = ["octets", "ko", "Mo", "Go"];
  let size = sizeInBytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${Math.round(size * 100) / 100} ${units[unitIndex]}`;
}
function hr() {
  return `<hr class="separator">`;
}
