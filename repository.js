let perPage = 1;
let currentPage = 5;

const accessToken = "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";

async function getGithubRepos(pageNumber, pageSize) {
  const urlParams = new URLSearchParams(window.location.search);
  const input = document.getElementById("input");

  const search = urlParams.get("search");

  input.setAttribute("value", `${search}`);
  const url = `https://api.github.com/search/repositories?q=${search}&page=${pageNumber}&per_page=${pageSize}&sort=stars&order=DESC`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

async function showGitHubReposTable(pageNumber, pageSize) {
  const data = await getGithubRepos(pageNumber, pageSize);
  console.log(data);
  const row = document.querySelector(".row");
  const repos = createRepoGrid(data.items, data.total_count);
  row.appendChild(repos);

  const paginationContainer = document.createElement("div");
  paginationContainer.classList.add("pagination");
  const previousButton = document.createElement("button");
  previousButton.innerText = "<";
  previousButton.disabled = pageNumber === 1;
  previousButton.addEventListener("click", () => {
    showGitHubReposTable(pageNumber - 1, pageSize);
  });
  paginationContainer.appendChild(previousButton);
  const pageNumberSpan = document.createElement("span");
  pageNumberSpan.innerText = ` ${pageNumber} `;
  paginationContainer.appendChild(pageNumberSpan);
  const nextButton = document.createElement("button");
  nextButton.innerText = ">";
  nextButton.disabled = data.length < pageSize;
  nextButton.addEventListener("click", () => {
    showGitHubReposTable(pageNumber + 1, pageSize);
  });
  paginationContainer.appendChild(nextButton);

  document.querySelector(".section-repos").appendChild(paginationContainer);
}

showGitHubReposTable(perPage, currentPage);

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
