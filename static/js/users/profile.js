window.onload = async function loadProfile() {
    user = localStorage.getItem("payload")
    user_id = user.split(':')[5].slice(0, -1);
    console.log(user_id)

    const response = await fetch('http://127.0.0.1:8000/users/profile/'+user_id+'/', {
        method:"GET"
    })
    response_json = await response.json()

    const profile_image = document.getElementById("profile_image")
    profile_image.setAttribute("src", response_json["가입정보"]["profile_image_url"])

    const email = document.getElementById("email")
    email.innerText = response_json["가입정보"]["email"]

    const follow_button = document.getElementById("follow_button")
    follow_button.innerText = "팔로우 버튼"
    
    const user_articles = document.getElementById("user_articles")
    response_json["게시글"].forEach(art => {
        const user_article = document.createElement("li")
        user_article.setAttribute("class", "article-container")
        const user_article_title = document.createElement("p")
        user_article_title.innerText = art['title']
        const user_article_content = document.createElement("p")
        user_article_content.innerText = art['content']
        user_article.appendChild(user_article_title)
        user_article.appendChild(user_article_content)
        user_articles.appendChild(user_article)
    })

    const user_like_articles = document.getElementById("user_like_articles")
    response_json["좋아요 게시글"].forEach(art => {
        const user_article = document.createElement("li")
        user_article.setAttribute("class", "article-container")
        const user_article_title = document.createElement("p")
        user_article_title.innerText = art['title']
        const user_article_content = document.createElement("p")
        user_article_content.innerText = art['content']
        user_article.appendChild(user_article_title)
        user_article.appendChild(user_article_content)
        user_like_articles.appendChild(user_article)
    })

    console.log(response_json["가입정보"])
    const follows = document.getElementById("follows")
    response_json["가입정보"]["followings"].forEach(follow => {
        const user_follow = document.createElement("p")
        user_follow.innerText = follow
        follows.appendChild(user_follow)
    })
}