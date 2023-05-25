async function navOnload() {
    let navbarHtml = await fetch('/templates/nav.html')
    let data = await navbarHtml.text()
    document.querySelector("header").innerHTML = data;
}

navOnload()