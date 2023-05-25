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
    location.href = `/templates/users/profile.html?id=${user_id}`
}

// 검색 기능
async function handleSearch() {
    const search = document.getElementById("search").value;

    const response = await fetch('http://127.0.0.1:8000/articles/search/?search='+ search, {
        method:"GET"
    })
    response_json = await response.json()
    location.href = `/templates/article/search_page.html?search=${search}`
}