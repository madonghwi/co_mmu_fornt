async function handlearticle() {
    const title = document.getElementById("title").value
    const image = document.getElementById("image").files[0]
    const content = document.getElementById("content").value

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("content", content);

    const response = await fetch('http://127.0.0.1:8000/articles/', {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0OTM1ODA5LCJpYXQiOjE2ODQ4OTI2MDksImp0aSI6IjQ4NGZjYmYwYzI3NDQxOTBiYWRlMzFmMzE2OWRkOTc0IiwidXNlcl9pZCI6Mn0.lsdgQjCtlTpsbycg5LnG8wJzZ7wTzdAzY_yFyt-PGFE"
            // "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'POST',
        body: formData
    })

}