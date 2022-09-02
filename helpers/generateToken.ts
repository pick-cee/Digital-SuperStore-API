import randToken from "rand-token"
import tokenModel from "../models/token.model"
import customerModel from "../models/customer.model";

export default async function generateToken(userId: any) {
    let random = randToken.generate(10);
    const token = new tokenModel({
        token: random,
        userId: userId,
        expiresIn: new Date().getTime() + 600000,
    })
    const customer = await customerModel.findByIdAndUpdate(userId, { token: random });
    await token.save()
    await customer?.save()
    return random;
}