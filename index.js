function getSearch() {
  let username = document.getElementById("input").value;
  let url = `https://api.github.com/gists/public`;
  const accessToken = "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";

  fetch(url, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  })
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
getSearch();
