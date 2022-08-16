import customerModel from "../models/customer.model";
import express from 'express'
import { CustomerClass } from "../classes/CustomerClass";
import { passwordHash, passwordCompare } from "../middleware/bcrypt";

export async function createCustomer(request: express.Request, response: express.Response) {
    try {
        const {name, email, password} = request.body;
        const customerExists = await customerModel.findOne({email: email});
        if(customerExists){
            return response.status(400).json({
                message: "Email already exists."
            })
        }
        const hashedPassword = await passwordHash(password)
        const customer = new customerModel({
            name: name,
            email: email,
            password: hashedPassword
        })
        await customer.save()
        return response.status(200).json({
            message: "User created succcessfully!",
            data: customer
        })
    } catch(error) {
        response.status(500).json({
            message: "Some error occured! " + error
        })
    }
    
}