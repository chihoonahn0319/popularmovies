const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTg0ODgxMmFlZGVjOTk2MWVmZDFkNTQwZTBkMTZmYSIsInN1YiI6IjY0NzU1YjllOTYzODY0MDEzNTNmYTczYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lLECj_6Yf35Yxs-8f-gVhCWKcdyIrN8Fj69MQbPomdE",
  },
};

// 인기 영화 목록 가져오기
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    let rows = data.results;

    // 영화 카드 생성  기존 for 문에서 -> map 배열 문으로 변환
    rows.map((movie) => {
      let title = movie.original_title;
      let overview = movie.overview;
      let poster = movie.poster_path;
      let vote = movie.vote_average;

      // 카드 생성
      let movieCard = document.createElement('div');
      movieCard.className = 'movie-card';

      // 평점에 따라 클래스 추가
      if (vote >= 7.5) {
        movieCard.classList.add('high-rating');
      } else if (vote >= 5.0) {
        movieCard.classList.add('medium-rating');
      } else {
        movieCard.classList.add('low-rating');
      }

      // 이미지 추가
      let image = document.createElement('img');
      image.src = `https://image.tmdb.org/t/p/w500${poster}`;
      image.alt = '';
      
      // 이벤트 리스너 추가
      image.addEventListener('click', function() {
        showMovieId(movie.id);
      });

      // 제목 추가
      let h3 = document.createElement('h3');
      h3.textContent = title;

      // 개요 추가
      let p1 = document.createElement('p');
      p1.textContent = overview;

      // 평점 추가
      let p2 = document.createElement('p');
      p2.textContent = vote;

      // 카드에 요소들 추가
      movieCard.appendChild(image);
      movieCard.appendChild(h3);
      movieCard.appendChild(p1);
      movieCard.appendChild(p2);

      // 카드를 cards 요소에 추가
      document.getElementById('cards').appendChild(movieCard);
    });
  })
  .catch((err) => console.error(err));

// 영화 ID 표시
function showMovieId(movieId) {
  alert(`ID: ${movieId}`);
}

// 검색 버튼 클릭 시 핸들러
function handleSearch(event) {
  event.preventDefault();
  searchMovies();
}

// 영화 검색
function searchMovies() {
  let searchTerm = document.querySelector("#search-input").value;
  if (searchTerm) {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        searchTerm
      )}&language=en-US&page=1&include_adult=false`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        let rows = data.results;
        let cards = document.querySelector("#cards");
        cards.innerHTML = "";
       
        //기존 for 문을 -> foreach 문으로 변경
        if (rows.length > 0) {
          rows.forEach((movie) => {
            let title = movie.original_title;
            let overview = movie.overview;
            let poster = movie.poster_path;
            let vote = movie.vote_average;

            // 검색어와 일치하는 제목을 가진 카드만 생성
            if (title.toLowerCase().includes(searchTerm.toLowerCase())) {
              // 카드 생성
              let movieCard = document.createElement("div");
              movieCard.className = "movie-card";

              // 평점에 따라 클래스 추가
              if (vote >= 7.5) {
                movieCard.classList.add('high-rating');
              } else if (vote >= 5.0) {
                movieCard.classList.add('medium-rating');
              } else {
                movieCard.classList.add('low-rating');
              }

              // 이미지 추가
              let img = document.createElement("img");
              img.src = `https://image.tmdb.org/t/p/w500${poster}`;
              img.alt = "";
              img.addEventListener("click", function () {
                showMovieId(movie.id);
              });

              // 제목 추가
              let h3 = document.createElement("h3");
              h3.textContent = title;

              // 개요 추가
              let p1 = document.createElement("p");
              p1.textContent = overview;

              // 평점 추가
              let p2 = document.createElement("p");
              p2.textContent = vote;

              // 카드에 요소들 추가
              movieCard.appendChild(img);
              movieCard.appendChild(h3);
              movieCard.appendChild(p1);
              movieCard.appendChild(p2);

              // 카드를 cards 요소에 추가
              cards.appendChild(movieCard);
            }
          });
        } else {
          cards.innerHTML = "<p>관련 검색어가 없습니다.</p>";
        }
      })
      .catch((err) => console.error(err));
  }
}

// DOM 로딩 완료 시 초기 동작 설정
document.addEventListener("DOMContentLoaded", function () {

  // 검색 버튼 클릭 시 핸들러 설정
  let searchButton = document.querySelector("#search-button");
  searchButton.addEventListener("click", function () {
    searchMovies();
  });
});

//수정했지롱~~~~!!