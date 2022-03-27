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
async function distributeIncome() {
  const { incomDistribute } = require("./Controllers/pinissueController");
  const mID = "GDP1005185"; //"GDP1005056";//"GDP1005185";//"GDP1004804"
  const HistoryModel = require("./models/History");
  const allTopups = await HistoryModel.find({
    member_id: mID,
    income_type: "ID Activation",
  });
  console.log("AllTopups", allTopups);
  incomDistribute(mID).then((allParents) => {
    console.log("All Parent to be paid :: ", allParents);
    for (topup of allTopups) {
      const topupAmount = topup.amount;
      console.log("topUpAmount", topupAmount);
      const percentage = [5, 10, 15, 20, 25, 30];
      const UserModal = require("./models/user");
      const incomeType = "Rank Bonus";
      allParents.forEach((parent, index) => {
        let rcPer;
        let rcAmount;
        let diffPer;
        let diffAmount;
        let incomeWallet;
        let coinWallet;
        let sponsorProfit;

        if (parent.ParentNo == 1) {
          rcPer = percentage[parent.level];
          rcAmount = (topupAmount * rcPer) / 100;
          sponsorProfit = rcAmount;
          incomeWallet = Number(rcAmount / 2);
          coinWallet = Number(rcAmount / 2);
          console.log(
            parent,
            "Direct Parent ::",
            "rcPer :: ",
            rcPer,
            "rcAmount :: ",
            rcAmount,
            "amount :: ",
            topupAmount,
            "incomeWallet :: ",
            incomeWallet,
            "coinWallet :: ",
            coinWallet
          );
        } else {
          rcPer = percentage[parent.level];
          if (allParents[index - 1]) {
            diffPer =
              percentage[parent.level] -
              percentage[allParents[index - 1].level];
          } else {
            diffPer = percentage[parent.level];
          }

          rcAmount = (topupAmount * rcPer) / 100;
          diffAmount = (topupAmount * diffPer) / 100;
          sponsorProfit = diffAmount;
          incomeWallet = Number(diffAmount / 2);
          coinWallet = Number(diffAmount / 2);
          console.log(
            parent,
            "InDirect Parent :: ",
            "diffPer :: ",
            diffPer,
            "rcPer :: ",
            rcPer,
            "diffAmount :: ",
            diffAmount,
            "rcAmount :: ",
            rcAmount,
            "amount :: ",
            topupAmount,
            "incomeWallet :: ",
            incomeWallet,
            "coinWallet :: ",
            coinWallet
          );
        }

        /* UserModal.findOne({ member_id: parent.member_id }).then(
          (parentInfo) => {
            //console.log(parentInfo);
            const newIncomeWallet =
              Number(parentInfo.income_wallet) + incomeWallet;
            const newCoinWallet = Number(parentInfo.coin_wallet) + coinWallet;
            const updateInfo = {
              income_wallet: newIncomeWallet,
              coin_wallet: newCoinWallet,
            };
            console.log(
              "oldCoinWallet",
              parentInfo.coin_wallet,
              "oldIncomeWallet",
              parentInfo.income_wallet,
              updateInfo
            );
            UserModal.updateOne(
              { member_id: parent.member_id },
              {
                $set: updateInfo,
              }
            ).then(async () => {
              const incomeType = "Rank Bonus";
              await createIncomeHistory(
                parent.member_id,
                sponsorProfit,
                incomeType,
                memberID
              );
            });
          }
        ); */
      });
    }
  });
}

distributeIncome();

//rCm("XCEL1000004", 1000);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
