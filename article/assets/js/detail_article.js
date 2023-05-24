window.onload = () => {
    Article_Comment_Detail()
}
// =====================게시글 보여주는 부분===========================
// 특정 게시글을 불러올 수 있도록 fetch url도 수정해야한다. 
function Article_Comment_Detail(){
fetch("http://127.0.0.1:8000/articles/1/").then(res => res.json()).then(data => {
let author = data['author']
let title = data['title']
let content = data['content']
let image = data['image']
let created_at = data['created_at']
let updated_at = data['updated_at']
let temp_html =
    `<article>
                    <header>${title}</header>
                    <img style="width: 500px; height: 500px" src="http://127.0.0.1:8000/${image}" alt="..." />
                <p>${content}</p>
                <footer>
                    <p><small>
                        ${author} /
                        ${created_at} /
                        좋아요 갯수
                        <div style="text-align: right;">
    <button onclick="updatecomment()" style="width: 200px; display :inline-block;">수정하기</button>
    <button onclick="handlearticle()" style="width: 200px; display :inline-block;">삭제하기</button>
</div>
                    </small></p>
                </footer>
            </article>`
$('#show_article').append(temp_html)
// 좋아요 수 나오게 수정 해야한다.

// =====================코멘트 보여주는 부분===========================
data['comment'].forEach((a) => {
    
    let id = a['id']
    let user = a['user']
    let comment_contnet = a['content']
    let created_at = a['created_at']
    let updated_at = a['updated_at']
    let temp_html =
        `<article>
            <p>${comment_contnet}</p>
<input id="update_bar" type="text">
<head><small>${user}</small></head>
<p><small>${created_at}</small></p>
<div style="text-align: right;">
    <button onclick="updatecomment(${id})" style="width: 200px; display :inline-block;">수정하기</button>
    <button onclick="deletecomment(${id})" style="width: 200px; display :inline-block;">삭제하기</button>
</div>
</article>`
    $('#show_comments').append(temp_html)

    
})

})
}

// =======================코멘트 작성 부분=============================
async function handlecomment() {
const comment = document.getElementById("comment").value
// 특정 게시글 아티클로 변경해야함.
const response = await fetch('http://127.0.0.1:8000/articles/1/comments/', {
headers: {
    'content-type': 'application/json',
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0OTQwNTEyLCJpYXQiOjE2ODQ4OTczMTIsImp0aSI6IjRjMDQ0ZjI1OTRhOTQzMjNhNmU1ZDE4OWUwMmUwNjYyIiwidXNlcl9pZCI6MX0.RTfYSdJr4-qQW8KE6SPL_PXY0LKPKiaY735NlnSSPQE"
    // "Authorization": "Bearer " + localStorage.getItem("access")
},
method: 'POST',
body: JSON.stringify({
    "content": comment
})
})
window.location.reload()
}

// =======================코멘트 수정 부분=============================
async function updatecomment(commentID) {
const comment = document.getElementById("update_bar").value
// 특정 게시글 아티클로 변경해야함.
const response = await fetch(`http://127.0.0.1:8000/articles/1/comments/${commentID}/`, {
headers: {
    'content-type': 'application/json',
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0OTQwNTEyLCJpYXQiOjE2ODQ4OTczMTIsImp0aSI6IjRjMDQ0ZjI1OTRhOTQzMjNhNmU1ZDE4OWUwMmUwNjYyIiwidXNlcl9pZCI6MX0.RTfYSdJr4-qQW8KE6SPL_PXY0LKPKiaY735NlnSSPQE"
    // "Authorization": "Bearer " + localStorage.getItem("access")
},
method: 'PATCH',
body: JSON.stringify({
    "content": comment
})
})
window.location.reload()
}


async function deletecomment(commentID) {
const response = await fetch(`http://127.0.0.1:8000/articles/1/comments/${commentID}/`, {
headers: {
'content-type': 'application/json',
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0OTQwNTEyLCJpYXQiOjE2ODQ4OTczMTIsImp0aSI6IjRjMDQ0ZjI1OTRhOTQzMjNhNmU1ZDE4OWUwMmUwNjYyIiwidXNlcl9pZCI6MX0.RTfYSdJr4-qQW8KE6SPL_PXY0LKPKiaY735NlnSSPQE"
// "Authorization": "Bearer " + localStorage.getItem("access"),
},
method: 'DELETE',
})
window.location.reload()
}
