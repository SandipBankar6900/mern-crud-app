const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { postRouter } = require("./routes/post.routes");
const cros=require("cros")
const app = express();
app.use(cros())

app.use(express.json());



app.use("/users", userRouter);

app.use("/posts", postRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Connected to DB -- Listening on port ${process.env.port}`);
  } catch (error) {
    console.log("ERROR WHILE CONNECTING TO DATABASE - ", error);
  }
});
