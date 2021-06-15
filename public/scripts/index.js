function login() {
    const userName = document.getElementById("userName").value
    console.log("SAVING USERNAME", userName)
    window.localStorage.setItem("userName", userName)
    
}

function getUser() {
    return window.localStorage.getItem("userName")
}

// Delete recipe
async function deleteRecipe(id){
    await fetch(`/deleteRecipe/${getUser()}/${id}`, {
        method: 'POST'
    })
    window.location.reload();
}

// Save recipe
function saveRecipe(idMeal) {
    console.log("Save meal with ID:", idMeal, "for user", getUser())
    fetch(`/saveRecipe/${getUser()}/${idMeal}`, {
        method: 'POST'
    })
    alert(`Saved!`)
}

// Update recipe
async function updateRecipe(id, name){
    const updateTitle = window.prompt("Rename this recipe", name)
    if (!updateTitle){
        return 
    }
    await fetch(`/updateRecipe/${getUser()}/${id}/${encodeURIComponent(updateTitle)}`, {
        method: 'POST'
    })
window.location.reload();
}

// Splash page image rotator
function choosePic() {
let myPix = new Array("images/food1.jpg", "images/food2.jpg", "images/food3.jpg");
var randomNum = Math.floor(Math.random() * myPix.length);
document.querySelector(".marquee").src = myPix[randomNum];
}

