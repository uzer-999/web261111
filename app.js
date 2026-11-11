
// 포스터 주소 생성 함수
function posterUrl(path, size) {
  return "https://image.tmdb.org/t/p/" + size + path;
}


// 영화 카드 생성 함수
function renderCards(list) {

  const board = document.querySelector(".board");

  board.innerHTML = "";

  for (const m of list) {

    const card = document.createElement("article");

    card.className = "card";

    // 평점 8점 이상 빨간 배지
    if (m.rating >= 8) {
      card.classList.add("hot");
    }

    card.innerHTML = `
      <div class="poster-wrap">
        <img
          class="poster"
          src="${posterUrl(m.poster, "w342")}"
          alt="${m.title} 포스터"
        >
        <span class="badge">${m.rating}</span>
      </div>

      <div class="info">
        <h2>${m.title}</h2>
        <p class="year">${m.year}</p>
        <p class="overview">${m.overview}</p>
      </div>
    `;

    board.appendChild(card);
  }

  document.getElementById("count").textContent =
    list.length + "편";
}


// 정렬 함수
function sortBy(list, key, desc) {

  // 원본 배열을 복사
  const copy = [...list];

  copy.sort((a, b) => {

    // 제목은 가나다순
    if (key === "title") {
      return a.title.localeCompare(b.title, "ko");
    }

    // 최신 개봉순은 날짜 기준
    if (key === "year") {
      return a.date.localeCompare(b.date);
    }

    // 평점순은 숫자 기준
    if (key === "rating") {
      return a.rating - b.rating;
    }

  });

  // 내림차순 처리
  if (desc) {
    copy.reverse();
  }

  return copy;
}


// 선택 상자에 따른 정렬
function applySort() {

  const key = document.getElementById("sort").value;

  // 제목순만 오름차순
  const desc = key !== "title";

  const sortedMovies = sortBy(movies, key, desc);

  renderCards(sortedMovies);
}


// 처음에는 평점순으로 출력
applySort();
