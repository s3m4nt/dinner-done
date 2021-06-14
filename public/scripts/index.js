function login() {
    const userName = document.getElementById("userName").value
    console.log("SAVING USERNAME", userName)
    window.localStorage.setItem("userName", userName)
    
}

function getUser() {
    return window.localStorage.getItem("userName")
}

async function deleteRecipe(id){
    await fetch(`/deleteRecipe/${getUser()}/${id}`, {
        method: 'POST'
    })

    window.location.reload();
}

function saveRecipe(idMeal) {
    console.log("Save meal with ID:", idMeal, "for user", getUser())

    fetch(`/saveRecipe/${getUser()}/${idMeal}`, {
        method: 'POST'
    })
    // alert(`${getUser()}, you saved !`)
    alert(`Saved!`)
}

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
