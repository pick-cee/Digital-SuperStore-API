import baseService from '../baseService';
import adminModel from "../../models/admin.model";
import customerModel from '../../models/customer.model';
import orderModel from '../../models/order.model';
import productModel from '../../models/product.model';
import cloudinaryUpload from '../../helpers/cloudinary';
import { passwordCompare, passwordHash } from '../../helpers/bcrypt';
import { v2 as cloudinary } from 'cloudinary'
import { resourceLimits } from 'worker_threads';

const BaseService = new baseService()

// INHERITANCE: from baseService
class adminService extends baseService {
    // ABSTRACTION: Attribute hiding || encapsulation
    #admin: any

    // POLYMORPHISM: Method overriding from baseService
    async register(name: any, email: any, password: any): Promise<any> {
        if (!name && !email && !password) {
            throw new Error('Name and email and password are required');
        }
        const admin = await adminModel.findOne({ email: email }).exec()
        if (admin) { throw new Error('Admin already exists') }

        const hashedPassword = await passwordHash(password)
        const Admin = new adminModel({
            name: name,
            email: email,
            password: hashedPassword,
        })
        Admin.save()
        return Admin
    }

    // POLYMORPHISM: Method overriding from baseService
    async authenticate(email: any, password: any): Promise<any> {
        this.#admin = await adminModel.findOne({ email: email }).exec();
        if (!this.#admin) throw new Error('Admin does not exist');

        const matchPassword = await passwordCompare(password, this.#admin.password)
        if (!matchPassword) return false;

        return this.#admin
    }

    async getAllUsers() {
        const users = await customerModel.find()
        if (!users) {
            throw new Error("No users found")
        }
        return users
    }

    async createProduct(name: any, price: any, description: any, image: any, categories: any) {
        if (!name && !price && !description && !image && !categories) {
            throw new Error("Please fill all fields")
        }
        const data: any = new productModel({
            name: name,
            price: price,
            description: description,
            categories: categories,
            image: image
        })

        if (image) {
            await cloudinaryUpload(image.path)
                .then((downloadURL: any) => {
                    data.image = downloadURL
                })
                .catch((err: any) => {
                    throw new Error(`CLOUDINARY ERROR => ${err.message}`)
                })
        }

        await data.save()
        return
    }

    async getAllProducts() {
        this.#admin = await productModel.find().limit(12).exec()

        return this.#admin
    }

    async deleteProduct(productId: any) {
        const product = await productModel.findById(productId)
        if (!product) {
            throw new Error('Product cannot be found!')
        }
        product.delete(productId)
        return
    }

    async updateProduct(productId: any, data: any, image: any) {
        const product = await productModel.findById({ _id: productId }) as any
        if (!product) {
            throw new Error('Product cannot be found!')
        }

        if (image) {
            await cloudinaryUpload(image.path)
                .then((downloadURL: any) => {
                    product.image = downloadURL as string
                })
                .catch((err: any) => {
                    throw new Error(`CLOUDINARY ERROR => ${err.message}`)
                })
        }

        for (const field in data) {
            product[field] = data[field]
        }
        await productModel.updateOne({ _id: productId }, product, { $new: true })
    }

    async getUserMonthlyStats(userId: any) {
        const user = await orderModel.findOne({ userId }).exec()
        if (!user) {
            throw new Error("User does not exist")
        }
        const date = new Date()
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
        const income = await orderModel.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            { $match: { userId: user.userId } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        const totalOrders = await orderModel.find({ userId }).count({ createdAt: { $gte: previousMonth } });
        if (!income) {
            throw new Error("User has not placed any order")
        }
        return { income, totalOrders }
    }

    async getAllUsersMonthlyStats() {
        const user = await orderModel.find().exec()
        const date = new Date()
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
        const income = await orderModel.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        const totalOrders = await orderModel.find().count({ createdAt: { $gte: previousMonth } });
        if (!income) {
            throw new Error("No user has placed an order! 💨")
        }
        return { income, totalOrders }
    }
}

export default adminService