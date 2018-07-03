//new user
class User{
    constructor(name, lastname, pic){
        this.name = name;
        this.lastname = lastname;
        this.profilePic = pic;
        this.fullname = `${this.name} ${this.lastname}`;
    }
    // get fullname(){
    //     return `${this.name} ${this.lastname}`;
    // }

}
