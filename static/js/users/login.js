const backend_base_url = "http://127.0.0.1:8000"

window.onload = function onLoad() {
    var id_focus = document.getElementById("email");
    id_focus.onfocus = function() {
        const id_cell = document.getElementById("id_cell")
        id_cell.setAttribute("class", "bi bi-person-fill")
    }
    id_focus.onblur = function() {
        const id_cell = document.getElementById("id_cell")
        id_cell.setAttribute("class", "bi bi-person")
    }

    var password_focus = document.getElementById("password");
    password_focus.onfocus = function() {
        const password_cell = document.getElementById("password_cell")
        password_cell.setAttribute("class", "bi bi-lock-fill")
    }
    password_focus.onblur = function() {
        const password_cell = document.getElementById("password_cell")
        password_cell.setAttribute("class", "bi bi-lock")
    }
}

async function handleLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${backend_base_url}/users/login/`, {
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body: JSON.stringify({
            "email":email,
            "password":password
        })
    })
    const response_json = await response.json()
    if (response_json.detail==="지정된 자격 증명에 해당하는 활성화된 사용자를 찾을 수 없습니다") {
        alert("비활성화 또는 탈퇴된 회원입니다. 다른 아이디로 로그인해주세요.")
    }
    else {
        localStorage.setItem("access", response_json.access);
        localStorage.setItem("refresh", response_json.refresh);
    
        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        localStorage.setItem("payload", jsonPayload);
        location.href = '/templates/main.html';
    }
}
function redirectToSignup() {
    window.location.href = "/templates/users/signup.html";
  }