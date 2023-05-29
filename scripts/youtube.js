const channelId = "UCDMbJEDDrYjwT-WZTBK9pEQ";

RecentVideo(channelId);
// CheckStream(channelId);

async function RecentVideo(id) {
    const targetURL = `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`;
    const encodedURL = encodeURIComponent(targetURL);
    const channelURL = `https://cors-proxy.damiendietz2.workers.dev/proxy?url=${encodedURL}`;
    let response;
    try {
        response = await FetchData(channelURL);
    } catch(error) {
        console.error(error);
    }
    const result = await ParseVideoData(response);
    DisplayVideo(result,"#youtube","#youtube-link","#youtube-title","#youtube-date","#youtube-thumbnail")
}

async function DisplayVideo(data,parent,link,titleDisplay,publishDisplay,thumbnailDisplay) {
    if(data == null || data == undefined) {
        console.warn("Data null/undefined")
        if(parent != null || parent != undefined) document.querySelectorAll(parent).forEach(element => {
            element.style.display = "none";
        });
        if(link != null || link != undefined) document.querySelectorAll(link).forEach(element => {
            element.style.display = "none";
        });
        if(titleDisplay != null || titleDisplay != undefined) document.querySelectorAll(titleDisplay).forEach(element => {
            element.style.display = "none";
        });
        if(publishDisplay != null || publishDisplay != undefined) document.querySelectorAll(publishDisplay).forEach(element => {
            element.style.display = "none";
        });
        if(thumbnailDisplay != null || thumbnailDisplay != undefined) document.querySelectorAll(thumbnailDisplay).forEach(element => {
            element.style.display = "none";
        });
        return console.log("All elements hidden");
    }
    for(let a = data.length-1; a > -1; a--) {
        // if I want streams to be included in recent video, comment next line out
        if(data[a].isLive) continue;
        console.log(data[a]);
        document.querySelectorAll(link).forEach(element => {
            element.href = data[a].link;
        });
        if(titleDisplay != null || titleDisplay != undefined) document.querySelectorAll(titleDisplay).forEach(element => {
            element.innerHTML = data[a].title;
        });
        if(publishDisplay != null || publishDisplay != undefined) document.querySelectorAll(publishDisplay).forEach(element => {
            element.innerHTML = new Date(data[a].date).toLocaleDateString();
        });
        if(thumbnailDisplay != null || thumbnailDisplay != undefined) document.querySelectorAll(thumbnailDisplay).forEach(element => {
            element.src = data[a].thumbnail;
            element.alt = data[a].title;
        });
    }
}

// ###

async function ParseVideoData(data) {
    if(data == null || data == undefined) return null;
    if(window.DOMParser) {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(data,"text/xml");
    } else {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(data);
    }
    var entries = xmlDoc.getElementsByTagName("entry");
    var videos = [];
    for(let a = 0; a < entries.length; a++) {
        console.log(entries[a]);
        var isLive = false;
        if(entries[a].getElementsByTagName("media:group")[0].getElementsByTagName("media:description")[0].innerHTML.includes("LIVE=TRUE")) isLive = true;
        const currentVideo = {
            "title":entries[a].getElementsByTagName("title")[0].innerHTML,
            "description":entries[a].getElementsByTagName("media:group")[0].getElementsByTagName("media:description")[0].innerHTML,
            "date":entries[a].getElementsByTagName("published")[0].innerHTML,
            "thumbnail":entries[a].getElementsByTagName("media:group")[0].getElementsByTagName("media:thumbnail")[0].getAttribute("url").replace("hq","maxres"),
            "link":entries[a].getElementsByTagName("link")[0].getAttribute("href"),
            "isLive":isLive
        }
        videos.push(currentVideo);
    }
    return videos;
}