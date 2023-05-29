window.onload = GetAlert("https://sirspirowebsite-default-rtdb.firebaseio.com/alert.json"); // Gets Announcement Information On Page Load
async function GetAlert(url) {
    console.log("Checking announcement cache for local alert");
    var localAlert = localStorage.getItem("alertData"); // Attempts to get info from localStorage
    if(localAlert) {
        console.log("Cached announcement found");
        parsedData = JSON.parse(localAlert);
        currentTime = new Date().getTime();
        // checks to see if its been less than 2 hours
        console.log("Checking cache announcement age");
        if(currentTime - parsedData.timestamp < 2 * 60 * 60 * 1000)  {// 2 hours converted into ms ||| 2hours * 60 minutes * 60 seconds * 1000 ms
            console.log("Cached announcement is young")
            console.log(parsedData.data);
            // if it has, dont bother rechecking announcement
            UpdateAnnouncmentInfo(parsedData.data);
            return;
        }
        console.warn("Cached announcement is too old");
    }
    // gets announcement data from realtime database
    console.log("Getting updated announcement")
    const data = await FetchData(url);
    console.log(data);
    UpdateAnnouncmentInfo(data);
    var newData = {
        data: data,
        timestamp: new Date().getTime()
    };
    console.log("Saving annoucement to cache")
    localStorage.setItem("alertData",JSON.stringify(newData));
}



async function UpdateAnnouncmentInfo(data) {
    console.log("Updating announcement");
    console.log(data);
    // checks to ensure data is valid & the data should be displayed
    if(data != null && data.isDisplayed && new Date(data.expiresAt) > new Date()) { 
        // and makes announcement visible, and pushes down the rest of the page
        console.log("Announcement is visible, setting elements");
        document.querySelector("#announcement-holder").style.display = "";
        document.querySelector("#content").classList.add("push-down");
    } else return console.warn("Announcement data not provided, or is hidden"); // If the announcment is to be shown, unhide it
    console.log("Checking element display status & updating elements")
    // If each announcement element is to be shown, unhide them
    if(data.contents.title.isDisplayed) document.querySelector("#announce-title").style.display = "";
    if(data.contents.content.isDisplayed) document.querySelector("#announce-content").style.display = "";
    if(data.contents.author.isDisplayed) document.querySelector("#announce-author").style.display = "";
    if(data.contents.date.isDisplayed) document.querySelector("#announce-date").style.display = "";
    console.log("Updating elements with correct data")
    // Update each announcment element with it's data
    document.querySelector("#announce-title").innerHTML = data.contents.title.content;
    document.querySelector("#announce-content").innerHTML = data.contents.content.content;
    document.querySelector("#announce-author").innerHTML = data.contents.author.content;
    document.querySelector("#announce-date").innerHTML = new Date(data.contents.date.content).toLocaleString();
    // check if content is overflowing 
    console.log("Checking announcement length")
    if(await isOverflowing(document.querySelector(".announcement-parent"))) duplicateAndScroll(document.querySelector(".announcement-parent"),document.querySelector("#announcement-holder"),"announcement-parent");
}

async function isOverflowing(element) {
    console.log(`Checking length for \n${element.innerHTML}`)
    if(element.offsetWidth > window.innerWidth) { console.warn("Element overflowing"); return true; }
    console.log("Element not overflowing")
    return false;
}

async function duplicateAndScroll(element,parent,_class) {
    console.log("Cloning element for seamless scroll")
    var cloned = element.cloneNode(true); // duplicates element
    console.log("Offsetting clone for seamless scroll")
    cloned.style.left = '100%'; // and offsets the clone
    parent.appendChild(cloned); // clone becomes child of parent element
    console.log("Adding scroll class to elements")
    var scrollElements = document.querySelectorAll(`.${_class}`); // and gets all elements with class
    scrollElements[0].classList.add("scroll"); // and adds offset animations
    scrollElements[1].classList.add("scroll2"); // to each of them
}