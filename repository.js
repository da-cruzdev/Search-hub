const perPage = 50;
let currentPage = 1;

const accessToken = "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";

function getRepos() {
  const urlParams = new URLSearchParams(window.location.search);
  const input = document.getElementById("input");

  const search = urlParams.get("search");

  input.setAttribute("value", `${search}`);
  let url = `https://api.github.com/search/repositories?q=${search}
  }`;

  fetch(url, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const row = document.querySelector(".row");
      const repos = createRepoGrid(data.items);
      row.appendChild(repos);

      console.log(data);
      const totalCount = parseInt(
        res.headers.get("link").match(/page=(\d+)>; rel="last"/)[1]
      );
      const pagination = document.createElement("ul");
      for (let i = 1; i <= totalCount; i++) {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = "#";
        link.innerText = i;
        if (i === currentPage) {
          link.className = "active";
        }
        link.addEventListener("click", (e) => {
          e.preventDefault();
          currentPage = i;
          getRepos(currentPage);
        });
        li.appendChild(link);
        pagination.appendChild(li);
        console.log(pagination);
      }
      document.querySelector(".row").appendChild(pagination);
    })
    .catch((e) => {
      console.log(e);
    });
}
getRepos();

function createRepoGrid(repos) {
  const container = document.createElement("div");
  container.classList.add("repos");
  container.textContent = repos.totalCount;

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
