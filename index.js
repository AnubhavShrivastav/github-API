import express from "express";

const app = express();
const PORT = 3000;

// app.get('/', (req, res) => {
//   res.send('Welcome to my server!');
// });

app.get("/json", (req, res) => {
  res.json({ message: "Hello, this is JSON data!", status: "success" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

