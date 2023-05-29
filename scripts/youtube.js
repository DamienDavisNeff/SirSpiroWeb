const channelId = "UCDMbJEDDrYjwT-WZTBK9pEQ";
RecentVideo(channelId);
async function RecentVideo(id) {
    console.log(`Getting the most recent video for channel: ${id}`);
    const channelURL = `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`;
    console.log(`Recent videos (XML): ${channelURL}`);
    const reqURL = `https://api.rss2json.com/v1/api.json?rss_url=${channelURL}`;
    console.log(`Recent videos (JSON): ${reqURL}`);
    const result = await FetchData(reqURL);
    console.log("Fetch complete");
    console.log(result)
    if(result.status != "ok") return console.error("Error in fetching video list")
    console.log(result.items);
    DisplayVideo(result.items[0],"youtube","youtube-link","youtube-title","youtube-date","youtube-thumbnail");
}

async function DisplayVideo(data,parent,link,titleDisplay,publishDisplay,thumbnailDisplay) {
    console.log("Starting to display most recent video");
    console.log(data);
    if(data == null || data == undefined) return console.error("Video data not provided");
    if(parent != null || parent != undefined) {
        console.log("Unhiding parent")
        const parents = document.querySelectorAll(`#${parent}`);
        parents.forEach(element => {
            element.style.display = "";
        });
    }
    console.log("Unhiding elements")
    if(link != null && link != undefined) document.querySelector(`#${link}`).href = data.link;
    if(titleDisplay != null && titleDisplay != undefined) document.querySelector(`#${titleDisplay}`).innerHTML = data.title;
    if(publishDisplay != null && publishDisplay != undefined) document.querySelector(`#${publishDisplay}`).innerHTML = `${new Date(data.pubDate).toLocaleDateString()}`;
    if(thumbnailDisplay != null && thumbnailDisplay != undefined) document.querySelector(`#${thumbnailDisplay}`).src = data.thumbnail;
    console.log("Displaying YouTube video successfully")
}