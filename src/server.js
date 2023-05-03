import express from "express";

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
}

const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    return res.send("<h1>Not Allowed</h1>");
  }
  console.log("Allowed, you may continue.");
  next();
}

const handleProtected = (res, req) => {
  return res.send("<h1>Welcome to the private lounge.</h1>");
}

const handleHome = (req, res, next) => {
  return res.send("Home");
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

app.use(logger);
app.use(privateMiddleware);

app.get("/", handleHome);
app.get("/login", handleLogin);
app.get("/about", handleAbout);
app.get("/contact", handleContact);
app.get("/protected", handleProtected);

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);