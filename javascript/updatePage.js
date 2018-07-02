function updateUserPage(){
    let profilePic = document.querySelectorAll("#profilePic");
    profilePic.forEach((profile) => profile.src =localStorage.getItem('profilePic'))
    let firstName = document.querySelectorAll("#firstName");
    firstName.forEach((name) => name.innerText = localStorage.getItem('firstName'))
    let lastName = document.querySelectorAll("#lastName");
    lastName.forEach((name) => name.innerText = localStorage.getItem('lastName'));
    let postBoxHolder = document.querySelector(".post-box-input");
    postBoxHolder.placeholder = `What's on your mind, ${localStorage.getItem('firstName')}?`;
    console.log("done")
}
updateUserPage()