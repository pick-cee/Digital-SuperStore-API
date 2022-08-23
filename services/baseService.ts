import customerModel from "../models/customer.model";
import { passwordHash, passwordCompare } from "../helpers/bcrypt"
import { sendmail } from "../helpers/mailer"
import generateToken from '../helpers/generateToken'
import passwordTokenModel from "../models/passwordToken.model";
import tokenModel from "../models/token.model";
import productModel from "../models/product.model";

class baseService {
    #customer: any;

    async register(name: string, email: string, password: string) {
        if (!name && !email && !password) {
            throw new Error('Name and email and password are required');
        }
        this.#customer = await customerModel.findOne({ email: email }).exec()
        if (this.#customer) { throw new Error('User already exists') }

        const hashedPassword = await passwordHash(password)
        const customer = new customerModel({
            name: name,
            email: email,
            password: hashedPassword,
        })
        return customer
    }

    async authenticate(email: string, password: string) {
        this.#customer = await customerModel.findOne({ email: email }).exec();
        if (!this.#customer) return false;

        const matchPassword = await passwordCompare(password, this.#customer.password)
        if (!matchPassword) return false;

        return this.#customer
    }

    async getByEmail(email: string) {
        this.#customer = await customerModel.findOne({ email: email }).exec();
        if (!this.#customer) {
            throw new Error('User not found')
        }
        delete this.#customer.password
        return this.#customer
    }

    async getById(id: string) {
        this.#customer = await customerModel.findOne({ _id: id }).exec()
        if (!this.#customer) {
            throw new Error('User not found')
        }
        delete this.#customer.password
        return this.#customer
    }

    async forgetPassword(email: string) {
        this.#customer = await customerModel.findOne({ email: email }).exec()
        if (!this.#customer) {
            throw new Error('User not found')
        }
        const token = await generateToken(this.#customer._id)
        let subject = "DIGITAL SUPERSTORE";
        let html = `
        <br /><div style="flex-direction:column; justify-content:center; align-items:center;">
            <h1>Request successful!</h1>
            <p>Please use this code to reset your password: ${token}</p>
            <p>This token will expire in 10 minutes</p>
            <p>Digital Superstore! </p><br><br>
        </div>
        `;
        await sendmail(html, subject, this.#customer.email)
        const passwordToken = new passwordTokenModel({
            token: token,
            userId: this.#customer._id,
        })
        await passwordToken.save()
        return
    }

    async resetPassword(token: string, password: string, confirmPassword: string) {
        if (!password && !confirmPassword) {
            throw new Error('Password and confirm password are required')
        }
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match")
        }
        const token1 = await passwordTokenModel.findOne({ token: token }).exec()
        if (!token1) {
            throw new Error("Token is invalid!")
        }
        if (token1.expiresIn! < new Date().getTime()) {
            throw new Error("Token is expired!")
        }
        const customer = await customerModel.findOne({ _id: token1.userId }).exec()
        const hashedPassword = await passwordHash(password)
        if (customer != undefined) {
            customer.password = hashedPassword;
        }
        await customer?.save()
        return
    }

    async verifyEmail(userId: string, token: string) {
        const customer1 = await tokenModel.findOne({ userId, token }).exec()
        const customer = await customerModel.findOne({ userId }).exec()
        console.log(customer1);

        if (customer1?.expiresIn != undefined) {
            if (customer1?.expiresIn < new Date().getTime()) {
                throw new Error("Token is expired!")
            }
        }

        if (customer != undefined) {
            customer.isVerified = true
            await customer.save()
        }
        await customer?.save()
        return
    }

    async resendToken(id: string, email: string) {
        const customer = await customerModel.findOne({ email: email }).exec()
        if (customer != undefined) {
            email = customer.email
        }
        if (!customer) {
            throw new Error("User not found!")
        }
        const random = await generateToken(id);
        let subject = "DIGITAL SUPERSTORE";
        let html = `
        <br /><div style="flex-direction:column; justify-content:center; align-items:center;">
            <h1>Request successful!</h1>
            <p>Use this code to verify your email: ${random}</p>
            <p>This token will expire in 10 minutes</p>
            <p>Digital Superstore! </p><br><br>
        </div>
        `;

        await sendmail(html, subject, customer.email)
        console.log("Customer: ", customer)
        console.log("email: ", customer?.email)
        return
    }

    async getProductsFromCategory(search: string) {
        const product = await productModel.find({ category: search }).limit(10).exec()
        return product
    }

    async searchProducts(searchQuery: string) {
        const product = await productModel.find({ name: { $regex: searchQuery, $options: 'i' } }).limit(10).exec()
        return product
    }
}

export default baseService