const urlParams = new URLSearchParams(window.location.search);
const input = document.getElementById("input");

function validateForm() {
  var searchField = input.value;
  if (searchField === "") {
    alert("Veuillez entrer un terme de recherche");
    return false;
  } else if (searchField.includes("   ")) {
    alert("Veuillez supprimer les espaces");
    return false;
  } else if (searchField.length > 50) {
    alert("Le terme de recherche ne doit pas dépasser 50 caractères");
    return false;
  } else {
    return true;
  }
}

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  if (validateForm()) {
    this.submit();
  }
});

const search = urlParams.get("search");
const repo = urlParams.get("repo");
const username = urlParams.get("username");

input.setAttribute("value", `${search}`);

async function getUserRepo() {
  const url = `https://api.github.com/users/${username}/repos`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  document.querySelector(".content__user").innerHTML = userRepoName(data);
  return data;
}
getUserRepo();

async function getRepoContent() {
  const url = `https://api.github.com/repos/${repo}/contents`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
}

async function showRepoContent() {
  const loader = document.querySelector(".containAll");
  loader.style.display = "flex";

  try {
    const data = await getRepoContent();

    loader.style.display = "none";

    filterFiles(data);

    data.forEach((el) => {
      document.querySelector(".content__file").innerHTML +=
        hr() + fileBox(el.name, el.type, el.size);
    });
  } catch (error) {
    document.querySelector(".content__file").innerHTML += hr() + emptyRepo();
  }
}

showRepoContent();

function userRepoName(data) {
  return `
  <div class="userNameRepo">
  <img src="../../img/_OBJECTS.png" alt="">
  <div class="repoName"><a href="../user_repo/user_repo.html?username=${username}&search=${search}">${username}</a>/${
    repo.split("/")[1]
  }</div>
  <div class="public">${data.language || "public"}</div>
</div>`;
}

function userBox() {
  return `<div class="userBox">
  <img src="https://avatars.githubusercontent.com/${username}" alt="" />
  <a href="../user_repo/user_repo.html?username=${username}&search=${search}">${username}</a>
</div>`;
}
document.querySelector(".content__file").innerHTML = userBox();

function emptyRepo() {
  return `<div class="userBox box-empty"><div>This repository is empty.</div></div>`;
}

function fileBox(name, type, size) {
  let fileType = type == "file" ? "file.png" : "folder.png";
  let fileSize = "";
  if (size != 0) {
    fileSize = formatSize(size);
  }

  let folderClass = type == "dir" ? "folder" : "";
  let fileClass = type == "file" ? "file" : "";
  return `
  <div class="iconName ">
  <img src="/img/${fileType}" class="${folderClass} ${fileClass}" alt="" />
  <div class="fileName">${name}</div>
  <div class="size">${fileSize}</div>
</div>
`;
}

function filterFiles(data) {
  return data.sort((a, b) => {
    if (a.type === b.type) {
      return a.name.localeCompare(b.name);
    } else if (a.type === "dir") {
      return -1;
    } else {
      return 1;
    }
  });
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
