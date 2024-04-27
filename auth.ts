import NextAuth from "next-auth"
import Facebook from "next-auth/providers/facebook"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"


export const { handlers, auth } = NextAuth(req => {
 if (req) {
  console.log(req) // do something with the request
 }
 return {
   providers: [
     Facebook,
     GitHub,
     Google
   ]
 }
});
