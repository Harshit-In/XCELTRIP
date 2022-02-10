let count_interval = 0;
let cashbackinterval = setInterval(async function() {
    const { cashback, RoyaltyQualifingLevel } = require('./IntervalFunctions');
    count_interval += 1
    console.log(count_interval)
const buyPackage = require('../models/buy_package')

    const approv = await buyPackage.find({status: 1}).limit(2);
    console.log(approv)
        if(approv) {
            const a = approv.map(async (item) => {
              // console.log("item.member_id",item.member_id)
                await cashback("MFEV6U2F8OP");
            })
        } 
        Promise.all(a).then((d)=>{
          console.log("all updated ");
      })  
    // if(count_interval > 25){
    //     clearInterval(cashbackinterval);
    // }
  }, 1000*10)




  const levelIncomInterval = setInterval(async function() {
    const { qualifyingLevel } = require('./IntervalFunctions');
    const buyPackage = require('../models/buy_package')

    const approv = await buyPackage.find({status: 1});
    // console.log(approv)
        // if(approv) {
        //     approv.map((item) => {
                console.log("17d80058f2fC")
                qualifyingLevel("17d80058f2fC");
        //     })
        // } 
    // qualifyingLevel(12345);
  },  10000*2)







  const royaltyIncomnterval = setInterval(async function() {
    const { RoyaltyQualifingLevel } = require('./IntervalFunctions');
    const  user = User.find({ activeStatus: 1 },{total_child:{ $gt : 59}},{direct:{ $gt : 2}},{level:{ $gt : 5}})
    if(user) {
        user.map((item) => {
                RoyaltyQualifingLevel(item.member_id)
        })
    } 
   
  }, 1000*3600*24*7)

 
  const ClubIncomnterval = setInterval(async function() {
    const { ClubQualifingLevel } = require('./IntervalFunctions');
    const  user = User.find({ activeStatus: 1 },{total_child:{ $gt : 149}},{direct:{ $gt : 2}},{level:{ $gt : 5}})
    if(user) {
        user.map((item) => {
                ClubQualifingLevel(item.member_id)
        })
    } 
   
  }, 1000*3600*24*7)




  module.exports = {
    cashbackinterval,
    // levelIncomInterval,
  }

















//   async function appr(){
//     const buyPackage = require('./models/buy_package')
//     const approv = await buyPackage.find({status: 1});
//      if(approv) {
//             approv.map((item) => {
//                 cashback(item.member_id);
//             })
//         }
//     // console.log(approv)
// }

// async function qualifyingLevel(member_id){
//     const User = require("./models/user");
//     const weeK_Calculate = new Date(Date.now()- (1000*3600*24*2))
//     console.log(weeK_Calculate.toLocaleString())
//     // const data = getDirectAndtotalmember(member_id)
//     const perWeekMember = await User.find({"sponsor_id": member_id,createdAt: {
//         $gt:  new Date(weeK_Calculate).toISOString(),
//         $lt:  new Date(Date.now()).toISOString()
//     }})
//    console.log("mem",perWeekMember.length)
//     const data = await User.aggregate([
//         { $match: {
//                 "sponsor_id": member_id,
//                 // "createdAt": {
//                 //     $gt:  new Date(weeK_Calculate).toISOString(),
//                 //     $lt:  new Date(Date.now()).toISOString()
//                 // }
//             }
//         },
//         {
//             $graphLookup: {
//                 from: "user",
//                 startWith: "$sponsor_id",
//                 connectFromField: "member_id",
//                 connectToField: "sponsor_id",
//                 // maxDepth: 5,
//                 // depthField: "numConnections",
//                 as: "children"        
                
//             },
//         },
    
//     ])
//     let children = data[0].children;
//     let past7daychilds = children.filter((d)=>{if (new Date(d.createdAt).getTime() > new Date(weeK_Calculate).getTime()) return d})
//     console.log("past7daychilds: ", past7daychilds.length)
//     console.log("Totalchilds",children.length)
  
//   }



/*88888888888888888qualifyingLevel888888888888888888*/

// async function qualifyingLevel(member_id){
//     const User = require("./models/user");
//     const weeK_Calculate = new Date(Date.now()- (1000*3600*24*7))

//     const data = await User.aggregate([
//         { $match: {
//                 "sponsor_id": member_id,
//             }
//         },
//         {
//             $graphLookup: {
//                 from: "user",
//                 startWith: "$sponsor_id",
//                 connectFromField: "member_id",
//                 connectToField: "sponsor_id",
//                 as: "children"        
                
//             },
//         },
    
//     ])
//     let children = data[0].children ? data[0].children : [];
//     let past7daychilds = children.filter((d)=>{if (new Date(d.createdAt).getTime() > new Date(weeK_Calculate).getTime()) return d})
//     User.updateOne({member_id: member_id}, {
//         $set :{
//             direct: data.length , 
//             total_child: children.length                    
//         }
//     })
//     console.log("direct:", data.length )
//     console.log("past7daychilds: ", past7daychilds.length)
//     console.log("Totalchilds",children.length)

  
//   }
