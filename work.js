
function vidCard(e) {
    console.log('video id: ', e.dataset.vidid)
}

function closeCH(btn) {
    const popup = btn.closest("#channelPopup")
    popup.classList.add("hidden")
}

const searchBtn = document.getElementById("searchBtn");
const input = document.getElementById("input");
searchBtn.addEventListener("click", () => {
    console.log(input.value)
    getData(input.value)
    channelUI()
})










