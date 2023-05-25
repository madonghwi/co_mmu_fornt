async function handleSignupButton() {
    const response = await handleSignup();
    if (response.status == 201) {
        alert("회원가입 완료")
        window.location.replace(`${frontend_base_url}/users/login.html`)
    } else if (response.status == 400) {
        alert("값을 제대로 입력해 주십시오")
    } else {
        alert(`${response.statusText}`)
    }
}

checkLogin();