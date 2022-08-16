import customerModel from "../models/customer.model";
import { passwordHash, passwordCompare } from "../helpers/bcrypt"

class customerService {
    #customer: any;

    async authenticate(email: string, password: string) {
        this.#customer = await customerModel.findOne({ email: email }).exec();
        if (!this.#customer) return false;

        const matchPassword = await passwordCompare(password, this.#customer.password)
        if (!matchPassword) return false;

        delete this.#customer.password

        return this.#customer

    }
}

export default customerService