async function GoToLink(link,newTab) {
    if(!newTab) return window.location.href = link;
    window.open(link,"_blank");
}