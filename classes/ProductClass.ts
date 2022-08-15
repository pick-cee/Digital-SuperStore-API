export class ProductClass{
    private productId: string;
    private productName: string;
    private productPrice: number;
    private productDescription: string

    // constructor used to initialise the fields
    constructor(productId: string, productName: string, productPrice: number, productDescription: string) {
        this.productId = productId;
        this.productName = productName
        this.productPrice = productPrice
        this.productDescription = productDescription
    }

    // getter for productId
    public get ProductId() {
        return this.productId
    }

    // setter for productId
    public set ProductId(productId: string){
        this.productId = productId
    }

    // getter for productName
    public get ProductName() {
        return this.productName
    }
    
    // setter for productName
    public set ProductName(productName: string){
        this.productName = productName
    }

    // getter for productPrice
    public get ProductPrice() {
        return this.productPrice
    }
    
    // setter for productPrice
    public set ProductPrice(productPrice: number){
        this.productPrice = productPrice
    }

    // getter for productDescription
    public get ProductDescription() {
        return this.productDescription
    }
    
    // setter for productDescription
    public set ProductDescription(productDescription: string){
        this.productDescription = productDescription
    }
}