import { channel, channelRelResult, getChannelDetailsArray, trandingArray } from "./api.js";
import { observerImages } from "./obeserver.js";

const vid_card = document.getElementById("vid_card");
const channel_details = document.getElementById("channel_details");
const content_section = document.getElementById("content_section");
const tranding = document.getElementById("tranding");

const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");

menuBtn.addEventListener("click", () => {
  sideMenu.classList.toggle("hidden");
});


/**=======================================
           Render Channel UI
*=======================================*/
async function channelUI() {
  vid_card.classList.remove("hidden");
  content_section.classList.remove("hidden");
  channel_details.classList.add("hidden");
  tranding.classList.add("hidden");

  // vid_card.innerHTML = ``;

  const datas = await channel();
  const data1 = await channelRelResult();

  /* =======================
     Channel Card
  ======================= */
  if (datas) {
    const fragment = document.createDocumentFragment();
    datas.forEach(data => {
      const channelDiv = document.createElement('div');
      channelDiv.dataset.ch_id = data.channelId;
      channelDiv.innerHTML = `
    <div class="bg-neutral-900 p-1 w-full rounded-lg grid grid-cols-[1.3fr_2fr] gap-3 hover:bg-neutral-700/50 cursor-pointer">
      <div class="bg-neutral-700/20 h-40 rounded flex items-center justify-center">
        <img src="${data.img}" class="aspect-square h-40 rounded-full" />
      </div>

      <div class="flex flex-col">
        <h2 class="text-lg font-semibold">${data.title}</h2>
        <p class="text-xs text-neutral-400 space-x-2 line-clamp-2">
          <span>${data.username}</span><span>•</span><span>${data.subscriber}</span>
        </p>
        <p class="text-xs text-neutral-400 mt-1.5 line-clamp-3">
          ${data.desc}
        </p>
        <button class="bg-red-600 px-4 py-1 rounded mt-auto w-fit">
          Subscribe
        </button>
      </div>
    </div>
  `;
      fragment.append(channelDiv)
    })
    // channelDiv.addEventListener("click", () => {
    //   console.log("channel id:", data.channelId);
    //   // getChannelDetailsArrayUI();
    // });
    vid_card.append(fragment);
  }
  /* =======================
     Related Videos
  ======================= */
  if (!data1 || !data1.length) {
    vid_card.innerHTML += `
      <div class="text-center text-neutral-400 py-10">
        No results found
      </div>
    `;
    return;
  }
  const fragment = document.createDocumentFragment();

  data1.forEach(d => {
    const div = document.createElement("div");
    div.className =
      "group flex gap-4 p-3 rounded-xl hover:bg-neutral-800 transition-all cursor-pointer";
    div.dataset.vidId = d.videoId;

    div.innerHTML = `
      <div class="relative w-64 h-36 rounded-xl overflow-hidden bg-neutral-700">
        <img 
          src="${d.HQ}" 
          class="w-full h-full object-cover opacity-0 group-hover:scale-105 transition-all duration-300"
        />
        ${d.badges ? `
          <span class="absolute top-1 left-1 bg-black/80 text-xs px-1.5 py-0.5 rounded">
            ${d.badges}
          </span>` : ""}
      </div>

      <div class="flex flex-col gap-1 flex-1 min-w-0">
        <h3 class="text-base font-semibold line-clamp-2">${d.vTitle}</h3>

        <div class="text-sm text-neutral-400 flex gap-2">
          <span>${d.views} views</span><span>•</span>
          <span>${d.publishedTimeText}</span>
        </div>

        <div class="flex items-center gap-2 mt-1">
          <img src="${d.avatar}" class="w-6 h-6 rounded-full" />
          <span class="text-sm text-neutral-300">${d.authTitle}</span>
        </div>

        <p class="text-sm text-neutral-400 line-clamp-2 mt-1">
          ${d.desc || ""}
        </p>
      </div>
    `;

    div.addEventListener("click", () => vidCard(div));
    fragment.append(div);
  });
  vid_card.append(fragment);
  observerImages();
}
channelUI()
window.channelUI = channelUI


async function getChannelDetailsArrayUI() {
  content_section.classList.add("hidden")
  vid_card.classList.add("hidden")
  channel_details.classList.remove("hidden")

  const data = await getChannelDetailsArray()
  channel_details.innerHTML = ``
  const div = document.createElement("div")
  div.innerHTML = `
  <div class="">
    <div class="">
      <div class="">
        <img src="${data.deskBanner}" alt="">
      </div>
        <div class="flex gap-5 pt-5 pb-3">
          <div class="h-32 w-32 shrink-0 p-0.5 bg-red-500 rounded-full relative isLive">
            <img src="${data.avatar}" class="w-full rounded-full " alt="">
          </div>
          <div class="w-full flex flex-col justify-between">
            <div class="flex items-end gap-2 h-full pb-2.5">
            <h1 class="text-5xl font-semibold">${data.title} </h1>
            ${data.isVerified ?
      `<i class="fa-regular fa-circle-check"></i>` : ''
    }
            </div>
            <div class="h-full flex flex-col justify-around">
              <p class="text-sm text-neutral-500 space-x-0.5"><span class="font-semibold text-white">${data.username}
                </span><span>•</span>
                <span>${data.subscriber}</span><span>•</span>
                <span>${data.views} videos</span>
              </p>
              <p class="text-sm text-neutral-500 line-clamp-2 leading-4">${data.desc}</p>
            </div>
          </div>
        </div>
        <div class="">
          <p class="text-xs"><a class="text-blue-400" href="${data.links[0].url}">${data.links[0].url}</a> <span class="font-semibold more-links cursor-pointer">and 7 more links</span></p>
      </div>
    </div>
  </div>`;
  channel_details.append(div)
  div.querySelector(".more-links").addEventListener("click", () => {
    channelPopup();
  });
  observerImages()
}


async function channelPopup() {
  const data = await getChannelDetailsArray()
  const div = document.createElement("div")
  div.setAttribute("id", "channelPopup")
  div.className = `popup absolute top-0 left-0 w-full h-screen flex items-center justify-center bg-black/50`
  div.innerHTML = `
  <div class="max-w-lg bg-neutral-800 pl-5 py-5 rounded-xl">
    <div class="flex justify-between mb-5 pr-5">
      <h2 class="text-xl font-bold">WWE</h2>
      <i class="fa-solid fa-x" onclick="closeCH(this)"></i>
    </div>
    <div class="max-h-[calc(100vh-15rem)] overflow-x-hidden overflow-y-auto custom-scrollbar">
      <div>
        <h4 class="text-lg font-bold">Description</h4>
        <p class="text-sm mr-8"> ${data.desc}</p>
      </div>
      <div>
        <h4 class="text-lg font-bold my-2">Links</h4>
        <ul class='space-y-1 w-full'>
        ${data.links.map(link => (`
          <li class="flex items-center gap-3">
            <img src="${link.icon}" alt="" class="h-8 w-8" >
            <div>
              <h5 class="font-semibold">${link.title}</h5>
              <a class="text-blue-400 text-sm line-clamp-1" href="${link.url}">${link.url}</a>
            </div>
          </li>`
  )).join('')}
        </ul>
      </div>
      <div>
        <h4 class="text-lg font-bold">More info</h4>
        <ul class='w-full space-y-2 my-4 text-sm'>
          <li class="flex items-center  gap-5">
            <i class="fa-solid fa-globe"></i>
            <span>www.youtube.com/${data.username}</span>
          </li>
          <li class="flex items-center  gap-5">
            <i class="fa-brands fa-digital-ocean"></i>
            <span class="line-clamp-1">${data.joinedDate}</span>
          </li>
          <li class="flex items-center  gap-5">
            <i class="fa-solid fa-users"></i>
            <span class="line-clamp-1">${data.subscriber}</span>
          </li>
          <li class="flex items-center  gap-5">
            <i class="fa-brands fa-youtube"></i>
            <span class="line-clamp-1">${data.Uvideos}</span>
          </li>
          <li class="flex items-center  gap-5">
            <i class="fa-solid fa-chart-line"></i>
            <span class="line-clamp-1">${data.Uviews}</span>
          </li>
        </ul>
        <button class="px-3 py-2 bg-neutral-600 rounded-xl">
        <i class="fa-solid fa-share"></i> Share channel</button>
        <button class="px-3 py-2 bg-neutral-600 rounded-xl">
        <i class="fa-regular fa-flag"></i> Report user</button>
      </div>
    </div>
  </div>
  `;
  document.body.append(div)
}
// channelPopup()

async function trandingUI() {
  vid_card.classList.add("hidden")
  content_section.classList.remove("hidden")
  channel_details.classList.add("hidden")
  tranding.classList.remove("hidden")

  const data = await trandingArray()
  const fragment = document.createDocumentFragment();
  channel_details.innerHTML = ``
  data.forEach(d => {
    const div = document.createElement("div");
    div.setAttribute("data-vidId", `${d.videoId}`)
    div.setAttribute("onclick", `vidCard(this)`)
    div.className = "group flex gap-4 p-3 rounded-xl hover:bg-neutral-800 transition-all cursor-pointer";

    div.innerHTML = `
  <!-- Thumbnail -->
  <div class="relative w-52 h-32 sm:w-64 sm:h-36 shrink-0 rounded-xl overflow-hidden bg-neutral-700">
    <img 
      src="${d.HQ}" 
      alt="${d.title}"
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    />
    <span class="absolute bottom-1 right-1 bg-black/80 text-xs px-1.5 py-0.5 rounded">
      ${d.MQText || 'HD'}
    </span>
  </div>
  <!-- Info -->
  <div class="flex flex-col gap-1 flex-1 min-w-0">
    <h3 class="text-base font-semibold leading-5 line-clamp-2">
      ${d.title}
    </h3>
    <div class="flex items-center gap-2 text-sm text-neutral-400">
      <span>${d.viewsT}</span>
      <span>•</span>
      <span>${d.publishT}</span>
    </div>
    <!-- Author -->
    <div class="flex items-center gap-2 mt-1">
      <img 
        src="${d.authorThumb}" 
        class="w-6 h-6 rounded-full"
        alt="${d.author}"
      />
      <span class="text-sm text-neutral-300">
        ${d.author}
      </span>
      ${d.verified ? `
        <i class="fa-solid fa-circle-check text-xs text-neutral-400"></i>
      ` : ''}
    </div>
    <!-- Description -->
    <p class="text-sm text-neutral-400 line-clamp-1 sm:line-clamp-2 mt-1">
      ${d.desc || ''}
    </p>
  </div>
  `;
    fragment.append(div);
  })
  tranding.append(fragment);
  observerImages()
}
// trandingUI()