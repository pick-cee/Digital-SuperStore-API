export class OrderClass {
    private orderId: string;
    private productId: string;
    private transactionId: string;

    // constructor used to initialise th fields
    constructor(orderId: string, productId: string, transactionId: string){
        this.orderId = orderId
        this.productId = productId
        this.transactionId = transactionId
    }

    // getter for OrderId
    public get OrderId() {
        return this.orderId
    }

    // setter for OrderId 
    public set OrderId(orderId: string){
        this.orderId = orderId
    }

    // getter for ProductId
    public get ProductId() {
        return this.productId
    }

    // setter for ProductId
    public set ProductId(productId: string){
        this.productId = productId
    }

    // getter for TransactionId
    public get TransactionId() {
        return this.transactionId
    }

    // setter for TransacrionId
    public set TransactionId(transactionId: string){
        this.transactionId = transactionId
    }
}