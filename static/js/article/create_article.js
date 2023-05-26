// 미리보기 기능
function preview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("article_image").src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
    else {
        document.getElementById("article_image").src = "";
    }
}


async function handlearticle() {
    const title = document.getElementById("title").value;
    const image = document.getElementById("article_image").src;
    const content = document.getElementById("content").value;

    const response = await fetch('http://127.0.0.1:8000/articles/', {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
            'content-type':'application/json', 
        },
        method: 'POST',
        body: JSON.stringify({
            "title": title,
            "content": content,
            "image":image
        })
    })

    location.href = '/templates/main.html';
}

