import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const collectionName = 'products';

const currentSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
}, { versionKey: false });

currentSchema.plugin(mongoosePaginate);
const productsModel = mongoose.model(collectionName, currentSchema);
export default productsModel;