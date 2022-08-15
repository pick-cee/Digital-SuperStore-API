import { BaseUser } from "./BaseClass";

export class CustomerClass extends BaseUser {
    private customerId: string;
    private orders: object;
    private wishlist: object;
    private cart: object;

    // constructor used to initialise the fields
    constructor(name: string, email: string, password: string, customerId: string, 
        orders: object, wishlist: object, cart: object)
        {
        super(name, email, password)
        this.customerId = customerId
        this.orders = orders 
        this.wishlist = wishlist
        this.cart = cart
    }

    //getter for customerId
    public get CustomerId(){
        return this.customerId
    }

    //setter for customerId
    public set CustomerId(customerId: string) {
        this.customerId = customerId
    }

    //getter for orders
    public get Orders(){
        return this.orders
    }

    //setter for orders
    public set Orders(orders: object) {
        this.orders = orders
    }

    //getter for wishlist
    public get Wishlist(){
        return this.wishlist
    }

    //setter for wishlist
    public set Wishlist(wishlist: object) {
        this.wishlist = wishlist
    }

    //getter for cart
    public get Cart(){
        return this.cart
    }

    //setter for cart
    public set Cart(cart: object) {
        this.cart = cart
    }
}