const config = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTQwNmYyOGI5ZjM0OTU1NmRiMWU2N2IxMDY2Njg0YiIsInN1YiI6IjVmNWNkMzQzZWMwYzU4MDAzNWFkZmVlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oipah8d40eVs0pXS-dM4pjUPfpg5LKpSPDLbj58TIcs",
  },
};

axios
  .get("https://api.themoviedb.org/3/discover/movie", config)
  .then((res) => {
    console.log(res.data.results);

    const movie_array = res.data.results.map((el) => {
      return {
        name: el.title,
        desc:
          el.overview.length > 75
            ? el.overview.slice(0, 75) + "&hellip;"
            : el.overview,
        date: el.release_date,
        rating: Math.floor(el.vote_average),
        poster: `https://image.tmdb.org/t/p/w500/${el.poster_path}`,
      };
    });

    movie_array.forEach((movie) => {
      $("#movies").append(
        `<div class="col-3">
              <div class="card">
                <img src="${movie.poster}" class="card-img-top" alt="${movie.name}" />
                <div class="card-body">
                  <h5 class="card-title"><a id='${movie.id}' onclick='getMovieData(${movie.id})'>${movie.name}</a></h5>
                  <p class="card-text fs-6">
                    ${movie.desc}
                  </p>
                  <p>Rating <span class="badge bg-info">${movie.rating}</span></p>
                </div>
              </div>
            </div>`
      );
    });
    // $("body").text(movie_array);
  })
  .catch((err) => console.error(err));

axios
  .get("https://api.themoviedb.org/3/trending/movie/day", config)
  .then((res) => {
    console.log(res.data.results);

    const movie_array = res.data.results.map((el) => {
      return {
        id: el.id,
        name: el.title,
        desc:
          el.overview.length > 75
            ? el.overview.slice(0, 75) + "&hellip;"
            : el.overview,
        date: el.release_date,
        rating: Math.floor(el.vote_average),
        poster: `https://image.tmdb.org/t/p/w500/${el.poster_path}`,
      };
    });

    movie_array.forEach((movie) => {
      $("#tranding").append(
        `<div class="col-3 my-3">
              <div class="card h-100">
                <img src="${movie.poster}" class="card-img-top" alt="${movie.name}" />
                <div class="card-body">
                  <h5 class="card-title"><a id='${movie.id}' onclick='getMovieData(${movie.id})'>${movie.name}</a></h5>
                  <p class="card-text fs-6">
                    ${movie.desc}
                  </p>
                  <p>Rating <span class="badge bg-info">${movie.rating}</span></p>
                </div>
              </div>
            </div>`
      );
    });
  })
  .catch((err) => console.log(err));

const getMovieData = async (id) => {
  $("#modalBody").html(`<div class="d-flex w-100 justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`);

  const myModal = new bootstrap.Modal("#movieModal", {
    keyboard: true,
  });

  myModal.show();

  // data fetching
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}`,
    config
  );
  const movieData = res.data;

  $("#modalBody").html(
    `<div class="row">
        <div class="col-4">
            <img src="https://image.tmdb.org/t/p/w500/${
              movieData.poster_path
            }" alt="" heigh="100%" width="100%"/>
        </div>
        <div class="col-8">
            <h4>${movieData.original_title}</h4>
            <p>${movieData.overview}</p>
            <p>${movieData.genres.map(
              (genre) => `<span class="badge bg-info">${genre.name}</span>`
            )}</p>
            <p>${movieData.homepage}</p>
            <p>${movieData.production_companies.map(
              (company) => ` ${company.name}`
            )}</p>
        </div>
    </div>`
  );
};
