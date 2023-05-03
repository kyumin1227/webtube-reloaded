import express from "express";

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
}

const timeLogger = (req, res, next) => {
  const date = new Date();
  console.log(
    `Time: ${date.getFullYear()}.${date.getMonth()}.${date.getDay()}`
  );
  next();
};

const securityLogger = (req, res, next) => {
  if (req.protocol === "https") {
    console.log("Secure");
  } else {
    console.log("Insecure");
  }
  next();
};

const protectorMiddleware = (req, res, next) => {
  if (req.url !== "/protected") next();
};

const handleHome = (req, res, next) => {
  return res.send("Home");
}

app.use(logger);
app.use(timeLogger);
app.use(securityLogger);
app.use(protectorMiddleware);

app.get("/", handleHome);

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);