function updateUserPage(){
    let profilePic = document.querySelectorAll("#profilePic");
    profilePic.forEach((profile) => profile.src = username.profilePic)
    let firstName = document.querySelectorAll("#firstName");
    firstName.forEach((name) => name.innerText = username.name)
    let lastName = document.querySelectorAll("#lastName");
    lastName.forEach((name) => name.innerText = username.lastname);
    let postBoxHolder = document.querySelector(".post-box-input");
    postBoxHolder.placeholder = `What's on your mind, ${username.name}?`;

}
updateUserPage()