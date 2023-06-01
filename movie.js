const options = {   //options 객체는 API 요청을 위해 필요한 설정들을 담고 있어요.
  method: "GET",   //method은 요청 방식을 나타내며, "GET"으로 설정되어 있어요.
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTg0ODgxMmFlZGVjOTk2MWVmZDFkNTQwZTBkMTZmYSIsInN1YiI6IjY0NzU1YjllOTYzODY0MDEzNTNmYTczYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lLECj_6Yf35Yxs-8f-gVhCWKcdyIrN8Fj69MQbPomdE",
  },
};
//headers는 요청 헤더 정보를 담고 있고, accept는 응답으로 받고자 하는 데이터 형식을 나타내요

// 인기 영화 목록 가져오기
fetch(   //fetch() 함수를 사용하여 API에 GET 요청을 보내서 인기 영화 목록을 가져와요
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())  //응답은 JSON 형식으로 받아와서 data 변수에 저장해요.
  .then((data) => {
    let rows = data.results;      //data.results에서는 영화 목록이 담겨 있어요.

    // 영화 카드 생성  기존 for 문에서 -> map 배열 문으로 변환
    rows.map((movie) => {  //map() 메서드를 사용하여 각 영화에 대한 카드를 생성해요. rows 배열의 각 요소(영화)에 대해 반복하면서 처리해요.
      let title = movie.original_title;
      let overview = movie.overview;
      let poster = movie.poster_path;
      let vote = movie.vote_average;
       //영화 정보를 변수에 저장해요.
      
    // 카드 생성
      let movieCard = document.createElement('div');
      movieCard.className = 'movie-card';  //영화 카드를 만들기 위해 <div> 요소를 생성하고 movieCard 변수에 할당해요.

      // 평점에 따라 클래스 추가
      if (vote >= 7.5) {
        movieCard.classList.add('high-rating');
      } else if (vote >= 5.0) {
        movieCard.classList.add('medium-rating');
      } else {
        movieCard.classList.add('low-rating');
      }

      // 이미지 추가 포스터 이미지를 나타내기 위해 <img> 요소를 생성하고 image 변수에 저장해요.
      let image = document.createElement('img');
      image.src = `https://image.tmdb.org/t/p/w500${poster}`;
      image.alt = '';
      
      // 이미지를 클릭했을 때 showMovieId() 함수를 호출하도록  
      //이벤트 리스너 추가
      image.addEventListener('click', function() {
        showMovieId(movie.id);
      });//이미지를 클릭했을 때 showMovieId() 함수를 호출하도록 이벤트 리스너를 추가해요.

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

      // 마지막으로 영화 카드를 cards 요소에 추가해요
      document.getElementById('cards').appendChild(movieCard);
    });
  })
  .catch((err) => console.error(err));

// 영화 ID 표시 showMovieId() 함수는 영화 ID를 매개변수로 받아와서 alert() 함수를 사용하여 ID를 알려줘요.
function showMovieId(movieId) {
  alert(`ID: ${movieId}`);
}

// 검색 버튼 클릭 시 핸들러
function handleSearch(event) { //handleSearch() 함수는 검색 버튼을 클릭했을 때 동작하는 이벤트 핸들러에요.
  event.preventDefault();
  searchMovies();  //searchMovies() 함수를 호출하여 영화 검색을 처리해요.
}

// 영화 검색
function searchMovies() {  //searchMovies() 함수는 검색어를 가져와서 API를 통해 영화를 검색해요.
  let searchTerm = document.querySelector("#search-input").value;  //검색어는 #search-input 요소에서 가져와요.
  if (searchTerm) { //만약if 검색어가 존재한다면, API 요청을 보내고 응답을 처리해요.
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        searchTerm
      )}&language=en-US&page=1&include_adult=false`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        let rows = data.results;  //검색 결과로 받아온 영화 목록(rows)을 처리해요.
        let cards = document.querySelector("#cards");
        cards.innerHTML = ""; // 이전 검색 결과를 지우기 위해 cards 요소를 비워요. "" 를이용한다.
       
        //기존 for 문을 -> foreach 문으로 변경
        if (rows.length > 0) {
          rows.forEach((movie) => {
            let title = movie.original_title;
            let overview = movie.overview;
            let poster = movie.poster_path;
            let vote = movie.vote_average;

            // 영화 정보를 변수에 저장하고, 검색어와 일치하는 영화 제목인지 확인해요.
            if (title.toLowerCase().includes(searchTerm.toLowerCase())) {
              // 일치하는 경우에만 영화 카드를 생성하고, 클래스를 추가해요.
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
          cards.innerHTML = "<p>관련 검색어가 없습니다.</p>"; //만약 검색 결과가 없는 경우 "관련 검색어가 없습니다." 메시지를 cards 요소에 표시해요.
        }
      })
      .catch((err) => console.error(err));
  }
}

// DOM 로딩 완료 시 초기 동작 설정 =>DOMContentLoaded 이벤트 핸들러를 사용하여 DOM이 완전히 로드된 후에 초기 동작을 설정해요.
document.addEventListener("DOMContentLoaded", function () {

  // 검색 버튼(#search-button)을 선택하고, 클릭 이벤트 리스너를 추가해요. 클릭 시 searchMovies() 함수를 호출하여 검색을 처리해요.
  let searchButton = document.querySelector("#search-button");
  searchButton.addEventListener("click", function () {
    searchMovies();
  });
});

//수정했지롱~~~~!!