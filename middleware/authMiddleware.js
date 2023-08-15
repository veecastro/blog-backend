import { verify } from "jsonwebtoken";

export const authGuard = async (req, res, next) => {
    if (
        req.headersauthorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const { id } = verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(id).select("-password");
            next();
        } catch (error) {
            let err = new Error("Not authorized, token failed");
            err.status = 401;
            next(err);
        }
    } else {
        let err = new Error("Not authorized, no token");
        err.status = 401;
        next(err);
    }
};

export const adminGuard = async (req, res, next) => {
    if (req.user && req.user.admin) {
        next();
    } else {
        let err = new Error("Not authorized as an admin");
        err.status = 401;
        next(err);
    }
}






