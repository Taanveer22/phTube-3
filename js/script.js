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
  console.log(data);
};

// final function invocation
loadCategories();
