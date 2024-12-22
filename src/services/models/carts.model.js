import mongoose from 'mongoose';

const collectionName = 'carts';

const currentSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: Number
            }
        ],
        default: []
    }
}, { versionKey: false });

currentSchema.pre('findOne', function () {
    this.populate("products.product");
});

const cartsModel = mongoose.model(collectionName, currentSchema);
export default cartsModel;