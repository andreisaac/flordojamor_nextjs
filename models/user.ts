import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import mongoose, { Schema, Document } from 'mongoose';

// Email validation function
const validateEmail = function(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

// User document interface
export interface UserDocument extends Document {
  _id: string;
  email: string;
  password: string;
  hashedPassword: string;
}

// User schema definition with email validation
const userSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  email: {
    type: String,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  }
});

export const User = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);

// Session schema definition
const sessionSchema: Schema = new Schema({
  _id: {
    type: String,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  expires_at: {
    type: Date,
    required: true
  }
}, { _id: false });

export const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema);



let adapter: MongodbAdapter | undefined;
const getAdapter = () => {
  if (!adapter) {
    adapter = new MongodbAdapter(
      mongoose.connection.db?.collection("sessions") as any,
      mongoose.connection.db?.collection("users") as any
    );
  }
  return adapter;
};

export default adapter;
