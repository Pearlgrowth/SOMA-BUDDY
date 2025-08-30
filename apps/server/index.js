import express from "express";
//import { greet } from "@shared/utils";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
res.send("This is greeting from common code");
});

app.listen(port, () => {
console.log(`Server is running at http://localhost:${port}`);
});