let currentPage = 1;
let perPage = 10;

const urlParams = new URLSearchParams(window.location.search);
const input = document.getElementById("input");

const search = urlParams.get("search");
console.log(urlParams);

input.setAttribute("value", `${search}`);

async function getGithubRepos(pageNumber, pageSize) {
  const url = `https://api.github.com/search/repositories?q=${search}&page=${pageNumber}&per_page=${pageSize}&sort=stars&order=DESC`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
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

async function showGitHubReposTable() {
  const data = await getGithubRepos(currentPage, perPage);
  console.log(data);

  const repos = data.items;
  document.querySelector(
    ".repos__count"
  ).innerHTML = `${data.total_count} repositories results`;

  repos.forEach((repo) => {
    console.log(repo);
    document.querySelector(".repos").innerHTML += createRepoGrid(repo);
    if (repo.topics) {
      repo.topics.forEach((el) => {
        document
          .getElementById(`${repo.id}`)
          .querySelector(`.repos__tag`).innerHTML += repoTag(el);
      });
    }

    // console.log(document.getElementById(`${repo.id}`));
  });
  //  = content;

  const totalPages = Math.ceil(data.total_count / perPage);
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
    document.querySelector(".section-repos").appendChild(paginationContainer);
  }
}

const perPageInput = document.getElementById("per-page");
perPageInput.addEventListener("change", () => {
  const newPerPage = parseInt(perPageInput.value, 10);
  if (!isNaN(newPerPage) && newPerPage >= 5) {
    perPage = newPerPage;
    currentPage = 1;
    showGitHubReposTable();
  }
});
showGitHubReposTable();

function onPageChange(pageNumber) {
  currentPage = pageNumber;
  showGitHubReposTable();
}

function createRepoGrid(repo) {
  return `
  <div class="repos__item" id="${repo.id}">
    <div class="repos__heading">
      <img src="/img/_OBJECTS.png" alt="" class="repos__img" />
      <a href="repository_content.html?search=${search}&username=${
    repo.full_name.split("/")[0]
  }&repo=${repo.full_name}" class="repos__link"">${repo.full_name}</a>
    </div>
    <div class="repos__description">${repo.description || ""}</div>
    <div class="repos__tag"></div>
    <div class="repos__info">
     <img src="/img/Ellipse 210.png" alt="" class="repos__ellipse"/>
     <div class="repos__lang">${repo.language || ""}</div>
     <div class="repos__license">${repo.license.name || ""}</div>
     <div class="repos__date">Updated on ${repo.updated_at}</div>
    </div>
  </div>`;
}

function repoTag(tag) {
  return `
  <div class="tag">${tag}</div>
  `;
}
