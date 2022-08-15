import { BaseUser } from "./BaseClass";

export class AdminClass extends BaseUser {
    private adminId: string

    // constructor used to initialise the fields
    constructor(name: string, email: string, password: string, adminId: string){
        super(name, email, password)
        this.adminId = adminId
    }

    //getter for adminId
    public get adminId1(){
        return this.adminId
    }

    //setter for adminId
    public set adminId1(adminId: string){
        this.adminId = adminId
    }
}