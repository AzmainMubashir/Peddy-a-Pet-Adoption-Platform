//  Category Button fetched with API

const loadCatBtn = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => addCatBtn(data.categories))
    .catch((error) => console.log(error));
};


const addCatBtn = (category) => {
    const btnContainer = document.getElementById('category-buttons');

    category.forEach( (item) => {
    const div = document.createElement("div");
    let catName = item.category.toLowerCase();
    div.innerHTML =`
    <button id="btn-${catName}" onclick="loadByCat('${catName}')" class="w-48 flex flex-row border border-gray-400 border-opacity-70 rounded-2xl px-6 py-3 space-x-4 items-center justify-center category-btn"><img src="${item.category_icon}" alt=""><span class="inter text-2xl font-bold">${item.category}s</span></button>
    `
    btnContainer.append(div);

    });
};
loadCatBtn();

//  Load all Card by API

const loadAllCard = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) =>
        loadCards(data.pets))
    .catch((error) => console.log(error));
};


//  Load Cards By Category

const loadByCat = (id) => {
    
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        const activeBtn = document.getElementById(`btn-${id}`);
            removeActive();
            activeBtn.classList.add("active");
            activeBtn.classList.add("rounded-l-full");
            activeBtn.classList.add("rounded-r-full");
            loadCards(data.data);
        })
    .catch((error) => console.log(error));
    
const removeActive= () => {
    const buttons = document.getElementsByClassName("category-btn");
    for(let btn of buttons) {
        btn.classList.remove("active");
        btn.classList.remove("rounded-l-full");
        btn.classList.remove("rounded-r-full");
    }
}

};
loadByCat();

const loadCards = (category) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    if (category.length === 0) {
        cardContainer.classList.remove("grid");
        cardContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center text-center">
          <img class="mx-auto" src="images/error.webp" alt="">
          <h2 class="inter text-3xl font-bold">No Information Available</h2>
          <p class="pt-6 pb-12 opacity-70">No Data found. Please check your internet connection or try again later. If the problem continues, contact support for assistance. We apologize for any inconvenience caused.</p>
        </div>
        `;
        return;
    }
    else{
        cardContainer.classList.add("grid");
    }

    category.forEach( (item) => {    
    const div = document.createElement("div");
    div.classList ="border border-zinc-300 rounded-xl p-4 w-64"
    div.innerHTML =`
  <img src="${item.image}" alt="">
  <div class="space-y-2 py-4">
    <h4 class="inter text-xl font-bold">${item.pet_name}</h4>
  <div class="flex items-center space-x-2 opacity-80"><img src="images/Frame 1.svg" alt=""><span>Breed:  ${item.breed? `${item.breed}` : "Not Mentioned" }</span></div>
  <div class="flex items-center space-x-2 opacity-80"><img src="images/Frame 2.svg" alt=""><span>Birth:  ${item.date_of_birth == null? "Not Available" : `${item.date_of_birth}`}</span></div>
  <div class="flex items-center space-x-2 opacity-80"><img src="images/Frame 3.svg" alt=""><span>Gender: ${item.gender? `${item.gender}` : "Not Mentioned" }</span></div>
  <div class="flex items-center space-x-2 opacity-80"><img src="images/Frame 4.svg" alt=""><span>Price:  ${item.price == null? "Not Mentioned" : `${item.price}`}</span></div>
  </div>
  <hr class="border border bg-zinc-500 px-4">
  <div class="flex pt-4 justify-between">
    <button class="btn-sm bg-white hover:border rounded-lg border border-teal-600 border-opacity-15 hover:border-teal-700 hover:rounded-lg"><img src="images/like.svg" alt=""></button>
    <button class="btn-sm text-base font-bold bg-white text-teal-700 border border-teal-600 border-opacity-15 hover:bg-teal-700 hover:text-white rounded-lg px-2">Adopt</button>
    <button class="btn-sm text-base font-bold bg-white text-teal-700 border border-teal-600 border-opacity-15 hover:bg-teal-700 hover:text-white rounded-lg px-2">Details</button>
  </div>

    `
    cardContainer.append(div);

    });
};
loadAllCard();