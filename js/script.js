console.log("connected");

//1st: loadCategories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => showCategoriesData(data.categories))
    .catch((error) => console.log(error));
};

// 2nd: loadVideos
const loadVideos = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/phero-tube/videos"
  );
  const data = await response.json();
  showVideosData(data.videos);
};

//1st: showCategoriesData
const showCategoriesData = (data) => {
  // console.log(data);
  const categoryBtnContainer = document.getElementById(
    "category-btn-container"
  );
  data.forEach((item) => {
    // console.log(item);
    // create dynamic btn
    const btn = document.createElement("button");
    btn.classList = "btn";
    btn.innerText = item.category;
    categoryBtnContainer.append(btn);
  });
};

// 2nd : showVideosData
const showVideosData = (data) => {
  // console.log(data);
  const videoContainer = document.getElementById("video-container");
  data.forEach((element) => {
    console.log(element);
    // create dynamic video card
    const divCard = document.createElement("div");
    divCard.classList = "card bg-base-100 shadow-sm";
    divCard.innerHTML = `
          <figure class="h-52 relative">
                <img class="h-full w-full object-cover" 
                      src="${element.thumbnail}" 
                />
                <span class="absolute right-2 bottom-2 bg-black text-white p-2">${element.others.posted_date}</span>
          </figure>
          <div class="flex gap-2 mt-4">
              <img class="w-10 h-10 object-cover rounded-full" 
                  src="${element.authors[0].profile_picture}"
              />
              <div class="space-y-2">
                  <h2 class="font-bold">${element.title}</h2>
                  <div class="flex gap-2 space-y-2">
                      <p>${element.authors[0].profile_name}</p>
                      ${
                        element.authors[0].verified === true
                          ? `<img class="w-5 h-5" src="../assets/verified-badge.png"/>`
                          : ``
                      }
                  </div
                  <h4>${element.others.views}</h4>
              </div>
          </div>
    `;
    videoContainer.append(divCard);
  });
};

// final function invocation
loadCategories();
loadVideos();
