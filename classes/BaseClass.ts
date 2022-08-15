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
    public get name1(){
        return this.name
    }

    //setter for name
    public set name1(name: string){
        this.name = name
    }

    // getter for email
    public get email1(){
        return this.name
    }

    //setter for email
    public set email1(email: string){
        this.email = email
    }

    // getter for password
    public get password1(){
        return this.name
    }

    //setter for password
    public set password1(password: string){
        this.password = password
    }
}