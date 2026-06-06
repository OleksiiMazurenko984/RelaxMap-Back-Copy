import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
    try {
        const { accessToken } = req.cookies;

        if (!accessToken) {
            return next(createHttpError(401, 'Access token missing'));
        }

        const session = await Session.findOne({ accessToken });
        if (!session) {
            return next(createHttpError(401, 'Session not found or invalid token'));
        }

        if (new Date() > new Date(session.accessTokenValidUntil)) {
            return next(createHttpError(401, 'Access token expired'));
        }

        const user = await User.findById(session.userId);
        if (!user) {
            return next(createHttpError(401, 'User not found'));
        }

        req.user = user;
        req.sessionInfo = session;
        next();
    } catch (error) {
        next(error);
    }
};