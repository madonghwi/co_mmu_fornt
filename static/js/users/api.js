const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

// 회원가입
async function handleSignup() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const image_keyword = document.getElementById("profile_image").value

    const response = await fetch(`${backend_base_url}/users/signup/`, {
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password,
            "profile_image": image_keyword,
        })
    })

    return response
}

// 로그인
async function handleLogin() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const response = await fetch(`${backend_base_url}/users/login/`, {
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })

    return response
}