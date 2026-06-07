import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../../models/user.js';
import { createSession, setSessionCookies, removeSession } from '../../services/auth/authService.js';
import { Session } from "../../models/session.js";
import {auth} from "../../services/index.js";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw createHttpError(400, 'Email in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const session = await auth.createSession(user._id);
    auth.setSessionCookies(res, session);

    res.status(201).json({
        user: { id: user._id, name: user.name, email: user.email }
    });
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw createHttpError(401, 'Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw createHttpError(401, 'Invalid credentials');
    }

    const session = await auth.createSession(user._id);
    auth.setSessionCookies(res, session);

    res.status(200).json({
        user: { id: user._id, name: user.name, email: user.email }
    });
};

export const refreshUserSession = async (req, res) => {
    const { refreshToken, sessionId } = req.cookies;

    if (!refreshToken || !sessionId) {
        throw createHttpError(401, 'Refresh token or Session ID missing');
    }

    const session = await Session.findById(sessionId);
    if (!session || session.refreshToken !== refreshToken) {
        throw createHttpError(401, 'Session not found or invalid refresh token');
    }

    if (new Date() > new Date(session.refreshTokenValidUntil)) {
        await Session.deleteOne({ _id: sessionId });
        res.clearCookie('sessionId');
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        throw createHttpError(401, 'Refresh token expired. Please login again.');
    }

    const newSession = await auth.createSession(session.userId, sessionId);
    auth.setSessionCookies(res, newSession);

    res.status(200).json({ message: 'Session refreshed successfully' });
};

export const logoutUser = async (req, res) => {
    const { sessionId } = req.cookies;

    if (sessionId) {
        await auth.removeSession(sessionId);
    }

    res.clearCookie('sessionId');
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(204).send();
};