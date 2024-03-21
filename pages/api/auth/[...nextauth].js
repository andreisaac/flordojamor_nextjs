import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from '../../util/mongodb'
import bcrypt from "bcryptjs";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "Digite o nome de utilizador"
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "********"
        }
      },
      async authorize(credentials){
        if (credentials.username || credentials.password) {
          const { db } = await connectToDatabase()
          const u = await db.collection('users').find({}).toArray();
          const user= u[0];

          const salt = await bcrypt.genSalt(8);
          const pass = await bcrypt.hash(credentials.password, salt);
          const passwordIsValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if(user.email && user.password && passwordIsValid) {
            return user
          } else {
            return null
          }
        } else {
          return null
        }
      }
    })
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)
