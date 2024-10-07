
const loadCatBtn = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => addCatBtn(data.categories))
}


const addCatBtn = (category) => {
    const btnContainer = document.getElementById('category-buttons');

    category.forEach( (item) => {
    console.log(item);
    
    const button = document.createElement("button");
    button.classList ="flex flex-row border border-gray-400 border-opacity-70 rounded-2xl p-6 space-x-4 items-center justify-center"
    button.innerHTML =`
    <img src="${item.category_icon}" alt=""><span class="inter text-2xl font-bold ">${item.category}s</span>
    `
    btnContainer.append(button);

    });
}
loadCatBtn();