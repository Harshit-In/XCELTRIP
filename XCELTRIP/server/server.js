const express = require("express");
const fileupload = require("express-fileupload");
const env = require("dotenv");
const cors = require("cors");
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cron = require("node-cron");

const app = express();

// routes
const userRoutes = require("./routers/userRoute");
const adminRoutes = require("./routers/admin/adminRouter");

const user = require("./models/user");
const { main, sendOTP } = require("./functions/mailer");
const { createIncomeHistory } = require("./functions/function");
const { rCm } = require("./Controllers/pinissueController");

// mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.fqkuj.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority

app.use(
  cors({
    origin: "*",
  })
);

// invoirment variable
env.config();

// create mongoose connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ib472.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database Connected");
  });

app.use(bodyParser.json());
app.use(fileupload({}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", userRoutes);
app.use("/api", adminRoutes);

cron.schedule("0 0 * * *", async () => {
  //await generateDailyCashback();
});


// const to = "harshitdubey1996@gmail.com",
// const otp = "1234567"

// sendOTP("harshitdubey1996@gmail.com", 1234567)
/* const { incomDistribute } = require("./Controllers/pinissueController");
incomDistribute("XCEL1000009").then((allParents) => {
  let dt = allParents;
  dt.sort((a, b) => (a.ParentNo > b.ParentNo ? 1 : -1));
  console.log(dt);
  let distinctData = [];
  let lastPaidLevel = null;
  for (parent of dt) {
    if (parent.level > lastPaidLevel || lastPaidLevel==null) {
      lastPaidLevel = parent.level;
      distinctData.push(parent);
    }
  }
  console.log(distinctData);
}); */



//rCm("XCEL1000004", 1000);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
