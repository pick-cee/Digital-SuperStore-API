import baseService from '../baseService';
import adminModel from "../../models/admin.model";
import customerModel from '../../models/customer.model';
import productModel from '../../models/product.model';
import cloudinaryUpload from '../../helpers/cloudinary';

const BaseService = new baseService()

class adminService extends baseService {
    #admin: any

    async getAllUsers() {
        const users = await customerModel.find()
        if (!users) {
            throw new Error("No users found")
        }
        return users
    }

    async createProduct(name: any, price: any, description: any, image: any) {
        if (!name && !price && !description) {
            throw new Error("Please fill all fields")
        }
        const data: any = new productModel({
            name: name,
            price: price,
            description: description,
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
        this.#admin = await productModel.find()

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
        const product = await productModel.findById(productId) as any
        if (!product) {
            throw new Error('Produt cannot be found!')
        }
        const { name, price, description } = data


        if (image) {
            await cloudinaryUpload(image.path)
                .then((downloadURL: any) => {
                    product.image = downloadURL
                })
                .catch((err: any) => {
                    throw new Error(`CLOUDINARY ERROR => ${err.message}`)
                })
        }
        for (const field in data) {
            product[field] = data[field]
        }
        await productModel.updateOne({ _id: productId }, { name, price, description, image }, { $new: true })
    }
}

export default adminService