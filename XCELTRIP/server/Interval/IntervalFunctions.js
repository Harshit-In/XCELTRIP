

const user = require('../models/user');




 //  cashback income distribuction
  async function cashback(member_id){
    const { income_history, chackbackUpdate, Royeltyincome_Model, ClubIncome_Model, lavelIncome_Model } = require('../functions/function');
    const User = require("../models/user")
    const _cashback = require('../models/chackback')
    const cash =  await _cashback.findOne({member_id: member_id })
    const user = await User.findOne({member_id: member_id })
    // console.log(user)
    const cashback_amount = 30;
    const mem_id = user.member_id;
    
    const w_amt = user.new_wallet_amount?parseInt(user.new_wallet_amount)+ 0:0;
    if((user.activeStatus != 0) && cash.count < 25 && cash.time_perioud >=0){
            User.updateOne({member_id: member_id}, {
                $set :{
                    new_wallet_amount: parseInt(user.new_wallet_amount) + parseInt(cashback_amount) ,                    
                }
            }).then(async()=>{
                const amount = parseInt(user.new_wallet_amount)+30
                await income_history(member_id, amount, cashback_amount, "DailyCashbackIncome").then(async(d1)=>{
                    await chackbackUpdate(member_id, cashback_amount) .then((d2)=>{
                    }).catch((error)=>{
                        console.log("Error: *", error.message)
                    })
                })
            }).catch((error)=>{
                console.log("Error: ", error.message)
            })
    } 
    return user.new_wallet_amount
}



 //  qualifyingLevel income distribuction
async function qualifyingLevel(member_id){
    const User = require("../models/user");
    const weeK_Calculate = new Date(Date.now()- (1000*3600*24*15))
    // const data = getDirectAndtotalmember(member_id)
    const perWeekMember = await User.find({"sponsor_id": member_id,createdAt: {
        $gt:  new Date(weeK_Calculate).toISOString(),
        $lt:  new Date(Date.now()).toISOString()
    }})
    const data = await User.aggregate([
        { $match: { "sponsor_id": member_id } },
        {
            $graphLookup: {
                from: "user",
                startWith: "$sponsor_id",
                connectFromField: "member_id",
                connectToField: "sponsor_id",
                as: "children"            
            },
        },
    
    ])
    
    if(data && data.length > 0){
        const past7daychilds = await data[0].children.filter((d)=>{if (new Date(d.createdAt).getTime() > new Date(weeK_Calculate).getTime()) return d})
        const past7daydirect = await data.filter((d)=>{if (new Date(d.createdAt).getTime() > new Date(weeK_Calculate).getTime()) return d})
        const past7daychildsLength = past7daychilds.length
        const past7daydirectLength = past7daydirect.length

        if(past7daychilds.length > 0)
        levelIncome(past7daychildsLength, past7daydirectLength, member_id)
       
        return past7daychilds
    }else {
        console.log("past7daychilds[0]: ", [].length)
        console.log("Totalchilds[0]",[].length)
        return [];
      }
  }


async function levelIncome(past7daychildsLength, past7daydirect, member_id){
    //const { getDirectAndtotalmember } = require('../functions/incomFunctions');
    const User = require("../models/user");
    const day7childslength = past7daychildsLength
    const day7directlength = past7daydirect
        //const data = await getDirectAndtotalmember(member_id);
        const user = await User.findOne({member_id:member_id})
       
}

async function levelWalletConditions(member_id, day7childslength, day7directlength, direct, total_member, userLevel){
    const { lavelIncome_ModelUpdate, lavelIncome_Model, userlevelgo } = require('../Controllers/levelincomController');
    lavelIncome_Model(member_id)
    // MFE2019847
    ;
    if(direct >= 2 && 0 < day7directlength ){
        const w_amt = day7directlength * 200; // per week new Direct
        const incomeType = "NewDistributorIncome"
        const level = 1
        userLevel = await userlevelgo(member_id, 0, 2, 1)
        await lavelIncome_ModelUpdate(member_id, incomeType, level)
        await updateLevelIncomeWellate(member_id, w_amt, incomeType, level)
    }
    if(userLevel >= 1 && day7childslength > 5 && direct >= 3 && total_member >= 5){
        const w_amt = day7childslength * 100; // per week new Direct
        const incomeType = "BusinessDistributor"
        const level = 2
        userLevel = await userlevelgo(member_id, 1, 3, 2)
        await lavelIncome_ModelUpdate(member_id, incomeType, level)
        await updateLevelIncomeWellate(member_id, w_amt, incomeType, level)
    }
    if(userLevel >= 2 && day7childslength > 15 && direct >= 3 && total_member >= 15){
        const w_amt = day7childslength * 60; // per week new Direct
        const incomeType = "GrowthDistributor"
        const level = 3
        userLevel = await userlevelgo(member_id, 2, 4, 3)
        await lavelIncome_ModelUpdate(member_id, incomeType, level)
        await updateLevelIncomeWellate(member_id, w_amt, incomeType, level)
    }
    if(userLevel >= 3 && day7childslength > 49 && direct >= 3 && total_member >= 49){
        const w_amt = day7childslength*40; // per week new Direct
        const incomeType = "PlatinumDistributor"
        const level = 4
        userLevel = await userlevelgo(member_id, 3, 5, 4)
        await lavelIncome_ModelUpdate(member_id, incomeType, level)
        await updateLevelIncomeWellate(member_id, w_amt, incomeType, level)
    }
    if(userLevel >= 4 && day7childslength > 79 && direct >= 3 && total_member >= 79){
        const w_amt = day7childslength*30; // per week new Direct
        const incomeType = "SeniorDistributor"
        const level = 5
        userLevel = await userlevelgo(member_id, 4, 6, 5)
        await lavelIncome_ModelUpdate(member_id, incomeType, level)
        await updateLevelIncomeWellate(member_id, w_amt, incomeType, level)
    }
    if(userLevel == 5 && total_member >= 150){
        const User = require("./models/user")
        const {Royeltyincome_Model, lavelIncome_Model} = require('./functions/function')
        const user = await User.find({sponsor_id: member_id},{level:5},{status:1})
        if(user.length >= 3){
            if(5 <= userLevel && userLevel < 7){
                const w_amt = day7childslength * 20;
                const incomeType = "Diamond Distributor"
                userLevel = await updateLevel(member_id, 6)
                await Royeltyincome_Model(member_id)
                await updateLevelIncomeWellate(member_id, w_amt, incomeType, 6)
            }
                  
        }   
    } 
    if(userLevel == 6 && total_member >= 210){
        const { ClubIncome_Model } = require('./functions/function')
        const user = await User.find({sponsor_id: member_id},{level:6})
        if(user.length >= 3){
            const w_amt = day7childslength * 15;
            const incomeType = "Royal Life Distributor"
            await ClubIncome_Model(member_id)
            userLevel = await updateLevel(member_id, 7)  
            await updateLevelIncomeWellate(member_id, w_amt, incomeType, 6)  
        }   
    } 
    if(userLevel == 7 && total_member >= 330){
        const user = await User.find({sponsor_id: member_id},{level:7})
        if(user.length >= 3){
            const w_amt = day7childslength * 15;
            const incomeType = "Standard Royal Distributor"
            userLevel = await updateLevel(member_id, 8)  
            await updateLevelIncomeWellate(member_id, w_amt, incomeType, 6)
        }
           
    }}
   


async function updateLevelIncomeWellate(member_id, amount, incomeType, level){
    const User = require("../models/user")
    const { income_history } = require('../functions/function')
    const user = await User.findOne({member_id:member_id})
    const w_amt = parseInt(user.new_wallet_amount) + parseInt(amount)
    await User.updateOne({member_id: member_id}, {
        $set :{
            new_wallet_amount: parseInt(w_amt),                    
        }
    }).then((d) => {
        income_history(member_id, parseInt(user.new_wallet_amount) + parseInt(amount), amount, incomeType,level)
    })
}

async function updateLevel(member_id, level){
    const User = require("../models/user")
    const user = await User.findOne({member_id:member_id});
   await  User.updateOne({member_id: member_id}, {
        $set :{
            level: parseInt(level),                    
        }
    });
}




  module.exports = {
    cashback,
    qualifyingLevel,
    // RoyaltyQualifingLevel,
    // ClubQualifingLevel
  }














  // if(userLevel >= 2 && day7childslength >= 15 && direct >= 3 && total_member >= 15){
    //     const w_amt = day7childslength * 60;
    //     const incomeType = "GrowthDistributor"
    //     if(2 <= userLevel < 4){
    //         await updateLevel(member_id, 3)
    //         await lavelIncome_ModelUpdate(member_id, incomeType, 3)
    //     }
    //     await updateLevelIncomeWellate(member_id, w_amt, incomeType, 3)
    // } 
    // if(userLevel >= 3 && day7childslength > 49 && direct >= 5 && total_member >= 49){
    //     const w_amt = day7childslength*40;
    //     const incomeType = "PlatinumDistributor"
    //     if(3 <= userLevel < 5){
    //         await updateLevel(member_id, 4)
    //         await lavelIncome_ModelUpdate(member_id, incomeType, 4)
    //     }
    //     await updateLevelIncomeWellate(member_id, w_amt, incomeType, 4)
    // } 
    // if(userLevel >= 4 && day7childslength > 79 && direct >= 3 && total_member >= 79){
    //     const w_amt = day7childslength*30;
    //     const incomeType = "SeniorDistributor"
    //     if(4 <= userLevel < 6){
    //         await updateLevel(member_id, 5)
    //         await lavelIncome_ModelUpdate(member_id, incomeType, 5)
    //     }
    //     await updateLevelIncomeWellate(member_id, w_amt, incomeType, 5)
    // } 