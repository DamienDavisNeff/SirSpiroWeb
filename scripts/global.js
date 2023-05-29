async function GoToLink(link,newTab) {
    if(!newTab) return window.location.href = link;
    window.open(link,"_blank");
}

async function FetchData(url) {
    try {
        const response = await fetch(url);
        return await response.text();
    } catch (error) {
        console.error("There has been an error",error);
    }
}