import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../../models/user.js';
import { createSession, setSessionCookies, removeSession } from '../../services/auth/authService.js';

export const registerUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(createHttpError(400, 'Email in use'));
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });

        const session = await createSession(user._id);
        setSessionCookies(res, session);

        res.status(201).json({
            user: { id: user._id, email: user.email }
        });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return next(createHttpError(401, 'Invalid credentials'));
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return next(createHttpError(401, 'Invalid credentials'));
        }

        const session = await createSession(user._id);
        setSessionCookies(res, session);

        res.status(200).json({
            user: { id: user._id, email: user.email }
        });
    } catch (error) {
        next(error);
    }
};


export const refreshUserSession = async (req, res, next) => {
    try {

        const { sessionId } = req.cookies;

        const newSession = await createSession(req.user._id, sessionId);
        setSessionCookies(res, newSession);

        res.status(200).json({ message: 'Session refreshed successfully' });
    } catch (error) {
        next(error);
    }
};

export const logoutUser = async (req, res, next) => {
    try {
        const { sessionId } = req.cookies;

        if (sessionId) {
            await removeSession(sessionId);
        }

        res.clearCookie('sessionId');
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};