let search = document.getElementById("btn");
console.log(search);

search.addEventListener("click", getSearch);

function getSearch() {
  let username = document.getElementById("input").value;
  let url = `https://api.github.com/users/${username}/`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        console.log("User not found");
      } else {
        console.log(data);
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
