
let youtube = JSON.parse(localStorage.getItem("youtube")) || { search: [], channelData: [], channelRelResult: [], getChannelDetails: [],getChannelDetailsArray:[] }


/**=======================================
    global search api
 *=======================================*/
async function getData() {
    const q = 'school4u'
    const url = `https://youtube138.p.rapidapi.com/search/?q=${q}&hl=en&gl=US`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '4ca77398a4msh7763f9eafb81d5ap10d5a5jsn98c9be3a8843',
            'x-rapidapi-host': 'youtube138.p.rapidapi.com'
        }
    };
    try {
        const res = await fetch(url, options);
        const data = await res.json();
        youtube.search = data
        console.log(youtube.search);
        saveLocal('search')
    } catch (error) {
        console.error(error);
    }
}
 getData()

/**=======================================
    get channel from search api
 *=======================================*/
export async function channel() {
    let chInfo = youtube.search
    chInfo = chInfo.contents.filter(c => c.type === 'channel')
    chInfo = chInfo[0].channel;

    return youtube.channelData = {
        channelId: chInfo.channelId,
        baseurl: chInfo.canonicalBaseUrl,
        desc: chInfo.descriptionSnippet,
        subscriber: chInfo.stats.subscribersText,
        title: chInfo.title,
        username: chInfo.username,
        img: chInfo.avatar[1].url
    }
}

/**=======================================
            channel related results
 *=======================================*/
export async function channelRelResult() {
    let info = youtube.search;
    info = info.contents.filter(c => c.type !== 'channel')
    youtube.channelRelResult = info.map(i => ({
        avatar: i.video.author.avatar[0].url,
        channelId: i.video.author.channelId,
        videoId: i.video.videoId,
        title: i.video.title,
        desc: i.video.descriptionSnippet,
        views: i.video.stats.views,
        publishedTimeText: i.video.publishedTimeText,
        isLiveNow: i.video.isLiveNow,
        vidLength: i.video.lengthSeconds,
        HQ: i.video.thumbnails[1].url,
        LQ: i.video.thumbnails[0].url,
        movingThumb: i.video.movingThumbnails?.[0]?.url || '',
        badges: i.video.badges?.[0] || ''
    }))
    return youtube.channelRelResult
}

/**=======================================
            GET CHANNEL DETAILS BY CH-ID
 *=======================================*/
export async function getChannelDetails(chid) {
    const url = 'https://youtube138.p.rapidapi.com/channel/details/?id=UCJ5v_MCY6GNUBTO8-D3XoAg&hl=en&gl=US';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '4ca77398a4msh7763f9eafb81d5ap10d5a5jsn98c9be3a8843',
            'x-rapidapi-host': 'youtube138.p.rapidapi.com'
        }
    };
    try {
        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data);
        youtube.getChannelDetails = data;
        saveLocal("getChannelDetails");
        return youtube.getChannelDetails;
    } catch (error) {
        console.error(error);
    }
}
// getChannelDetails()
async function getChannelDetailsArray() {
    const channelID = `UCIhSu8oj-mLOZGFgsnXIAjg`
    let data = youtube.getChannelDetails;

    console.log(data);

    data = {
        title: data.title,
        username: data.username,
        deskBanner: data.banner.desktop?.[0]?.url || '',
        mobBanner: data.banner.mobile?.[0]?.url || '',
        avatar: data.avatar[0].url,
        badge: data.badges[0].text,
        channelId: data.channelId,
        country: data.country,
        desc: data.description,
        isFamilySafe: data.isFamilySafe,
        isVerified: data.isVerified,
        isVerifiedArtist: data.isVerifiedArtist,
        joinedDate: data.joinedDateText,
        subscriber: data.stats.subscribersText,
        videos: data.stats.videos,
        views: data.stats.views,
        links: data.links.map(i=>({
            icon: i.icon?.[0]?.url||'',
            url: i.targetUrl,
            title: i.title
        }))
    }
    console.log(data);
    return youtube.getChannelDetailsArray = data
}
getChannelDetailsArray()




















/**=======================================
            SAVE LOCALSTORAGE
 *=======================================*/


const saveLocal = (data) => {
    localStorage.setItem('youtube', JSON.stringify(youtube))
    console.log(`saved ${data} to localStorage`);
}