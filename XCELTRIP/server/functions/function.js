const user = require("../models/user");
const User = require("../models/user");

async function getNextId() {
  const user = await User.find({}).sort({createdAt: -1});
  
  const count = (user.member_id?user.member_id: XCE1234567 ) + 1
  //console.log(count, user.member_id )
  return count;
}

async function unique_id() {
  const id =
    Date.now().toString(30) +
    ((Math.random() * 26 + 10) | 0).toString(36).toUpperCase();
  return id;
}
async function getSponser(sponser){
  // console.log(sponser)
  const userName = await User.findOne({member_id: sponser, activeStatus: {$ne : 2} })
  if(userName){
      return userName
  } else {
      return false
  }
  // console.log("sponser",userName)
  
}
function getRChar() {
  return ((Math.random() * 26 + 10) | 0).toString(36).toUpperCase();
}

async function generatePin() {
  const s = getRChar() + getRChar() + Math.floor(Math.random() * 9999 * 7);
  return s;
}

async function income_history(
  member_id,
  total_amount,
  credited_amount,
  income_type,
  level
) {
  const History = require("../models/income_history");
  const tran = await new History({
    member_id,
    total_amount,
    credited_amount,
    income_type,
  });
  tran.save((error, data) => {
    if (error) {
      console.log(
        "Error Comes: functions >> function >> income_history",
        error.message
      );
      return error;
    }
    if (data) {
      return data;
    }
  });
}

async function repurchase_history(
  member_id,
  order_no,
  userCashback,
  adminCashback,
  franchiseCashback,
  franchise_id
) {
  try {
    const History = require("../models/repurchase_history");
    const tran = await new History({
      member_id,
      franchise_id,
      order_no,
      userCashback,
      adminCashback,
      franchiseCashback,
    });
    tran.save((error, data) => {
      if (error) {
        console.log(
          "Error Comes: functions >> function >> repurchase_history",
          error.message
        );
        return error;
      }
      if (data) {
        return data;
      }
    });
  } catch (error) {
    console.log(
      "Error Comes: functions >> function >> repurchase_history",
      error.message
    );
  }
}

async function Royeltyincome_Model(member_id) {
  try {
    const Royalty = require("../models/RoyaltyIncome");
    const tran = await new Royalty({
      member_id: member_id,
    });
    tran.save((data, error) => {
      if (error) {
        console.log(error);
        return error;
      }
      if (data) {
        return data;
      }
    });
  } catch (error) {
    return error;
  }
}

async function lavelIncome_Model(member_id) {
  try {
    const Level = require("../models/lavelincome");
    //  console.log("Level")
    const level = await Level.findOne({ member_id: member_id });
    if (level) {
      // console.log("already")
      return { user: "Level already created" };
    } else {
      const tran = await new Level({
        member_id,
      });
      tran.save((error, data) => {
        if (error) {
          return error;
        }
        if (data) {
          return data;
        }
      });
    }
  } catch (error) {
    return error;
  }
}

async function ClubIncome_Model(member_id) {
  try {
    const Royalty = require("../models/RoyaltyIncome");
    const tran = await new Royalty({
      member_id,
      total_amount,
      credited_amount,
      income_type,
      club_amount,
      club_level,
      total_amount,
    });
    tran.save((error, data) => {
      if (error) {
        return error;
      }
      if (data) {
        return data;
      }
    });
  } catch (error) {
    return error;
  }
}

async function chackbackUpdate(member_id, chackback_amount) {
  const Cashback = require("../models/chackback");
  const cashback = await Cashback.findOne({ member_id: member_id });
  // console.log("_cashback>>>>>>>>>>>>>>>",Cashback.count, Cashback.time_perioud)
  await Cashback.updateOne(
    { member_id: member_id },
    {
      $set: {
        credited_amount: parseInt(chackback_amount),
        chackback_amount:
          cashback.chackback_amount + parseInt(chackback_amount),
        count: cashback.count + 1,
        time_perioud: cashback.time_perioud - 1,
      },
    }
  );
}

async function sendMobileOtp(mobile_no, message) {
  const fetch = require("cross-fetch");
  console.log("message send")
  return await fetch(
    `http://37.59.76.46/api/mt/SendSMS?user=NAYGON&password=q12345&senderid=NADCAB&channel=2&DCS=0&flashsms=0&number=${mobile_no}&text=${message}&route=06`
  );
}

async function findparent(member_id) {
  const User = require("../models/user");
  try {
    const data = await User.aggregate([
      { $match: { member_id: member_id } },
      {
        $graphLookup: {
          from: "user",
          startWith: "$member_id",
          connectFromField: "sponsor_id",
          connectToField: "member_id",
          depthField: "level",
          as: "referal",
        },
      },
      {
        $project: {
          member_id: 1,
          sponsor_id: 1,
          level: 1,
          "referal.member_id": 1,
          // "referal.level": 1,
          "referal.member_name": 1,
        },
      },
    ]);

    if (data && data.length > 0) {
      return data;
    } else {
      // console.log("Hello")
      return [];
    }
  } catch (error) {
    //getDirectAndtotalmember
    console.log(
      "Error from functions >> function >> findparent: ",
      error.message
    );
  }
}

async function UpdateAllParent(member_id, status, amount) {
  try {
    const User = require("../models/user");

    const Allparent = await findparent(member_id);
    const referals = Allparent[0].referal.filter((item) => item.level != 0);
    // console.log(referals);
    switch (status) {
      case 1:
        referals.map(async (d) => {
          const user = await User.findOne({ member_id: d.member_id });
          Update_user_level(
            member_id,
            parseInt(user.direct_coin) + amount,
            parseInt(user.total_coin) + amount
          ); // update user level
          if (d.level == 1) {
            await User.updateOne(
              { member_id: d.member_id },
              {
                $set: {
                  direct: parseInt(user.direct_coin) + amount,
                  total_child: parseInt(user.total_coin) + amount,
                },
              }
            );
          } else {
            await User.updateOne(
              { member_id: d.member_id },
              {
                $set: {
                  total_child: parseInt(user.total_coin) + amount,
                },
              }
            );
          }
        });
        break;
      case -1:
        referals.map(async (d) => {
          const user = await User.findOne({ member_id: d.member_id });
          if (d.level == 0) {
            await User.updateOne(
              { member_id: d.member_id },
              {
                $set: {
                  direct: parseInt(user.direct_coin) - amount,
                  total_child: parseInt(user.total_coin) - amount,
                },
              }
            );
          } else {
            await User.updateOne(
              { member_id: d.member_id },
              {
                $set: {
                  total_child: parseInt(user.total_coin) - amount,
                },
              }
            );
          }
        });
        break;
    }
  } catch (error) {
    return console.log(
      "Error from: functions >> function >> UpdateAllParent ",
      error.message
    );
  }
}

async function Update_user_level(member_id, direct_coin, allChilds) {
  try {
    const user = require("../models/user");
    const userInfo = await user.findOne({ member_id: member_id });
    const currentLevel = userInfo.level;

    /* Update Lavel */
    let newLevel = currentLevel ? currentLevel : 1;
    if (direct_coin >= 2 && currentLevel < 5) {
      if (currentLevel == 100000 && total_coin >= 2500000) {
        newLevel = 5;
      }
      if (currentLevel == 50000 && total_coin >= 500000) {
        newLevel = 4;
      }
      if (currentLevel == 25000 && total_coin >= 100000) {
        newLevel = 3;
      }
      if (currentLevel == 10000 && total_coin >= 50000) {
        newLevel = 2;
      }
    } else {
      const directSeniors = await user
        .find({ sponsor_id: member_id, level: 5 })
        .count();
      const directDiamonds = await user
        .find({ sponsor_id: member_id, level: 6 })
        .count();
      const directRoyalLifeDistributers = await user
        .find({ sponsor_id: member_id, level: 7 })
        .count();
      if (directSeniors >= 3) {
        newLevel = 6;
      }
      if (directDiamonds >= 3) {
        newLevel = 7;
      }
      if (directRoyalLifeDistributers >= 3) {
        newLevel = 8;
      }
    }
    /* will update new level */
    await user.updateOne(
      { member_id },
      {
        $set: {
          level: newLevel,
        },
      }
    );
    if (newLevel == 6) {
      await Royeltyincome_Model(member_id);
    } else if (newLevel == 7) {
      await ClubIncome_Model(member_id);
    }
  } catch (error) {
    console.log("Error from: functions >> function >> Update_user_level");
  }
}

async function diret_and_direct_childlength(req, res) {
  try {
    const User = require("../models/user");
    const { findChild } = require("./incomFunctions");
    const { member_id } = req.body;
    const user = await User.find({ sponsor_id: member_id });
    const total_child = await findChild(member_id);
    let total_member_of_direct = [];
    const a = user.map(async (d) => {
      total_member_of_direct.push({
        member_id: d.member_id,
        member_name: d.member_name,
        total_Direct: d.direct,
        total_member: d.total_child,
        level: d.level,
        activeStatus: d.activeStatus
      });
    });
    Promise.all(a).then((d) => {
      console.log("all updated ");
    });
    // console.log(total_child.length)
    return res
      .status(200)
      .json({
        total_Direct: total_child.length,
        total_member: total_child[0].children.length,
        total_member_of_direct: total_member_of_direct,
      });
  } catch (error) {
    return res
      .status(400)
      .json({
        "error from functions >> function >> total_member_of_direct":
          error.message,
      });
  }
}

function getWeekDate() {
  const currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0);
  const weekStartsFrom = new Date(
    currentDate.getTime() - 1000 * 3600 * 24 * currentDate.getDay()
  );
  return { startDate: weekStartsFrom, endDate: currentDate };
}


async function Roylty_incom_Distribution(req, res) {
  try {
    const weekly_generated_income = require("../models/weekly_generated_income");
    const { startDate, endDate } = getWeekDate();
    const weeklyIncomeData = await weekly_generated_income.aggregate([
      {$match: {member_level: {$gte: 6}}},
      {
        $group: {
          _id: {
            member_id: "$member_id",
          },
          member_id: { $first: "$member_id" },
          member_level: { "$first": "$member_level" },
          directs: { $sum: "$direct_registrations" },
          indirects: { $sum: "$indirect_registrations" },

        },
      } ,
    ]);
    const { findChild } = require("./incomFunctions");
    const User = require('../models/user')
    const user = await User.find({ level: {$gt:5}})
    user.map(async(d) => {
      await User.find({sponsor_id: d.member_id}).then(async(data) => {
       data.map(async(d)=> {
        weeklyIncomeData.map(async(total) => {
          if(total.member_id == d.member_id){
           console.log("Data!",d.member_id, d.sponsor_id, total.indirects, total.member_id)
          }
        })
        })
      })
    })
    return res.status(200).json(weeklyIncomeData);
  } catch (error) {
    return res.status(400).json({ meessag: error.message });
  }
}


module.exports = {
  unique_id,
  getNextId,
  getSponser,
  findparent,
  generatePin,
  sendMobileOtp,
  income_history,
  chackbackUpdate,
  UpdateAllParent,
  ClubIncome_Model,
  lavelIncome_Model,
  repurchase_history,
  Royeltyincome_Model,
  Roylty_incom_Distribution,
  diret_and_direct_childlength,
};
