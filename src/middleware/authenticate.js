import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
    try {
        const { accessToken, refreshToken, sessionId } = req.cookies;

        if (!sessionId) {
            return next(createHttpError(401, 'Session ID missing'));
        }

        const session = await Session.findById(sessionId);
        if (!session) {
            return next(createHttpError(401, 'Session not found'));
        }

        if (req.originalUrl === '/auth/refresh') {
            if (!refreshToken || refreshToken !== session.refreshToken) {
                return next(createHttpError(401, 'Invalid refresh token'));
            }
            if (new Date() > new Date(session.refreshTokenValidUntil)) {
                await Session.deleteOne({ _id: sessionId });
                return next(createHttpError(401, 'Refresh token expired. Please login again.'));
            }
        }
        else {
            if (!accessToken || accessToken !== session.accessToken) {
                return next(createHttpError(401, 'Invalid access token'));
            }
            if (new Date() > new Date(session.accessTokenValidUntil)) {
                return next(createHttpError(401, 'Access token expired'));
            }
        }

        const user = await User.findById(session.userId);
        if (!user) {
            return next(createHttpError(401, 'User not found'));
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};