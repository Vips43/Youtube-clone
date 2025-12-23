const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0');
        }
        else {
            entry.target.classList.add('opacity-0')
        }
    })
}, {})
function observerImages() {
    let img = document.querySelectorAll("img")
    img.forEach(i => {
        observer.observe(i)
    })
}