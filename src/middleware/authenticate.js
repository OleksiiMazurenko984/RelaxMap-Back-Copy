import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
    const { accessToken } = req.cookies;

    if (!accessToken) {
        throw createHttpError(401, 'Access token missing');
    }

    const session = await Session.findOne({ accessToken });
    if (!session) {
        throw createHttpError(401, 'Session not found or invalid token');
    }

    if (new Date() > new Date(session.accessTokenValidUntil)) {
        throw createHttpError(401, 'Access token expired');
    }

    const user = await User.findById(session.userId);
    if (!user) {
        throw createHttpError(401, 'User not found');
    }

    req.user = user;
    req.sessionInfo = session;

    next();
};