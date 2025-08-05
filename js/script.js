console.log("connected");

//1st: loadCategories==========================================
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => showCategoriesData(data.categories));
};

// 2nd: loadVideos======================================
const loadVideos = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/phero-tube/videos"
  );
  const data = await response.json();
  showVideosData(data.videos);
};

// 3rd : loadVideosByCatId===================================
const loadVideosByCatId = (catId) => {
  // alert(catId);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${catId}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${catId}`);
      activeBtn.classList.add("active");
      // console.log(activeBtn);
      showVideosData(data.category);
    });
};

// 4th : loadModalDetails ============================================
const loadModalDetails = async (videoId) => {
  // console.log(videoId);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  );
  const data = await res.json();
  showModalsDetailsData(data.video);
};

//1st++ : showCategoriesData========================================
const showCategoriesData = (data) => {
  // console.log(data);
  const categoryBtnContainer = document.getElementById(
    "category-btn-container"
  );
  data.forEach((item) => {
    // console.log(item);
    // create dynamic btn
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
          <button
                id="btn-${item.category_id}"
                class="btn category-custom-btn" 
                onclick="loadVideosByCatId(${item.category_id})"
          >
            ${item.category}
          </button>
    `;

    categoryBtnContainer.append(btnDiv);
  });
};

// 2nd++ : showVideosData========================================
const showVideosData = (data) => {
  // console.log(data);
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  if (data.length === 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = ` 
        <div class = "min-h-[500px] flex flex-col gap-10 
                    justify-center items-center bg-gray-300">
            <img src = "../assets/Icon.png" class="bg-blue-300" />
            <h3 class = "bg-green-300 text-2xl font-bold">
                oops!! sorry ... no content here
            </h3>
        </div>
    `;
  } else {
    videoContainer.classList.add("grid");
  }
  data.forEach((element) => {
    // console.log(element);
    // create dynamic video card
    const divCard = document.createElement("div");
    divCard.classList = "card bg-base-100 shadow-sm";
    divCard.innerHTML = `
          <figure class = "h-52 relative">
                <img class = "h-full w-full object-cover" 
                      src = "${element.thumbnail}" 
                />
               ${
                 element.others.posted_date.length === 0
                   ? ``
                   : ` <span class = "absolute right-2 bottom-2 bg-black text-white text-xs p-1">${getTimeString(
                       element.others.posted_date
                     )}</span>`
               }
          </figure>
          <div class = "flex gap-2 mt-4">
              <img class = "w-10 h-10 object-cover rounded-full" 
                  src = "${element.authors[0].profile_picture}"
              />
              <div class = "space-y-2">
                  <h2 class = "font-bold">${element.title}</h2>
                  <div class = "flex gap-2 space-y-2">
                      <p>${element.authors[0].profile_name}</p>
                      ${
                        element.authors[0].verified === true
                          ? `<img class = "w-5 h-5" src="../assets/verified-badge.png"/>`
                          : ``
                      }
                  </div
                  <h4>${element.others.views}</h4>
              </div>
          </div>
          <button 
                  class = "btn btn-error w-1/3 mx-auto"  
                  onclick = loadModalDetails("${element.video_id}")
          >
                  Details
          </button>
    `;
    videoContainer.append(divCard);
  });
};

// 4th++ : showModalsDetailsData ===============================
const showModalsDetailsData = (data) => {
  console.log(data);
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `
        <img src = "${data.thumbnail}" class="h-48 w-full object-cover"/>
        <h1 class = "font-bold text-2xl my-5">${data.title}</h1>
        <p>${data.description.slice(0,200)}</p>
  `;
  // modal show way 01 by dom
  // document.getElementById("modal-btn").click();
  // modal show way 02 by daisy ui
  document.getElementById("customModal").showModal();
};

// 2nd++ : get time utility function===========================
function getTimeString(time) {
  // console.log(time);
  let remainingSeconds = time % 86400;
  let days = parseInt(time / 86400);
  let hours = parseInt(time / 3600);
  let minutes = parseInt(remainingSeconds / 60);
  remainingSeconds = parseInt(remainingSeconds % 60);
  return `${days} days ${hours} hours ${minutes} minutes ${remainingSeconds} seconds ago`;
}

// 3rd++ : removeActiveClass utility function====================
function removeActiveClass() {
  const btns = document.getElementsByClassName("category-custom-btn");
  // console.log(btns);
  for (let btn of btns) {
    // console.log(btn);
    btn.classList.remove("active");
  }
}

// final function invocation must do==========================
loadCategories();
loadVideos();
