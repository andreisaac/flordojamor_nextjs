// pages/api/login.ts
import bcrypt from "bcryptjs";
import { lucia } from "util/auth";
import connectToDatabase from "@/util/mongoosedb";
import {User} from "@/models/user"

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await connectToDatabase();
	if (req.method !== "POST") {
		res.status(404).end();
		return;
	}
	const body: null | Partial<{ email: string; password: string }> = req.body;
	const email = body?.email;

	if (
		!email ||
		email.length < 3 ||
		email.length > 31
	) {
		res.status(400).json({
			error: "Invalid username"
		});
		return;
	}
	const password = body?.password;

	if (!password || password.length < 6 || password.length > 255) {
		
		res.status(400).json({
			error: "Invalid password"
		});
		return;
	}

	const salt : string = await bcrypt.genSalt(8);
	const hashedPassword : string = await bcrypt.hash(password, salt);
	const user = await User.findOneAndUpdate({email: req.body.email});

	
	

	const passwordIsValid : boolean = await bcrypt.compare(
		password,
		user.hashedPassword
	);

	if (!user) {
		res.status(400).json({
			error: "Incorrect email"
		});
		return;
	}
	if (!passwordIsValid) {
		res.status(400).json({
			error: "Incorrect password"
		});
		return;
	}

	const session = await lucia.createSession(user._id, {});
	res.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
		.status(200)
		.end();
}
