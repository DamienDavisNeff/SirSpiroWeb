function fetchMerchFeed(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);  // Synchronous request
    xhr.send();

    if (xhr.status === 200) {
        const data = xhr.responseText; // data returned from rss feed
        const parser = new DOMParser(); // parser for rss feed 
        const xmlDoc = parser.parseFromString(data, "text/xml"); // parsed data
        const items = xmlDoc.querySelectorAll("item"); // all items from parsed data

        const entries = Array.from(items).map(item => ({
            
            title:item.querySelector("title").textContent,
            description: item.querySelector("description").textContent,
            details: {
                price: item.querySelector("price").textContent,
                color: item.querySelector("color").textContent,
                size: item.querySelector("size").textContent,
                availability: item.querySelector("availability").textContent,
                weight: item.querySelector("shipping_weight").textContent,
            },
            links: {
                image: item.querySelector("image_link").textContent,
                link: item.querySelector("link").textContent,
            },
            
        })); // adds needed info into cleaner json element


        // code block is unused and unneeded at the moment
        // to be fair this entire script is not doing anything at the moment
        // but it might be useful in the future
        /*
        const stringedEntries = entries.reduce((acc, entry) => {
            acc[entry.title] = entry;
            return acc;
        }, {}); // simplifies entries to have a single element of each title 
        */

        const groupedEntries = entries.reduce((acc, entry) => {
            const { title } = entry;
            if (!acc[title]) {
                acc[title] = [];
            }
            acc[title].push(entry);
            return acc;
        }, {}); // groups similar entries together under its common title

        return groupedEntries;

    } else {
        console.error("Error fetching RSS feed. Status:", xhr.status);
    }
}

const rssUrl = "https://store.sirspiro.com/.well-known/merchant-center/rss.xml";
const merchFeed = fetchMerchFeed(rssUrl);

console.log(merchFeed);
