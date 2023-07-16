// ITCS227 source code Template for 2T AY 2022-2023
/*
	Program:	Computation of Grades using Function
	Programmer:	Juan Dela Cruz
	Section:	BCS22
	Start Date:	July 15, 2023
	End Date:	July 17, 2023
*/

// load express for our backend
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"

const app = express();

mongoose.connect('mongodb+srv://202110016:FScXIWohtKlAxpwy@cluster0.mrydiey.mongodb.net/an22_sample_database?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
});
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.listen(process.env.PORT || 4000, () => {
    console.log(`API is now online on port ${process.env.PORT || 4000}`)
});

