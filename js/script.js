console.log("connected");

// loadCategoriesData
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => showCategoriesData(data.categories))
    .catch((error) => console.log(error));
};

// showCategoriesData
const showCategoriesData = (data) => {
  // console.log(data);
  const categoryBtnContainer = document.getElementById(
    "category-btn-container"
  );
  data.forEach((item) => {
    console.log(item);
    // create dynamic btn
    const btn = document.createElement("button");
    btn.classList = "btn";
    btn.innerText = item.category;
    categoryBtnContainer.append(btn);
  });
};

// final function invocation
loadCategories();
