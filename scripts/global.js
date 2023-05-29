async function GoToLink(link,newTab) {
    if(!newTab) return window.location.href = link;
    window.open(link,"_blank");
}

async function FetchData(url) {
    try {
        console.log(`Fetching data for ${url}`);
        const response = await fetch(url);
        const result = await response.json();
        console.log(`Fetch complete`);
        return result;
    } catch (error) {
        console.error("There has been an error");
    }
}