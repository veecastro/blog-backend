import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { errorResponseHandler, invalidRouteHandler } from "./middleware/errorHandler";

//Routes
import userRoutes from "./routes/userRoutes";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("server is running");
});

app.use("/api/users", userRoutes);

app.use(invalidRouteHandler);
app.use(errorResponseHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}
);






