export class BaseUser {
    private name: string;
    private email: string;
    private password: string

    // constructor used to initialise the fields
    constructor (name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // getter for name
    public get Name(){
        return this.name
    }

    //setter for name
    public set Name(name: string){
        this.name = name
    }

    // getter for email
    public get Email(){
        return this.name
    }

    //setter for email
    public set Email(email: string){
        this.email = email
    }

    // getter for password
    public get Password(){
        return this.name
    }

    //setter for password
    public set Password(password: string){
        this.password = password
    }
}