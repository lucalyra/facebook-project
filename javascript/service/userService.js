class UserService{
    getUser(id){
        return fetch('http://127.0.0.1:3000/users/' + id)
            .then(res => res.json())
            .then(info => new CatchUser(info))
            .then(user => this.storageStringify(user))
            .catch(() => JSON.parse(localStorage.getItem("user")))
    }
    storageStringify(user){
        localStorage.setItem("user", JSON.stringify(user))
    }
}
