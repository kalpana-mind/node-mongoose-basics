const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/shopApp')
  .then(() => {
    console.log('Connection Open!!!');
  })
  .catch((err) => {
    console.log('Oh no error!!');
    console.log(err);
  });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  categories: [String],
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
  size: {
    type: String,
    enum: ['S', 'M', 'L'],
  },
});

productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale;
  return this.save();
};
const Product = mongoose.model('Product', productSchema);

const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: 'Mountain Bike' });
  console.log(foundProduct);
  await foundProduct.toggleOnSale();
  console.log(foundProduct);
};
findProduct();

// const bike = new Product({
//   name: 'BMW',
//   price: 2000,
//   categories: ['Bikes', 'Cars'],
//   qty: { inStore: 12 },
// });
// bike
//   .save()
//   .then((data) => {
//     console.log('It worked');
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log('Oh no error');
//     console.log(err);
//   });

// Product.findOneAndUpdate(
//   { name: 'BMW' },
//   { price: -12.99 },
//   { new: true, runValidators: true }
// )
//   .then((data) => {
//     console.log('It worked');
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log('Oh no error');
//     console.log(err);
//   });
