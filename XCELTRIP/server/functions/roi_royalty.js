async function sendMonthlyROI(dt = null) {
  const CashbackModel = require("../models/cashback");
  const UserModel = require("../models/user");
  const tDate = dt ? new Date(dt) : new Date();
  console.log("ROI Date", tDate);
  const stakings = await CashbackModel.find({ paidMonth: { $lt: 18 } });
  const a = stakings.map(async (stackData) => {
    const stDate = new Date(
      new Date(stackData.createdAt).setUTCHours(0, 0, 0, 0)
    );
    const ltDate = new Date(
      new Date(stackData.last_cashback_date).setUTCHours(0, 0, 0, 0)
    );
    if (
      tDate.getMonth() == ltDate.getMonth() &&
      tDate.getFullYear() == ltDate.getFullYear()
    ) {
      console.log("already paid");
    } else if (stDate.getDate() == tDate.getDate()) {
      console.log("Pay ROI", stDate, stackData.member_id);
      await CashbackModel.updateOne(
        {
          _id: stackData._id,
        },
        { $inc: { paidMonth: 1, paidCashback: stackData.monthly_cashback } },
        { $set: { last_cashback_date: tDate } }
      );
      await UserModel.updateOne(
        { member_id: stackData.member_id },
        { $inc: { cashback_wallet: stackData.monthly_cashback } }
      );
      const CashbackHistoryModel = require("../models/cashback_history");
      await CashbackHistoryModel.insertMany([
        {
          cashback_date: new Date(),
          staking_id: stackData._id,
          member_id: stackData.member_id,
          staking_amount: stackData.plan_amount,
          cashback_amount: stackData.monthly_cashback,
        },
      ]);
    } else {
      //console.log("Don't pay roi");
    }
  });
  Promise.all(a).then(() => {
    //console.log("Stakings :: ", stakings);
  });
}

async function resetCashbackAmount() {
  const CashbackModel = require("./models/cashback");
  const UserModel = require("./models/user");
  const stakings = await CashbackModel.find({});
  const a = stakings.map(async (stackData) => {
    await CashbackModel.updateOne(
      {
        _id: stackData._id,
      },
      {
        $set: {
          paidCashback: 0,
          paidMonth: 0,
          last_cashback_date: stackData.createdAt,
        },
      }
    );
    await UserModel.updateOne(
      { member_id: stackData.member_id },
      { $set: { cashback_wallet: 0 } }
    );
  });
  Promise.all(a).then(() => {
    console.log("Stakings :: ", stakings);
  });
}

async function sendMonthlyRoyalty(dt = null) {
  const UserModel = require("../models/user");
  const HistoryModel = require("../models/history");
  const moment = require("moment");
  const tDate = dt ? moment(dt) : moment();
  /* tDate.setUTCHours(0, 0, 0, 0);
    const sDate = new Date(new Date(
      new Date().getMonth() + "-" + 1 + "-" + new Date().getFullYear()
    ).getTime() + (3600 * 24 * 1000));
    sDate.setUTCHours(0, 0, 0, 0); */
  console.log(tDate);
  const r = await HistoryModel.aggregate([
    {
      $match: {
        income_type: "ID Activation",
        //createdAt: { $gt: tDate },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        totalBusiness: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: -1 } },
  ]);
  console.log(r);
  const lastMonthBusiness = r[0]?.totalBusiness;
  const royaltyAmount = (lastMonthBusiness * 5) / 100;
  console.log(
    "totalBusiness ",
    lastMonthBusiness,
    " royaltyAmount ",
    royaltyAmount
  );
  const level4Members = await UserModel.find({ level: 4 });
  const level5Members = await UserModel.find({ level: 5 });
  const level4rAmount = royaltyAmount / level4Members.length;
  const level5rAmount = royaltyAmount / level5Members.length;
  console.log(
    "level4Members : ",
    level4Members.length,
    "level5Members : ",
    level5Members.length,
    "level4rAmount : ",
    level4rAmount,
    "level5rAmount : ",
    level5rAmount
  );
  console.log("r", r);
  const RoyaltyHistoryModel = require("../models/royalty");
  level4Members.map((member) => {
    /* await UserModel.updateOne(
      { member_id: member.member_id },
      { $inc: { cashback_wallet: level4rAmount/2 } }
    );
    await RoyaltyHistoryModel.updateOne({ member_id: member.member_id,},{
      $set: {
        date: new Date(),
      },
      $inc: {royalty_amount: level4rAmount}
    }); */
  });

  level5Members.map((member) => {
    /* await UserModel.updateOne(
      { member_id: member.member_id },
      { $inc: { cashback_wallet: level5rAmount/2 } }
    );
    await RoyaltyHistoryModel.updateOne({ member_id: member.member_id,},{
      $set: {
        date: new Date(),
      },
      $inc: {royalty_amount: level5rAmount}
    }); */
  });
}

module.exports = {
  sendMonthlyROI,
  sendMonthlyRoyalty,
};
