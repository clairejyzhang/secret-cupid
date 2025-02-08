function redirectToUserPage() {
    const username = document.getElementById("usernameInput").value.trim().toLowerCase();
    const userPageUrl = `users/${username}.html`;

    fetch(userPageUrl)
        .then(response => {
            if (response.ok) {
                window.location.href = userPageUrl;
            } else {
                document.getElementById("errorMessage").textContent = "Username not found.";
            }
        })
        .catch(() => {
            document.getElementById("errorMessage").textContent = "Error checking username.";
        });
}
