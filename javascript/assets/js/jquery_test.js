$(document).ready(() => {
  console.log("We are ready");

  $(".red-box").hover(
    (e) => {
      $(".red-box").toggleClass("round");
    },
    (o) => {
      $(".red-box").toggleClass("round");
    }
  );

  $(".red-box").click((e) => {
    alert("You clicked on the box");
  });

  const config = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTQwNmYyOGI5ZjM0OTU1NmRiMWU2N2IxMDY2Njg0YiIsInN1YiI6IjVmNWNkMzQzZWMwYzU4MDAzNWFkZmVlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oipah8d40eVs0pXS-dM4pjUPfpg5LKpSPDLbj58TIcs",
    },
  };

  axios
    .get("https://api.themoviedb.org/3/discover/movie", config)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTQwNmYyOGI5ZjM0OTU1NmRiMWU2N2IxMDY2Njg0YiIsInN1YiI6IjVmNWNkMzQzZWMwYzU4MDAzNWFkZmVlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oipah8d40eVs0pXS-dM4pjUPfpg5LKpSPDLbj58TIcs",
//   },
// };

// fetch("https://api.themoviedb.org/3/discover/movie", options)
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));
