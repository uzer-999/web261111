
// 포스터 주소 생성 함수
function posterUrl(path, size) {
  return "https://image.tmdb.org/t/p/" + size + path;
}


// 영화 배열을 카드로 출력하는 함수
function renderCards(list) {

  const board = document.querySelector(".board");

  // 기존 카드 삭제
  board.innerHTML = "";

  // 영화 배열 반복
  for (const m of list) {

    // 카드 생성
    const card = document.createElement("article");

    card.className = "card";

    // 평점 8점 이상이면 hot 추가
    if (m.rating >= 8) {
      card.classList.add("hot");
    }

    // 카드 내부 HTML
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

    // 보드에 카드 추가
    board.appendChild(card);

  }

  // 영화 개수 표시
  document.getElementById("count").textContent =
    list.length + "편";

}


// 정렬 함수
function sortBy(list, key, desc) {

  // 원본 배열 복사
  const copy = [...list];

  // 정렬
  copy.sort((a, b) => {

    if (typeof a[key] === "string") {
      return a[key].localeCompare(b[key]);
    }

    return a[key] - b[key];

  });

  // 내림차순
  if (desc) {
    copy.reverse();
  }

  return copy;

}


// 선택 상자와 연결
function applySort() {

  const key = document.getElementById("sort").value;

  renderCards(
    sortBy(movies, key, key !== "title")
  );

}


// 처음 실행
applySort();
