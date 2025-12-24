
let youtube = JSON.parse(localStorage.getItem("youtube")) || { search: [], channelData: [], channelRelResult: [], getChannelDetails: [], getChannelDetailsArray: [], tranding: [], trandingArray: [], videoDetails: [] }


/**=======================================
	 HOME API
 *=======================================*/
async function home() {
	const url = 'https://youtube138.p.rapidapi.com/home/?hl=en&gl=US';
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': '4ca77398a4msh7763f9eafb81d5ap10d5a5jsn98c9be3a8843',
			'x-rapidapi-host': 'youtube138.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log(result);
	} catch (error) {
		console.error(error);
	}
}
// home()

/**=======================================
	 global search api
 *=======================================*/
export async function getData(q = 'school4u') {
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
// getData()
window.getData = getData;

/**=======================================
	 get channel from search api
 *=======================================*/
export async function channel() {
	let chInfo = youtube.search;
	if (!chInfo || !Array.isArray(chInfo.contents)) {
		return null;
	}
	const channels = chInfo.contents.filter(c => c.type === 'channel');
	if (!channels.length) {
		return null;
	}
	const ch = channels[0].channel;
	return youtube.channelData = {
		channelId: ch.channelId,
		baseurl: ch.canonicalBaseUrl || '',
		desc: ch.descriptionSnippet || '',
		subscriber: ch.stats?.subscribersText || '0 subscribers',
		title: ch.title || 'Unknown Channel',
		username: ch.username || '',
		img: ch.avatar?.[1]?.url || ch.avatar?.[0]?.url || ''
	};
}


/**=======================================
				channel related results
 *=======================================*/
export async function channelRelResult() {
	let info = youtube.search;
	info = info.contents.filter(c => c.type !== 'channel')
	youtube.channelRelResult = info.map(i => ({
		avatar: i.video.author.avatar[0].url || '',
		channelId: i.video.author.channelId || '',
		videoId: i.video.videoId || '',
		title: i.video.title || '',
		desc: i.video.descriptionSnippet || '',
		views: i.video.stats.views || '',
		publishedTimeText: i.video.publishedTimeText || '',
		isLiveNow: i.video.isLiveNow || '',
		vidLength: i.video.lengthSeconds || '',
		HQ: i.video.thumbnails[1].url || '',
		LQ: i.video.thumbnails[0].url || '',
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
export async function getChannelDetailsArray() {
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
		videos: formatNumber(data.stats.videos),
		views: formatNumber(data.stats.views),
		Uvideos: data.stats.videos,
		Uviews: data.stats.views,
		links: data.links.map(i => ({
			icon: i.icon?.[1]?.url || i.icon?.[0]?.url || '',
			url: i.targetUrl,
			title: i.title
		}))
	}
	return youtube.getChannelDetailsArray = data
}

/**=======================================
				videoDetails
 *=======================================*/
export async function videoDetails() {
	const url = 'https://youtube138.p.rapidapi.com/video/details/?id=kJQP7kiw5Fk&hl=en&gl=US';
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': '4ca77398a4msh7763f9eafb81d5ap10d5a5jsn98c9be3a8843',
			'x-rapidapi-host': 'youtube138.p.rapidapi.com'
		}
	};
	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log(result);
		youtube.videoDetails = result
		saveLocal("videoDetails")
	} catch (error) {
		console.error(error);
	}
}
// videoDetails()


/**=======================================
				videoDetails Array
 *=======================================*/
export async function videoDetailsArray() {
	const data = youtube.videoDetails;
	console.log(data);

}
videoDetailsArray()

/**=======================================
				TRANDING 
 *=======================================*/
async function tranding() {
	if (!youtube.tranding && youtube.tranding.length > 0) { return youtube.tranding }
	const url = 'https://youtube138.p.rapidapi.com/v2/trending';
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': '4ca77398a4msh7763f9eafb81d5ap10d5a5jsn98c9be3a8843',
			'x-rapidapi-host': 'youtube138.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log(result);
		youtube.tranding = result
		saveLocal('tranding')
	} catch (error) {
		console.error(error);
	}
}
// tranding()
/**=======================================
				TRANDING ARRAY
 *=======================================*/
export function trandingArray() {
	let data = youtube.tranding;
	console.log(data);
	data = data.list
	data = data.map(d => ({
		author: d.author,
		authorId: d.authorId,
		authorThumb: d.authorThumbnails?.[5]?.url || d.authorThumbnails?.[4]?.url || d.authorThumbnails?.[1]?.url || d.authorThumbnails?.[0]?.url || '',
		authorUrl: d.authorUrl,
		verified: d.authorVerified,
		desc: d.descriptionHtml,
		publish: d.published,
		publishT: d.publishedText,
		title: d.title,
		videoId: d.videoId,
		views: d.viewCount,
		viewsT: d.viewCountText,
		MQ: d.videoThumbnails?.[3]?.url,
		MQText: d.videoThumbnails?.[3]?.quality,
		HQ: d.videoThumbnails?.[2]?.url,
		HQText: d.videoThumbnails?.[2]?.quality,
	}))
	return youtube.trandingArray = data;
}



















/**=======================================
				SAVE LOCALSTORAGE
 *=======================================*/

const saveLocal = (data) => {
	localStorage.setItem('youtube', JSON.stringify(youtube))
	console.log(`saved ${data} to localStorage`);
}

/**=======================================
				SAVE LOCALSTORAGE
 *=======================================*/
function formatNumber(num) {
	if (Math.abs(num) >= 1.0e+9) {
		return Math.ceil((Math.abs(num) / 1.0e+9)) + 'B'
	} else if (Math.abs(num) >= 1.0e+3) { // 1,000
		return (Math.abs(num) / 1.0e+3) + 'K';
	} else if (Math.abs(num) >= 1.0e+6) { // 1,000,000
		return (Math.abs(num) / 1.0e+6) + 'M';
	} else {
		return num;
	}
}