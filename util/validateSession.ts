import {lucia} from "util/auth";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function validateRequest(req: NextApiRequest, res: NextApiResponse): Promise< object | null> {
	const sessionId = req.cookies["auth_session"];
	if (!sessionId) {
		return null;
	}
	const { session, user } = await lucia.validateSession(sessionId);
	if (!session) {
		res.setHeader("Set-Cookie", lucia.createBlankSessionCookie().serialize());
	}
	if (session && session.fresh) {
		res.setHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize());
	}
	return user;
}