export class WishlistClass {
    private customerId: string;
    private productId: string;

    // constructor used to initialise th fields
    constructor(customerId: string, productId: string){
        this.customerId = customerId
        this.productId = productId
    }

    // getter for CustomerId
    public get CustomerId() {
        return this.customerId
    }

    // setter for CustomerId 
    public set CustomerId(customerId: string){
        this.customerId = customerId
    }

    // getter for ProductId
    public get ProductId() {
        return this.productId
    }

    // setter for ProductId
    public set ProductId(productId: string){
        this.productId = productId
    }
}