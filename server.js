import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db";
import { errorResponseHandler, invalidRouteHandler } from "./middleware/errorHandler";

//Routes
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";


dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("server is running");
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);


app.use(invalidRouteHandler);
app.use(errorResponseHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}
);






