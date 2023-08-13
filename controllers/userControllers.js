import User from "../models/User";

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        //check if user exists
        let user = await User.findOne({ email });
        if (user) {
            throw new Error("user already exists");
        }
        //create user
        user = await User.create({
            name, email, password
        });

        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            token: await user.generateJWT(),
        });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            throw new Error("email not found");
        }
        if (await user.comparePassword(password)) {
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                admin: user.admin,
                token: await user.generateJWT(),
            });
        } else {
            throw new Error("invalid password");
        }
    } catch (error) {
        next(error);
    }
};

const userProfile = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);
        if (user) {
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                verfiied: user.verified,
                admin: user.admin,

            });
        } else {
            let err = new Error("user not found");
            err.status = 404;
            next(err);
        }
    } catch (error) {
        next(error);
    }
};

const updateProfile = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);

        if (!user) {
            throw new Error("user not found");


        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password && req.body.password.length < 6) {
            throw new Error("password must be at least 6 characters");
        } else if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUserProfile = await user.save();
        res.json({
            _id: updatedUserProfile._id,
            name: updatedUserProfile.name,
            email: updatedUserProfile.email,
            admin: updatedUserProfile.admin,
            token: await updatedUserProfile.generateJWT(),
        });
    } catch (error) {
        next(error);
    }
};





export { registerUser, loginUser, userProfile, updateProfile };
