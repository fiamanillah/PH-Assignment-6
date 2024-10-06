const petCards = document.getElementById("petCards");
const loader = document.getElementById("loader");
const likedImage = document.getElementById("likedImage");



async function loadPetData() {

    loader.classList.remove("hidden")

    // await new Promise(resolve => setTimeout(resolve, 2000));

    const responce = await fetch(" https://openapi.programming-hero.com/api/peddy/pets");
    const data = await responce.json();

    data.pets.forEach(element => {
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
                <button class="py-3 border rounded-lg grow grid place-content-center hover:bg-slate-200 active:scale-95 active:bg-slate-300 duration-300 text-primary font-bold">Adopt</button>
                <button class="py-3 border rounded-lg grow grid place-content-center hover:bg-slate-200 active:scale-95 active:bg-slate-300 duration-300 text-primary font-bold">Details</button>
            </div>`
        petCards.appendChild(petCard);

    });

    loader.classList.add("hidden")
    const likeButtons = document.querySelectorAll(".likeButtons");
    likeButtons.forEach((btn, index)=>{
        btn.addEventListener("click", ()=>{
            const img = document.createElement("img");
            img.className = "w-full rounded-xl"
            img.setAttribute("src", data.pets[index].image);
            likedImage.appendChild(img)
            console.log(index)
        })
    })
    console.log(data.pets)
}

loadPetData()

// setTimeout(()=>{loadPetData()}, 5000)
