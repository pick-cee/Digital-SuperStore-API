import { CustomerClass } from './CustomerClass';
export class PaymentClass{
    private transactionId: string;
    private item: string;
    private amount: number;
    private customerId: string;
    private isCompleted: boolean;

    // constructor used to initialise the fields
    constructor(customerId: string, transactionId: string, item: string, amount: number, isCompleted: boolean){
        this.customerId = customerId
        this.transactionId = transactionId;
        this.item = item
        this.amount = amount
        this.isCompleted = isCompleted
    }

    // getter for CustomerId
    public get CustomerId() {
        return this.customerId
    }
    
    // setter for CustomerId
    public set CustomerId(customerId: string){
        this.customerId = customerId
    }

    // getter for TransactionId
    public get TransactionId() {
        return this.transactionId
    }
    
    // setter for TransactionId
    public set TransactionId(transactionId: string){
        this.transactionId = transactionId
    }

    // getter for Item
    public get Item() {
        return this.item
    }
    
    // setter for Item
    public set Item(item: string){
        this.item = item
    }

    // getter for Amount
    public get Amount() {
        return this.amount
    }
    
    // setter for Amount
    public set Amount(amount: number){
        this.amount = amount
    }

    // getter for IsCompleted
    public get IsCompleted() {
        return this.isCompleted
    }
    
    // setter for IsCompleted
    public set IsCompleted(isCompleted: boolean){
        this.isCompleted = isCompleted
    }
}