import express from "express";

const PORT = 4000;

const app = express();

const handleHome = (req, res) => {
    return res.send("Message");
}

const handleLogin = (req, res) => {
    return res.send("Login here.");
}

const handleAbout = (req, res) => {
  return res.send("<h1>About<h1>");
};

const handleContact = (req, res) => {
  return res.send("<h1>Contact<h1>");
};

app.get("/", handleHome);
app.get("/login", handleLogin);
app.get("/about", handleAbout);
app.get("/contact", handleContact);

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);