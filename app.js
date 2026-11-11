
// app.js

// 1. 포스터 이미지 주소 생성
function posterUrl(path, size) {
  return "https://image.tmdb.org/t/p/" + size + path;
}


// 2. 영화 배열을 카드로 만들어 화면에 출력
function renderCards(list) {

  const board = document.querySelector(".board");

  // 기존 카드 삭제
  board.innerHTML = "";

  // 영화 배열에서 하나씩 꺼내기
  for (const m of list) {

    // article 요소 생성
    const card = document.createElement("article");

    card.className = "card";

    // 평점이 8점 이상이면 hot 클래스 추가
    if (m.rating >= 8) {
      card.classList.add("hot");
    }

    // 카드 내용 생성
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


// 3. 배열을 원하는 기준으로 정렬
function sortBy(list, key, desc) {

  // 원본 배열을 복사
  const copy = [...list];

  // 숫자와 문자열 구분하여 비교
  copy.sort((a, b) => {

    if (typeof a[key] === "string") {
      return a[key].localeCompare(b[key]);
    }

    return a[key] - b[key];

  });

  // 내림차순 정렬
  if (desc) {
    copy.reverse();
  }

  return copy;

}


// 4. 선택 상자의 값에 따라 정렬
function applySort() {

  const key = document.getElementById("sort").value;

  renderCards(
    sortBy(movies, key, key !== "title")
  );

}


// 5. 최초 실행
// 처음에는 평점순으로 카드 출력
applySort();
