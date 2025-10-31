import express from "express";
import cors from "cors";
import aporteRoutes from "./routes/aporte.routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", aporteRoutes);

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
