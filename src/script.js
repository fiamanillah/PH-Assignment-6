const petCards = document.getElementById("petCards");
const loader = document.getElementById("loader");
const likedImage = document.getElementById("likedImage");
const catagorySection = document.getElementById("catagorySection");
const sortBtn = document.getElementById("sortBtn");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');
const iconContainer = document.getElementById('iconContainer');

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("md-p:scale-0");
    iconContainer.classList.toggle('rotate-90');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
})


let petData = [];

async function loadPetData(type) {

    petCards.innerHTML = `<div class="col-span-3 bg-gray-100 rounded-3xl flex-col text-center py-20 justify-center items-center flex">
                            <img class="w-10" src="./images/loader.gif" alt="">
                        </div>`

    await new Promise(resolve => setTimeout(resolve, 2000));

    const responce = await fetch(`https://openapi.programming-hero.com/api/peddy/${type}`);
    const data = await responce.json();

    petData = data.pets ? data.pets : data.data;

    if (!petData || petData.length == 0) {
        petCards.innerHTML = `<div class="col-span-3 bg-gray-100 rounded-3xl flex-col text-center gap-5 py-20 justify-center items-center flex" id="noData">
                            <img  src="./images/no-data.svg" alt="">
                            <div class="w-3/4 md-p:w-full md-p:px-2 flex flex-col gap-3">
                                <h1>No Information Available</h1>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
                            </div>
                        </div>`
        return
    }
    renderPetCarda(petData)
}

function renderPetCarda(data) {
    petCards.innerHTML = ""
    data.forEach(element => {
        const petCard = document.createElement("div");
        petCard.className = "border-2 p-3 rounded-xl";
        petCard.innerHTML = `<img class="mb-3 rounded-2xl w-full" src="${element.image}" alt="">
            <div>
                <div class="flex flex-col gap-1">
                    <h2 class="my-2">${element.pet_name}</h2>
                    <div class="text-secondaryTextColor flex gap-1"><img src="./images/icons/breed.svg" alt=""> Breed: <span>${element.breed ? element.breed : "Not Available"}</span></div>
                    <div class="text-secondaryTextColor flex gap-1"><img src="./images/icons/calender.svg" alt=""> Birth: <span>${element.date_of_birth ? element.date_of_birth : "Not Mentioned"}</span></div>
                    <div class="text-secondaryTextColor flex gap-1"><img src="./images/icons/gender.svg" alt=""> Gender: <span>${element.gender ? element.gender : "Not Mentioned"}</span></div>
                    <div class="text-secondaryTextColor flex gap-1"><img src="./images/icons/price.svg" alt=""> Breed: <span>${element.price ? element.price + " $" : "Will be Announce"} </span></div>
                </div>
            </div>
            <hr class="my-5">
            <div class="flex justify-between w-full gap-3 ">
                <button class=" likeButtons py-3 border rounded-lg grow grid place-content-center hover:bg-slate-200 active:scale-95 active:bg-slate-300 duration-300"><img src="./images/icons/like.svg" alt="" ></button>
                <button class="adoptBtn py-3 border rounded-lg grow grid place-content-center hover:bg-slate-200 active:scale-95 active:bg-slate-300 duration-300 text-primary font-bold disabled:bg-slate-300 disabled:active:scale-100 disabled:text-slate-500 disabled:cursor-not-allowed">Adopt</button>
                <button  class="detailsBtn py-3 border rounded-lg grow grid place-content-center hover:bg-slate-200 active:scale-95 active:bg-slate-300 duration-300 text-primary font-bold">Details</button>
            </div>`
        petCards.appendChild(petCard);

    });
    const likeButtons = document.querySelectorAll(".likeButtons");
    likeButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const img = document.createElement("img");
            img.className = "w-full rounded-xl"
            img.setAttribute("src", petData[index].image);
            likedImage.appendChild(img)
        })
    })




    const detailsBtn = document.querySelectorAll(".detailsBtn");
    detailsBtn.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            const detailsData = petData[index];

            const modalInfo = `<div class="bg-white rounded-lg p-5 w-[35%] lg-t:w-[65%] md-p:w-[85%] relative">
    <img class="rounded-2xl w-full" src="${detailsData.image}" alt="">
    <h2 class="text-xl font-bold my-4">${detailsData.pet_name}</h2>
    <div class="grid grid-cols-2 md-p:grid-cols-1 gap-3">
        <div class="text-secondaryTextColor flex gap-1"><img src="./images/icons/breed.svg" alt=""> Breed: <span>${detailsData.breed ? detailsData.breed : "Not Available"}</span></div>
        <div class="text-secondaryTextColor flex gap-1"><img src="./images/icons/calender.svg" alt=""> Birth: <span>${detailsData.date_of_birth ? detailsData.date_of_birth : "Not Mentioned"}</span>
        </div>
        <div class="text-secondaryTextColor flex gap-1"><img src="./images/icons/gender.svg" alt=""> Gender: <span>${detailsData.gender ? detailsData.gender : "Not Mentioned"}</span>
        </div>
        <div class="text-secondaryTextColor flex gap-1"><img src="./images/icons/price.svg" alt=""> Price: <span>${detailsData.price ? detailsData.price + " $" : "Will be Announce"} </span>
        </div>
        <div class="text-secondaryTextColor flex gap-1"><img src="./images/icons/gender.svg" alt=""> Vaccinated status: <span>${detailsData.vaccinated_status ? detailsData.vaccinated_status : "Not Mentioned"}</span>
        </div>
    </div>

    <div class="mt-5">
        <h2>Details Information</h2>
        <p>${detailsData.pet_details ? detailsData.pet_details : "Not Mentioned"}</p>
    </div>
    
    <button class="modalClose bg-primary py-3 px-5 w-full my-5 font-medium rounded-xl text-white duration-300 border-2 border-primary hover:bg-slate-200 hover:text-black active:bg-slate-300 active:scale-95" >Cancel</button>
            </div>`
            const btnType = btn.innerText;
            console.log(btnType)
            showModal(modalInfo, btnType);


        })

    })

    const adoptBtn = document.querySelectorAll(".adoptBtn");
    adoptBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            let counter = 3;
            const modalInfo = `<div class="bg-white rounded-lg p-10 relative flex flex-col gap-3 items-center">
        <img class="w-32" src="./images/handshake.gif" alt="">
        <span class="text-4xl font-bold">Congrats</span>
        <span class="text-xl">Adoption process is start for your pet</span>
        <span class="text-7xl font-bold counterSpan">${counter}</span>
    </div>`
            const btnType = btn.innerText;
            console.log(btnType)
            showModal(modalInfo, btnType, counter);
            btn.setAttribute("disabled", "true");
            btn.innerHTML= "Adopted"
            
        })
    })


}


function showModal(modalInfo, btnType, counter) {
    const body = document.querySelector("body");
    body.classList.add("overflow-hidden");
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "fixed inset-0 bg-black bg-opacity-50 cursor-pointer z-10";
    const modal = document.createElement("div");
    modal.className = "fixed inset-0 z-50 flex items-center justify-center";
    modal.innerHTML = modalInfo
    body.appendChild(modalOverlay);
    body.appendChild(modal)

    if (btnType == "Details") {
        const modalCloseBtn = document.querySelectorAll(".modalClose");
        modalCloseBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
                modalOverlay.classList.add("hidden");
                modal.classList.add("hidden");
                body.classList.remove("overflow-hidden");
            })
        })
    } else if (btnType == "Adopt") {
        const countdownElement = modal.querySelector('span.counterSpan');
        const countdown = setInterval(() => {
            counter--; 
            countdownElement.innerText = counter;
            if (counter === 0) {
                clearInterval(countdown);
                modalOverlay.classList.add("hidden");
                modal.classList.add("hidden");
                body.classList.remove("overflow-hidden");
            }
        }, 1000);
    }


}



sortBtn.addEventListener("click", () => {
    if (petData != 0) {
        const sortedPetData = petData.sort((a, b) => b.price - a.price);
        console.log(sortedPetData)
        renderPetCarda(sortedPetData);
    }

})



loadPetData("pets")





async function loadCatagory() {
    const response = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
    const data = await response.json();
    data.categories.forEach((element) => {
        const categoryBtn = document.createElement("button");
        categoryBtn.className = "btn";
        categoryBtn.id = element.id;
        categoryBtn.innerHTML = `<img class="sm-p:w-[30%]" src="${element.category_icon}" alt="" /> <span class="text-xl font-bold">${element.category}</span>`
        catagorySection.appendChild(categoryBtn);
    })

    const catagoryBtn = document.querySelectorAll(".btn");
    catagoryBtn.forEach((item) => {
        item.addEventListener("click", (event) => {
            catagoryBtn.forEach((btn) => btn.classList.remove("btn-active"));
            item.classList.add("btn-active");
            const targetCatagory = event.currentTarget.querySelector("span").innerText.toLowerCase();
            loadPetData(`category/${targetCatagory}`)

        })
    })

}
loadCatagory()

