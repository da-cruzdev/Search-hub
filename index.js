let search = document.getElementById("btn");

search.addEventListener("click", getSearch);

function getSearch() {
  let username = document.getElementById("input").value;
  let url = `https://api.github.com/users/${username}/repos`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("repo", `${data}`);
    })
    .catch((e) => {
      console.log(e);
    });
}
