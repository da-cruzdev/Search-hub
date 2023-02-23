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

const row = document.querySelector(".repos");

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
  let content = "";

  repos.forEach((repo) => {
    console.log(repo);
    content += `
      <div class="repos__item">
        <img src="./img/_OBJECTS.png" alt="" class="repos__img">
        <a href="http://127.0.0.1:5500/repository_content.html?search=${search}&username=${
      repo.full_name.split("/")[0]
    }&repo=${repo.full_name}" class="repos__link"><h3 class="repos__name">${
      repo.full_name
    }</h3></a>
        <p class="repos__description">${repo.description}</p>
        <div class="repos__tag"></div>
        <img src="./img/Ellipse 210.png" alt="" class="repos__ellipse">
        <p class="repos__date">${repo.language} ${repo.license}  Updated on ${
      repo.updated_at
    }</p>
      </div>
    `;
  });
  document.querySelector(".repos").innerHTML = content;

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

function createRepoGrid(repos, total_count) {
  console.log(total_count);
  const container = document.createElement("div");
  container.classList.add("repos");
  const totalRepo = document.createElement("p");
  totalRepo.classList.add("repos__count");
  totalRepo.innerText = total_count + " repository results";
  container.appendChild(totalRepo);

  for (const repo of repos) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("repos__item");

    const image = document.createElement("img");
    image.classList.add("repos__img");
    image.src = "img/_OBJECTS.png";
    image.alt = "";

    const name = document.createElement("h3");
    name.classList.add("repos__name");
    name.textContent = repo.full_name;

    const paragraph = document.createElement("p");
    paragraph.classList.add("repos__description");
    paragraph.textContent = repo.description;

    const tag = document.createElement("div");
    tag.classList.add("repos__tag");
    const tags = repo.topics;
    for (var i = 0; i < tags.length; i++) {
      var span = document.createElement("span");
      span.textContent = tags[i];

      tag.appendChild(span);
    }

    const ellipse = document.createElement("img");
    ellipse.classList.add("repos__ellipse");
    ellipse.src = "img/Ellipse 210.png";
    image.alt = "";

    const date = document.createElement("p");
    date.classList.add("repos__date");
    date.textContent = repo.language + " Updated on " + repo.updated_at;

    gridItem.appendChild(image);

    gridItem.appendChild(name);
    gridItem.appendChild(paragraph);
    gridItem.appendChild(tag);
    gridItem.appendChild(ellipse);
    gridItem.appendChild(date);

    container.appendChild(gridItem);
  }
  return container;
}
