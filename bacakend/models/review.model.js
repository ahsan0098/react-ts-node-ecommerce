/*===========*****===========imports===========*****===========*/
import mongoose from "mongoose"
import Product from "./product.model.js";
/*===========*****===========imports===========*****===========*/


/*===========*****===========schema===========*****===========*/
const _schema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: [true, 'Please provide rating'],
        },
        title: {
            type: String,
            trim: true,
            required: [true, 'Please provide review title'],
            maxlength: 100,
        },
        comment: {
            type: String,
            required: [true, 'Please provide review text'],
        },
        buyer: {
            type: mongoose.Schema.ObjectId,
            ref: 'Buyer',
            required: true,
        },
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
            required: true,
        },
    },
    { timestamps: true }
);

/*===========*****===========schema===========*****===========*/


/*===========*****===========aggregation===========*****===========*/
_schema.statics.calculateStats = async function (productId) {
    const result = await this.aggregate([
        {
            $match: { product: productId }
        },
        {
            $group: {
                _id: '$product',
                averageRating: { $avg: '$rating' },
                numOfReviews: { $sum: 1 }
            }
        }
    ]);

    try {
        if (result.length > 0) {
            await mongoose.model('Product').findByIdAndUpdate(productId, {
                averageRating: Math.round(result[0].averageRating * 10) / 10,
                numOfReviews: result[0].numOfReviews
            });
        } else {
            await mongoose.model('Product').findByIdAndUpdate(productId, {
                averageRating: 0,
                numOfReviews: 0
            });
        }
    } catch (error) {
        console.error('Failed to update product stats:', error);
    }
};
/*===========*****===========aggregation===========*****===========*/


/*===========*****===========saving===========*****===========*/
_schema.methods.saveWithStats = async function () {
    await this.constructor.calculateStats(this.product);
    await this.save();
};

/*===========*****===========saving===========*****===========*/


/*===========*****===========deleting===========*****===========*/
_schema.methods.deleteWithStats = async function () {
    await this.deleteOne();
    await this.constructor.calculateStats(this.product);
};
/*===========*****===========deleting===========*****===========*/


/*===========*****===========update product reviews on save===========*****===========*/
_schema.statics.incrementProductStats = async function (productId, rating) {

    const product = await Product.findById(productId);
    const totalRating = product.averageRating * product.numOfReviews + rating;
    const newCount = product.numOfReviews + 1;

    product.numOfReviews = newCount;
    product.averageRating = Math.round((totalRating / newCount) * 10) / 10;

    await product.save();
};
/*===========*****===========update product reviews on save===========*****===========*/


/*===========*****===========update product reviews on delete===========*****===========*/
_schema.statics.decrementProductStats = async function (productId, rating) {
    const product = await Product.findById(productId);


    const totalRating = product.averageRating * product.numOfReviews - rating;
    const newCount = product.numOfReviews - 1;

    product.numOfReviews = newCount;
    product.averageRating = Math.round((totalRating / newCount) * 10) / 10;


    await product.save();
};
/*===========*****===========update product reviews on delete===========*****===========*/


/*===========*****===========export===========*****===========*/
const Review = mongoose.model("Review", _schema)
export default Review;