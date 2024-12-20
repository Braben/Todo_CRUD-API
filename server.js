const express = require("express");
const dotenv = require("dotenv");
const ConnectTodoAppDB = require("./database/db");
const todoRoutes = require("./routes/todoRoutes");
dotenv.config();

const app = express();
const PORT = process.env.PORT;

///middleware
app.use(express.json());

//database connection
ConnectTodoAppDB();

//routes
app.use(todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
