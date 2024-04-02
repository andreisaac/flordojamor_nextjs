import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import connectToDatabase from "util/mongoosedb";

const connection = await connectToDatabase();

const adapter = new MongodbAdapter(
	connection.connection.collection("sessions"),
	connection.connection.collection("users")
);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production"
		}
	}
});

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}
