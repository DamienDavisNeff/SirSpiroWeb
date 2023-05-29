window.onload = GetAlert("https://sirspirowebsite-default-rtdb.firebaseio.com/alert.json"); // Gets Announcement Information On Page Load
async function GetAlert(url) {
    var localAlert = localStorage.getItem("alertData"); // Attempts to get info from localStorage
    if(localAlert) {
        parsedData = JSON.parse(localAlert);
        currentTime = new Date().getTime();
        // checks to see if its been less than 2 hours
        if(currentTime - parsedData.timestamp < 2 * 60 * 60 * 1000)  {// 2 hours converted into ms ||| 2hours * 60 minutes * 60 seconds * 1000 ms
            console.log(parsedData.data);
            // if it has, dont bother rechecking announcement
            UpdateAnnouncmentInfo(parsedData.data);
            return;
        }
    }
    // gets announcement data from realtime database
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            UpdateAnnouncmentInfo(data);
            var newData = {
                data: data,
                timestamp: new Date().getTime()
            }
            localStorage.setItem("alertData",JSON.stringify(newData));
        })
        .catch(function(error) {
            console.log('Error fetching data:', error);
            UpdateAnnouncmentInfo(null);
        });
}



async function UpdateAnnouncmentInfo(data) {
    console.log("Updating announcement");
    console.log(data);
    // checks to ensure data is valid & the data should be displayed
    if(data != null && data.isDisplayed && new Date(data.expiresAt) > new Date()) { 
        // and makes announcement visible, and pushes down the rest of the page
        document.querySelector("#announcement-holder").style.display = "";
        document.querySelector("#content").classList.add("push-down");
    } else return; // If the announcment is to be shown, unhide it
    // If each announcement element is to be shown, unhide them
    if(data.contents.title.isDisplayed) document.querySelector("#announce-title").style.display = "";
    if(data.contents.content.isDisplayed) document.querySelector("#announce-content").style.display = "";
    if(data.contents.author.isDisplayed) document.querySelector("#announce-author").style.display = "";
    if(data.contents.date.isDisplayed) document.querySelector("#announce-date").style.display = "";
    // Update each announcment element with it's data
    document.querySelector("#announce-title").innerHTML = data.contents.title.content;
    document.querySelector("#announce-content").innerHTML = data.contents.content.content;
    document.querySelector("#announce-author").innerHTML = data.contents.author.content;
    document.querySelector("#announce-date").innerHTML = new Date(data.contents.date.content).toLocaleString();
    // check if content is overflowing
    if(await isOverflowing(document.querySelector(".announcement-parent"))) duplicateAndScroll(document.querySelector(".announcement-parent"),document.querySelector("#announcement-holder"),"announcement-parent");
}

async function isOverflowing(element) {
    if(element.offsetWidth > window.innerWidth) return true;
    return false;
}

async function duplicateAndScroll(element,parent,_class) {
    var cloned = element.cloneNode(true); // duplicates element
    cloned.style.left = '100%'; // and offsets the clone
    parent.appendChild(cloned); // clone becomes child of parent element
    var scrollElements = document.querySelectorAll(`.${_class}`); // and gets all elements with class
    scrollElements[0].classList.add("scroll"); // and adds offset animations
    scrollElements[1].classList.add("scroll2"); // to each of them
}