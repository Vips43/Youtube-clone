let menu = document.querySelectorAll('.menu')
let sideMenu = document.querySelector('.side-menu')

menu.forEach((e)=>{
    e.addEventListener('click',()=>{
        sideMenu.classList.toggle('display')
    })
})

