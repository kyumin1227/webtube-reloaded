import "dotenv/config";
import "./db";
import video from "./models/video";
import User from "./models/User";
import Comment from "./models/Comment";
import app from "./server";

const PORT = 4000;

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
