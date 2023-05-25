async function navOnload() {
    let navbarHtml = await fetch('/templates/nav.html')
    let data = await navbarHtml.text()
    document.querySelector("header").innerHTML = data;
}

navOnload()

// 마이페이지 이동
async function myPage() {
    const user = localStorage.getItem("payload")
    const user_id = user.split(':')[5].slice(0, -1);
    console.log(user_id)
    location.href = `../users/profile.html?id=${user_id}`
}