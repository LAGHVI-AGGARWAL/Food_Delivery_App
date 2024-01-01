const mongoose = require('mongoose');

const foodDataSchema = new mongoose.Schema({
    _id : mongoose.ObjectId,
    CategoryName : String,
    description : String,
    img : String,
    name : String,
    options : Array
});

const mongoURI = "mongodb+srv://goFood:Laghvi_project_123@cluster0.nsklcad.mongodb.net/goFood" 
const mongoDB = async() => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(mongoURI);
        console.log('Mongo connected')

        const foodData1 = mongoose.model('foodData1', foodDataSchema, 'foodData2');
        const data = await foodData1.find({}).exec();

            const foodCategory1 = mongoose.model('foodCategory1', foodDataSchema, 'foodCategory');
            const catData = await foodCategory1.find({}).exec();

        // console.log(data);
        global.food_items = data;
        global.foodCategory = catData;
        console.log(global.food_items);
        console.log(global.foodCategory);
    }
    catch(error) {
        console.error(error)
        process.exit(1);
    }
}


module.exports = mongoDB;
