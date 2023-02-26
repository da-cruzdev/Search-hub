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

async function getUserRepo(pageNumber, pageSize) {
  const url = `https://api.github.com/users/${username}/repos?page=${pageNumber}&per_page=${pageSize}`;

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

function createPaginationButtons(currentPage, totalPages, onPageChange) {
  window.history.pushState({}, null, `?search=${search}&page=${currentPage}`);

  const paginationContainer = document.createElement("div");
  paginationContainer.classList.add("pagination__btn");

  const firstPage = Math.max(1, currentPage - 5);
  const lastPage = Math.min(totalPages, firstPage + 9);

  const previousButton = document.createElement("button");
  previousButton.innerText = "<";
  previousButton.disabled = currentPage === 1;
  previousButton.classList.add("previous-button");
  previousButton.addEventListener("click", () => {
    onPageChange(currentPage - 1);
  });
  paginationContainer.appendChild(previousButton);

  for (let i = firstPage; i <= lastPage; i++) {
    const pageNumberButton = document.createElement("button");
    pageNumberButton.innerText = i.toString();
    pageNumberButton.classList.add("page-number-button");
    pageNumberButton.disabled = i === currentPage;
    pageNumberButton.setAttribute("data-page-number", i.toString());
    pageNumberButton.addEventListener("click", (event) => {
      const pageNumber = parseInt(
        event.target.getAttribute("data-page-number"),
        10
      );
      onPageChange(pageNumber);
    });
    paginationContainer.appendChild(pageNumberButton);
  }

  const nextButton = document.createElement("button");
  nextButton.innerText = ">";
  nextButton.disabled = currentPage === totalPages;
  nextButton.classList.add("next-button");
  nextButton.addEventListener("click", () => {
    onPageChange(currentPage + 1);
  });
  paginationContainer.appendChild(nextButton);

  return paginationContainer;
}

async function showUserRepo() {
  const userRepo = await getUserRepo(currentPage, perPage);
  const totalRepo = userRepo.length;

  document.querySelector(".userRepo").innerHTML = "";

  userRepo.forEach((repo) => {
    document
      .querySelector(".userRepo")
      .insertAdjacentHTML("beforeend", createRepoBox(repo));

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

  const totalPages = Math.ceil(totalRepo / perPage);
  const paginationContainer = createPaginationButtons(
    currentPage,
    totalPages,
    onPageChange
  );
  const existingPaginationContainer =
    document.querySelector(".pagination__btn");
  if (existingPaginationContainer) {
    existingPaginationContainer.replaceWith(paginationContainer);
  } else {
    document
      .querySelector(".userRepo-section")
      .appendChild(paginationContainer);
  }

  //   document.querySelector(".userRepo").innerHTML = createRepoBox(userInfo);
}

const perPageInput = document.getElementById("per-page");
perPageInput.addEventListener("change", () => {
  const newPerPage = parseInt(perPageInput.value, 10);
  if (!isNaN(newPerPage) && newPerPage >= 5) {
    perPage = newPerPage;
    currentPage = 1;
    showUserRepo();
  }
});

showUserInfo();
showUserRepo();

function onPageChange(pageNumber) {
  currentPage = pageNumber;
  showUserRepo();
  // window.location.reload();
}

function repoDiv() {
  return `<div class="repoNameDiv">
    <img src="/img/_OBJECTS.png" alt="" />
    <div class="repo">Repositories</div>
  </div>
  `;
}

document.querySelector(".userRepoName").innerHTML = repoDiv();

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
