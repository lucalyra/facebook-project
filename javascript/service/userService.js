class UserService{
    getUserById(id){
        return fetch('http://127.0.0.1:3000/users/' + id)
            .then(res => res.json())
            .then(info => new CatchUser(info))
            .then(user => this.storageStringify(user))
            .catch(() => JSON.parse(localStorage.getItem("user")))
    }
    getUserByUsername(username){
        return fetch ('http://127.0.0.1:3000/users')
            .then(res => res.json())
            .then(users => users.find(user => user.username == username))
            .then(data => new CatchUser(data))
            .resolve(() => alert("User dosnt exist. Sign up first."))

    }
    storageStringify(user){
        localStorage.setItem("user", JSON.stringify(user))
    }
}

class CatchUser{
    constructor(user){
        this.fullname = user.name;
        this.profilePic = user.profilePic;
        this.id = user.userId;
        this.username = user.username;
        this.email = user.email;
    }
}