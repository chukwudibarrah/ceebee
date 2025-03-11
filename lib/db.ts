// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI;

// const connect = async () => {
//     const connectionState = mongoose.connection.readyState;

//     if (connectionState === 1) {
//         console.log('Already connected');
//         return mongoose;
//     }

//     if (connectionState === 2) {
//         console.log('Connecting...');
//         return mongoose;
//     }

//     try {
//         await mongoose.connect(MONGODB_URI!, {
//             dbName: 'portfolio',
//             bufferCommands: true,
//         });
//         console.log('Connected');
//         return mongoose;
//     } catch (err: any) {
//         console.log('Error: ', err);
//         throw new Error(err);
//     }
// };

// export default connect;
