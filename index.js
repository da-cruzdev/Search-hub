let search = document.getElementById("btn");

search.addEventListener("click", getSearch);

function getSearch() {
  let username = document.getElementById("input").value;
  let url = `https://api.github.com/users/${username}/repos`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      localStorage.clear();
      console.log(data);
      localStorage.setItem("repositories", JSON.stringify(data));
    })
    .catch((e) => {
      console.log(e);
    });
}
