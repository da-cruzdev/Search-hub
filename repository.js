const reposJson = localStorage.getItem("repositories");
const repos = JSON.parse(reposJson);
const row = document.querySelector(".row");

console.log(repos);

const perPage = 5;
let currentPage = 1;

const repo = createRepoGrid(repos);
row.appendChild(repo);
console.log(repo);

function createRepoGrid(repos) {
  const container = document.createElement("div");
  container.classList.add("repos");

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

    const ellipse = document.createElement("img");
    ellipse.classList.add("repos__ellipse");
    ellipse.src = "img/Ellipse 210.png";
    image.alt = "";

    const date = document.createElement("p");
    date.classList.add("repos__date");
    date.textContent = "Updated on " + repo.updated_at;

    gridItem.appendChild(image);

    gridItem.appendChild(name);
    gridItem.appendChild(paragraph);
    gridItem.appendChild(ellipse);
    gridItem.appendChild(date);

    container.appendChild(gridItem);
  }
  return container;
}
