const urlParams = new URLSearchParams(window.location.search);
const input = document.getElementById("input");

const search = urlParams.get("search");
const query = urlParams.get("repo");
console.log(query);

input.setAttribute("value", `${search}`);

async function getRepoContent() {
  const url = `https://api.github.com/repos/${query}/contents`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

async function showRepoContent() {
  const data = await getRepoContent();
  const row = document.querySelector(".row");
  const content = createContentGrid(data);
  row.appendChild(content);
  console.log(data);
}

showRepoContent();

function createContentGrid(repos) {
  console.log();
  const container = document.createElement("div");
  container.classList.add("repocontent");

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
}
