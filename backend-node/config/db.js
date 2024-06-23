import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
      await mongoose.connect('mongodb+srv://mariusfrunza2001:Marioetare1@cluster0.2aw5pon.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0');
      console.log('DB ok');
    } catch (err) {
      console.error('DB error', err);
    }
};