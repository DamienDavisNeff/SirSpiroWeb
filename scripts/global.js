async function GoToLink(link,newTab) {
    if(!newTab) return window.location.href = link;
    window.open(link,"_blank");
}

async function FetchData(url) {
    try {console.log(`Fetching data for ${url}`);
        const response = await fetch(url);
        console.log(`Fetch complete`);
        console.log(response)
        return await response.text();
    } catch (error) {
        console.error("There has been an error");
    }
}