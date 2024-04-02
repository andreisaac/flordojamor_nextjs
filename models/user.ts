import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import mongoose, {Schema, Document} from 'mongoose';



const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

export interface UserDocument extends Document {
  _id: string,
  email: string,
  password: string,
  hashedPassword: string
}

const user : Schema = new Schema({
    _id: Schema.Types.ObjectId,
    email: String,
    password: String,
    hashedPassword: String
  });

  export const User = mongoose.models.User|| mongoose.model<UserDocument>('User', user);

const session : Schema = new Schema({
    _id: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
      required: true
    },
    expires_at: {
      type: Date,
      required: true
    }
  } as const,
  { _id: false }
);

export const Session = mongoose.models.Session|| mongoose.model('Session', session);

const adapter = new MongodbAdapter(
	mongoose.connection.collection("sessions"),
	mongoose.connection.collection("users")
);
