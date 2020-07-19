const button = document.querySelector("#main-bottom a")
const modal = document.querySelector("#modal");
const close = document.querySelector("#modal .header a")

//INDEX e RESULT
button.addEventListener("click", ()=> {
    modal.classList.remove("hide")
})

//CLOSE
close.addEventListener("click", () => {
    modal.classList.add("hide")
})


