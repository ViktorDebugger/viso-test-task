import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  createTimeEntryHandler,
  getTimeEntriesHandler,
} from "./controllers/time-entry-controller";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/time-entries", createTimeEntryHandler);
app.get("/time-entries", getTimeEntriesHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
