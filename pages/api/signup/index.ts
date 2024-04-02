// pages/api/signup.ts
import { lucia } from "util/auth";
import { generateId } from "lucia";
import bcrypt from "bcryptjs";
import {User} from "@/models/user";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") {
		res.status(404).end();
		return;
	}

	const body: null | Partial<{ email: string; password: string }> = req.body;
	const email = body?.email;
	if (
		!email ||
		email.length < 3 ||
		email.length > 31 ||
		!/^[a-z0-9_-]+$/.test(email)
	) {
		res.status(400).json({
			error: "Invalid email"
		});
		return;
	}
  const password = body?.password;
  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(password, salt);


	if (!password || password.length < 6 || password.length > 255) {
		res.status(400).json({
			error: "Invalid password"
		});
		return;
	}
	const user = await User.findOneAndUpdate({}, {email: email, hashedPassword: hashedPassword});
  console.log();

	const session = await lucia.createSession(user[0]._id, {});
	res.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
		.status(200)
		.end();
}
