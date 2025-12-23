import { channel, channelRelResult } from "./api.js";

const vid_card = document.getElementById("vid_card")

const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");

menuBtn.addEventListener("click", () => {
  sideMenu.classList.toggle("hidden");
});


/**=======================================
           Render Channel UI
*=======================================*/
async function channelUI() {
  const data = await channel()
  const data1 = await channelRelResult()
  const channelDiv = document.createElement('div');
  channelDiv.setAttribute('data-ch_id', `${data.channelId}`)
  channelDiv.setAttribute('onclick', 'chCard(this)')
  channelDiv.innerHTML = `
  <div class="card bg-neutral-900 p-1 w-full rounded-lg grid grid-cols-[1.3fr_2fr] gap-3 hover:bg-neutral-700/50">
    <div class="bg-neutral-700/20 h-40 rounded text-center flex items-center justify-center">
      <img src="${data.img}" class="aspect-square h-40 rounded-full" alt="" />
    </div>

    <div class="h-full flex flex-col">
      <h2 class="text-lg font-semibold">${data.title}</h2>
      <p class="text-xs text-neutral-400 hover:text-white transition-hover delay-500 cursor-pointer space-x-2 line-clamp-2">
        <span>${data.username}</span><span>•</span><span>${data.subscriber}</span>
      </p>
      <p class="text-xs text-neutral-400 mt-1.5 leading-4 line-clamp-3">
        ${data.desc}
      </p>
      <button class="bg-red-600 px-4 py-1 rounded mt-auto w-fit">
        Subscribe
      </button>
    </div>
  </div>
  `;

  /**=======================================
       Render Channel related videos UI
 *=======================================*/
  const fragment = document.createDocumentFragment();
  data1.forEach(d => {
    const div = document.createElement("div")
    div.classList.add('vidCard')
    div.setAttribute("data-vidId", `${d.videoId}`)
    div.setAttribute("onclick", `vidCard(this)`)
    div.innerHTML = `
    <div class="bg-neutral-900 p-1 w-full rounded-lg grid grid-cols-[1.3fr_2fr] gap-3 hover:bg-neutral-700/50">
      <div class="bg-neutral-700/20 h-40 rounded-lg text-center flex items-center justify-center overflow-hidden">
        <img src="${d.HQ}" class="h-40 rounded opacity-0 transition-all duration-500" alt="" />
      </div>
      <div class="h-full flex flex-col leading-5">
        <h2 class="text-lg font-semibold leading-5 line-clamp-2">${d.title}</h2>
        <p class="text-xs text-neutral-400 hover:text-white transition-hover delay-500 cursor-pointer space-x-2 line-clamp-2">
          <span>${d.views} views</span><span>•</span><span>${d.publishedTimeText}</span>
        </p>
        <div class="text-sm my-2 text-white flex items-center gap-3">
          <img src="${data.img}" alt="" class="w-5 h-5 rounded-full" />
          <span>${data.title}</span>
        </div>
        <p class="text-xs text-neutral-400 leading-3.5 line-clamp-2">
          ${d.desc}
        </p>
        ${d.badges ? `
          <div class="bg-neutral-700 text-xs px-1 rounded mt-auto w-fit">
          ${d.badges}
          </div>
        ` : '<div></div>'
      }
      </div>
    </div>`
    fragment.append(div)
  })
  vid_card.append(channelDiv)
  vid_card.append(fragment)
  observerImages()
}
channelUI()

