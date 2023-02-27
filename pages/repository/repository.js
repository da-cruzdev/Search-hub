// let currentPage = 1;
// let perPage = 10;

// const urlParams = new URLSearchParams(window.location.search);
// const input = document.getElementById("input");

// const search = urlParams.get("search");
// console.log(urlParams);

// input.setAttribute("value", `${search}`);

// async function getGithubRepos(pageNumber, pageSize) {
//   const url = `https://api.github.com/search/repositories?q=${search}&page=${pageNumber}&per_page=${pageSize}&sort=stars&order=DESC`;

//   const response = await fetch(url);
//   const data = await response.json();
//   console.log(data);
//   return data;
// }

// function createPaginationButtons(currentPage, totalPages, onPageChange) {
//   window.history.pushState({}, null, `?search=${search}&page=${currentPage}`);

//   // const paginationContainer = document.querySelector(".pagination");
//   // // console.log(paginationContainer);

//   const paginationButton = document.createElement("div");
//   paginationButton.classList.add("pagination__btn");

//   // paginationContainer.prepend(paginationButton);

//   const firstPage = Math.max(1, currentPage - 5);
//   const lastPage = Math.min(totalPages, firstPage + 9);

//   const previousButton = document.createElement("button");
//   previousButton.innerText = "<";
//   previousButton.disabled = currentPage === 1;
//   previousButton.classList.add("previous-button");
//   previousButton.addEventListener("click", () => {
//     onPageChange(currentPage - 1);
//   });
//   paginationButton.appendChild(previousButton);

//   for (let i = firstPage; i <= lastPage; i++) {
//     const pageNumberButton = document.createElement("button");
//     pageNumberButton.innerText = i.toString();
//     pageNumberButton.classList.add("page-number-button");
//     pageNumberButton.disabled = i === currentPage;
//     pageNumberButton.setAttribute("data-page-number", i.toString());
//     pageNumberButton.addEventListener("click", (event) => {
//       const pageNumber = parseInt(
//         event.target.getAttribute("data-page-number"),
//         10
//       );
//       onPageChange(pageNumber);
//     });
//     paginationButton.appendChild(pageNumberButton);
//   }

//   const nextButton = document.createElement("button");
//   nextButton.innerText = ">";
//   nextButton.disabled = currentPage === totalPages;
//   nextButton.classList.add("next-button");
//   nextButton.addEventListener("click", () => {
//     onPageChange(currentPage + 1);
//   });

//   paginationButton.appendChild(nextButton);

//   return paginationButton;
// }

// async function showGitHubReposTable() {
//   const loadingMessage = document.getElementById("loading-message");
//   loadingMessage.style.display = "flex";

//   try {
//     const data = await getGithubRepos(currentPage, perPage);
//     console.log(data);

//     loadingMessage.style.display = "none";

//     if (data.total_count == undefined) {
//       document.querySelector(
//         ".repos__count"
//       ).innerHTML = `No repositories found.`;
//     } else {
//       document.querySelector(
//         ".repos__count"
//       ).innerHTML = `${data.total_count} repositories results`;
//     }

//     const repos = data.items;

//     repos.forEach((repo) => {
//       console.log(repo);
//       document.querySelector(".repos").innerHTML += createRepoGrid(repo);
//       if (repo.topics) {
//         repo.topics.forEach((el) => {
//           document
//             .getElementById(`${repo.id}`)
//             .querySelector(`.repos__tag`).innerHTML += repoTag(el);
//         });
//       }
//     });

//     const totalPages = Math.ceil(data.total_count / perPage);
//     const paginationContainer = createPaginationButtons(
//       currentPage,
//       totalPages,
//       onPageChange
//     );
//     console.log(paginationContainer);
//     const existingPaginationContainer =
//       document.querySelector(".pagination__btn");
//     console.log(existingPaginationContainer);
//     if (existingPaginationContainer) {
//       existingPaginationContainer.replaceWith(paginationContainer);
//     } else {
//       document.querySelector(".pagination").appendChild(paginationContainer);
//     }
//   } catch (error) {
//     // console.log(error.message);
//     if (error.message == "Failed to fetch") {
//        document.querySelector(".repos__count").innerHTML = "";
//       loadingMessage.innerHTML =
//         "Please check your internet connection and try again.";
//     }
//   }
// }

// const perPageInput = document.getElementById("per-page");
// perPageInput.addEventListener("change", () => {
//   const newPerPage = parseInt(perPageInput.value, 10);
//   if (!isNaN(newPerPage) && newPerPage >= 5) {
//     perPage = newPerPage;
//     currentPage = 1;
//     showGitHubReposTable();
//   }
// });
// showGitHubReposTable();

// function onPageChange(pageNumber) {
//   currentPage = pageNumber;
//   showGitHubReposTable();
// }

// function createRepoGrid(repo) {
//   // console.log(repo.license.name);
//   return `
//   <div class="repos__item" id="${repo.id}">
//     <div class="repos__heading">
//       <img src="/img/_OBJECTS.png" alt="" class="repos__img" />
//       <a href="repository_content.html?search=${search}&username=${
//     repo.full_name.split("/")[0]
//   }&repo=${repo.full_name}" class="repos__link"">${repo.full_name}</a>
//     </div>
//     <div class="repos__description">${repo.description || ""}</div>
//     <div class="repos__tag"></div>
//     <div class="repos__info">
//      <img src="/img/Ellipse 210.png" alt="" class="repos__ellipse"/>
//      <div class="repos__lang">${repo.language || ""}</div>
//      <div class="repos__license">${repo.license ? repo.license.name : ""}</div>
//      <div class="repos__date">Updated on ${repo.updated_at}</div>
//     </div>
//   </div>`;
// }

// function repoTag(tag) {
//   return `
//   <div class="span">${tag}</div>
//   `;
// }

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
  const loader = document.querySelector(".containAll");
  loader.style.display = "flex";

  try {
    const data = await getGithubRepos(currentPage, perPage);
    console.log(data);

    loader.style.display = "none";

    const repos = data.items;
    if (data.total_count !== undefined || 0) {
      document.querySelector(
        ".repos__count"
      ).innerHTML = `${data.total_count} repositories results`;
    } else {
      document.querySelector(".errorDiv").textContent =
        "Sorry, No repository found.";
    }

    // Clear existing content
    document.querySelector(".repos").innerHTML = "";

    // Add repos to the list using insertAdjacentHTML
    repos.forEach((repo) => {
      console.log(repo);
      document
        .querySelector(".repos")
        .insertAdjacentHTML("beforeend", createRepoGrid(repo));
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
  } catch (error) {
    if (error.message == "Failed to fetch") {
      loader.style.display = "none";
      document.querySelector(".errorDiv").textContent =
        "Please check your internet connection and try again.";
      document.getElementById("per-page").style.display = "none";
      document.querySelector(".msg__btn").style.display = "flex";
    } else if (error) {
      document.querySelector(".errorDiv").textContent =
        "Sorry, No repository found.";
      document.getElementById("per-page").style.display = "none";
    }
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
  // window.location.reload();
}

function formatDate(date) {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Intl.DateTimeFormat("fr-FR", options).format(date);
}

function createRepoGrid(repo) {
  // console.log(repo.license.name);
  return `
  <div class="repos__item" id="${repo.id}">
    <div class="repos__heading">
    <img src="../../img/_OBJECTS.png" alt="" class="repos__img" />
      <a href="../repository_content/repository_content.html?search=${search}&username=${
    repo.full_name.split("/")[0]
  }&repo=${repo.full_name}" class="repos__link"">${repo.full_name}</a>
    </div>
    <div class="repos__description">${repo.description || ""}</div>
    <div class="repos__tag"></div>
    <div class="repos__info">
     <img src="../../img/Ellipse 210.png" alt="" class="repos__ellipse"/>
     <div class="repos__lang">${repo.language || ""}</div>
     <div class="repos__license">${repo.license ? repo.license.name : ""}</div>
     <div class="repos__date">Updated on ${formatDate(
       new Date(repo.updated_at)
     )}</div>

    </div>
  </div>`;
}

function repoTag(tag) {
  return `
  <div class="span">${tag}</div>
  `;
}
