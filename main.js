const urlApi = "https://api.github.com/users";

const btn = document.querySelector("button");
const usersContainer= document.querySelector(".users-container");
const user = document.querySelector(".User");
const search = document.querySelector("#search");

let alluser=[];



btn.addEventListener("click",async () => {
   btn.textContent = "Loading...";
   try{
   const response = await fetch(urlApi)
   const data = await response.json();
   alluser=data;

   displayUsers(data.slice(0,10));
   console.log(data);
   }
   catch(error){
    console.log(error)
   }
   finally{
    console.log("Done")
   }
});

function displayUsers(users){
    usersContainer.innerHTML = "";

    users.forEach(user => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = user.avatar_url;

        const h3 = document.createElement("h3");
        h3.textContent = user.login;

        const a = document.createElement("a");
        a.href = user.html_url;
        a.textContent = "View Profile";
        a.target = "_blank";

        card.append(img, h3, a);
        usersContainer.appendChild(card);
    });
}

search.addEventListener("input",()=>{
    const value = search.value.toLowerCase();

    const filer = alluser.filter(
        user => user.login.toLowerCase()
    .includes(value)
   );

   displayUsers(filer);

})

