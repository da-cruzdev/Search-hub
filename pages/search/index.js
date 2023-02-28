// function getSearch() {
//   let username = document.getElementById("input").value;
//   let url = `https://api.github.com/`;
//   const accessToken = "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";

//   fetch(url, {
//     headers: {
//       Authorization: `token ${accessToken}`,
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       localStorage.clear();
//       console.log(data);
//       localStorage.setItem("repositories", JSON.stringify(data));
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// }
// getSearch();

function validateForm() {
  var searchField = document.getElementById("input").value;
  if (searchField === "") {
    alert("Veuillez entrer un terme de recherche");
    return false;
  } else if (searchField.includes("   ")) {
    alert("Veuillez supprimer les espaces");
    return false;
  } else if (searchField.length > 50) {
    alert("Le terme de recherche ne doit pas dépasser 50 caractères");
    return false;
  } else {
    return true;
  }
}

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  if (validateForm()) {
    this.submit();
  }
});
