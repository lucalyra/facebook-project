class PostService{
    getLastPost(userId) {
        return fetch(`http://127.0.0.1:3000/posts/${userId}`)
            .then(res => res.json())
            .then(posts => posts[0].body)
            .then(post => this.storageStringify(post))
            .catch(() => JSON.parse(localStorage.getItem("post")))
    }
    storageStringify(post){
        localStorage.setItem("post", JSON.stringify(post))
    }
}