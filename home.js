const hambugerMenuContainerTag = document.querySelector(".hambuger-menu-container");
const hambugerLine1Tag  = document.querySelector(".hambuger-line1");
const hambugerLine2Tag  = document.querySelector(".hambuger-line2");
const hambugerLine3Tag  = document.querySelector(".hambuger-line3");

hambugerMenuContainerTag.addEventListener("click",()=>
{
    if(hambugerMenuContainerTag.classList.contains("isOpened"))
    {
        hambugerLine1Tag.classList.remove("rotatePlus45deg");
        hambugerLine2Tag.classList.remove("hideLine2");
        hambugerLine3Tag.classList.remove("rotateMinus45deg");
        hambugerMenuContainerTag.classList.remove("isOpened")
    }
    else
    {
        hambugerLine1Tag.classList.add("rotatePlus45deg");
        hambugerLine2Tag.classList.add("hideLine2");
        hambugerLine3Tag.classList.add("rotateMinus45deg");
        hambugerMenuContainerTag.classList.add("isOpened")
    }
})

hambugerMenuContainerTag.onclick = function()
{
    let navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle("active");
};
