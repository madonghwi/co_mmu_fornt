window.onload = async function detailArticle() {
    const user = localStorage.getItem("payload")
    const user_id = user.split(':')[5].slice(0, -1);
    console.log("user_id pk : " + user_id)

    const urlParams = new URL(location.href).searchParams;
    const article_id = urlParams.get('id');
    console.log("article_id : " + article_id)

    // =====================게시글 보여주는 부분===========================
    const response = await fetch('http://127.0.0.1:8000/articles/'+article_id+'/', {
        method:"GET"
    })
    response_json = await response.json()
    console.log(response_json)

    const article_title = document.getElementById("article_title")
    article_title.innerText = response_json['title']
    const article_content = document.getElementById("article_content")
    article_content.innerText = response_json['content']

    const article_image = document.getElementById("article_image")
    if (response_json['image']!==null) {
        const article_img = document.createElement('img')
        article_img.setAttribute("src", 'http://127.0.0.1:8000'+ response_json['image'])
        article_image.appendChild(article_img)
    }

    const time = response_json['updated_at'].split('T')[0].split('-')
    const article_author = document.getElementById("article_author")
    article_author.innerText = `${response_json['author']} · ${time[0]}년 ${time[1]}월 ${time[2]}일`

    const article_likes_count = document.getElementById("article_likes_count")
    article_likes_count.innerText = `좋아요 ${response_json['likes'].length}개`

    // =====================코멘트 보여주는 부분===========================
    const comment_count = document.getElementById("comment_count")
    comment_count.innerText = `${response_json['comment'].length}개의 댓글`

    const comments = document.getElementById("comments")
    response_json["comment"].forEach(comment => {
        const comment_list = document.createElement("li")
        comment_list.setAttribute("class", "comment_list")

        const comment_list_div = document.createElement('div')

        const comment_time = comment['updated_at'].split("T")[0].split('-')
        const comment_author = document.createElement("p")
        comment_author.innerText = `${comment['user']} · ${comment_time[0]}년 ${comment_time[1]}월 ${comment_time[2]}일`
        comment_list_div.appendChild(comment_author)

        const comment_content = document.createElement('p')
        comment_content.setAttribute('id', `comment_${comment['id']}`)
        comment_content.innerText = comment['content']
        comment_list_div.appendChild(comment_content)

        //=====================코멘트 수정, 삭제 버튼 보여주는 부분===========================
        const comment_button = document.createElement('div')
        const comment_button_edit = document.createElement('button')
        comment_button_edit.setAttribute('type', 'button')
        comment_button_edit.setAttribute('id', `${comment['id']}`)
        comment_button_edit.setAttribute('onclick', `updatecomment(this.id)`)
        comment_button_edit.innerText = "수정"
        comment_button.appendChild(comment_button_edit)

        const comment_button_delete = document.createElement('button')
        comment_button_delete.setAttribute('type', 'button')
        comment_button_delete.setAttribute('id', `${comment['id']}`)
        comment_button_delete.setAttribute('onclick', `deletecomment(this.id)`)
        comment_button_delete.innerText = "삭제"
        comment_button.appendChild(comment_button_delete)

        comment_button.setAttribute('style', 'display:none;')

        comment_list.appendChild(comment_list_div)
        comment_list.appendChild(comment_button)


        comments.appendChild(comment_list)
        //=====================코멘트 수정, 삭제 버튼 보여주는 부분===========================
        if (response_json["author"]===comment['user']) {
            comment_button.setAttribute('style', 'display:block;')
        }
    })
    console.log(response_json)
    //=====================좋아요 보여주는 부분===========================
    console.log(user_id in response_json['likes'])
    if (user_id in response_json['likes']) {
        const likes_button_icon = document.getElementById("likes_button_icon")
        likes_button_icon.setAttribute("class", "bi bi-balloon-heart-fill")
        likes_button_icon.setAttribute("style", "color:red;")
    }
    else {
        const likes_button_icon = document.getElementById("likes_button_icon")
        likes_button_icon.setAttribute("class", "bi bi-balloon-heart")
    }
}

// =======================코멘트 작성 부분=============================
async function handlecomment() {
    const urlParams = new URL(location.href).searchParams;
    const article_id = urlParams.get('id');
    console.log("article_id : " + article_id)


    const comment = document.getElementById("comment").value;
    const response = await fetch('http://127.0.0.1:8000/articles/'+article_id+'/comments/', {
        headers: {
            'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
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
    const comment_input = document.getElementById(`comment_${commentID}`)
    const comment_p = document.getElementById(`comment_${commentID}`).innerText;
    comment_input.innerHTML = `<input type="text" name="" id="update_bar" class="comment_edit_input" value="${comment_p}" placeholder="댓글..">`
    const update_button = document.getElementById(`${commentID}`)
    update_button.setAttribute("onclick", `handleUpdateComment(${commentID})`)
}

async function handleUpdateComment(commentId) {
    const urlParams = new URL(location.href).searchParams;
    const article_id = urlParams.get('id');

    const update_content = document.getElementById("update_bar").value;
    if (update_content==='') {
        alert("댓글을 입력해주세요.")
    }
    else {
        const response = await fetch(`http://127.0.0.1:8000/articles/${article_id}/comments/${commentId}/`,{
            headers: {
                'content-type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access"),
            },
            method:"PATCH",
            body: JSON.stringify({
                "content":update_content
            })
        })
        window.location.reload()
    }
}

// =======================코멘트 삭제 부분=============================
async function deletecomment(commentID) {
    const urlParams = new URL(location.href).searchParams;
    const article_id = urlParams.get('id');

    const response = await fetch(`http://127.0.0.1:8000/articles/${article_id}/comments/${commentID}/`, {

        headers: {
        'content-type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        method: 'DELETE',
    })
    window.location.reload()
}

// =======================좋아요 버튼 부분=============================
// ajax 활용
function handleLike() {
    const urlParams = new URL(location.href).searchParams;
    const profile_id = urlParams.get('id');
    const likes_button_icon = document.getElementById("likes_button_icon")

    $.ajax({
        url : 'http://127.0.0.1:8000/articles/likes/'+profile_id+'/',
        type : "POST",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("access"),
        },
        success: function(data) {
            if(data === "like") {
                likes_button_icon.setAttribute("class", "bi bi-balloon-heart-fill")
                likes_button_icon.setAttribute("style", "color:red;")
                console.log(data)
            }
            else {
                likes_button_icon.setAttribute("class", "bi bi-balloon-heart")
                console.log(data)
            }
        }
    })
}