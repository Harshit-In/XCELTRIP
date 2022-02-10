
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const web3 = new Web3("http://139.59.65.68:8545");
const dexABI =[
	{
		"constant": false,
		"inputs": [
			{
				"name": "amt",
				"type": "uint256"
			},
			{
				"name": "adr",
				"type": "address"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			},
			{
				"name": "level",
				"type": "uint8"
			}
		],
		"name": "usersActiveX3Levels",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_contributors",
				"type": "address[]"
			},
			{
				"name": "_balances",
				"type": "uint256[]"
			},
			{
				"name": "_type",
				"type": "string"
			}
		],
		"name": "multisendTRX",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "magicalpool",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "LAST_LEVEL",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "idToAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "club2",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "lastUserId",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userAddresses",
				"type": "address[]"
			},
			{
				"name": "_amount",
				"type": "uint256"
			},
			{
				"name": "_type",
				"type": "string"
			}
		],
		"name": "airDropTRX",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "daily_reward",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userIds",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "user",
				"type": "address"
			}
		],
		"name": "isUserExists",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			},
			{
				"name": "level",
				"type": "uint8"
			}
		],
		"name": "usersX2Matrix",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address[]"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "club1",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"name": "x3CurrentvId",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint8"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "x2vId_number",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			},
			{
				"name": "referrerAddress",
				"type": "address"
			}
		],
		"name": "owner_registration",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "referrerAddress",
				"type": "address"
			}
		],
		"name": "registrationExt",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "weekly_reward",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "level",
				"type": "uint8"
			}
		],
		"name": "findFreeX2Referrer",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"name": "x2CurrentvId",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"name": "alevelPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			},
			{
				"name": "level",
				"type": "uint8"
			}
		],
		"name": "usersX3Matrix",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address[]"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"name": "x3Index",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "adr",
				"type": "address"
			},
			{
				"name": "_type",
				"type": "uint8"
			}
		],
		"name": "ChangeWallet",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint8"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "x3vId_number",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			},
			{
				"name": "level",
				"type": "uint8"
			}
		],
		"name": "usersActiveX2Levels",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			},
			{
				"name": "level",
				"type": "uint8"
			}
		],
		"name": "usersX6Matrix",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address[]"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "referrer",
				"type": "address"
			},
			{
				"name": "partnersCount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"name": "blevelPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			},
			{
				"name": "level",
				"type": "uint8"
			}
		],
		"name": "usersActiveX6Levels",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "social_cause",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "level",
				"type": "uint8"
			}
		],
		"name": "findFreeX6Referrer",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"name": "x2Index",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"name": "levelPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			},
			{
				"name": "level",
				"type": "uint8"
			}
		],
		"name": "findFreeX3Referrer",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "ownerAddress",
				"type": "address"
			},
			{
				"name": "_magicalpool",
				"type": "address"
			},
			{
				"name": "_club1",
				"type": "address"
			},
			{
				"name": "_club2",
				"type": "address"
			},
			{
				"name": "_daily_reward",
				"type": "address"
			},
			{
				"name": "_weekly_reward",
				"type": "address"
			},
			{
				"name": "_social_cause",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_type",
				"type": "string"
			}
		],
		"name": "Multisended",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_type",
				"type": "string"
			}
		],
		"name": "Airdropped",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "user",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "referrer",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "userId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "referrerId",
				"type": "uint256"
			}
		],
		"name": "Registration",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "user",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "referrer",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "matrix",
				"type": "uint8"
			},
			{
				"indexed": false,
				"name": "level",
				"type": "uint8"
			}
		],
		"name": "Upgrade",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "magicalpool",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "owner",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "club1",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "club2",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "daily_reward",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "weekly_reward",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_for",
				"type": "uint8"
			}
		],
		"name": "GlobalDeduction",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "user",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "referrer",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "matrix",
				"type": "uint8"
			},
			{
				"indexed": false,
				"name": "level",
				"type": "uint8"
			},
			{
				"indexed": false,
				"name": "place",
				"type": "uint8"
			}
		],
		"name": "NewUserPlace",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "referrerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "level",
				"type": "uint256"
			}
		],
		"name": "BiNarical",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "receiver",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_for",
				"type": "string"
			}
		],
		"name": "UserIncome",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "level",
				"type": "uint8"
			}
		],
		"name": "ReEntry",
		"type": "event"
	}
];
// const contract_address = "0x051a1D0DC129D2CFb8d7294b9c7B588c118e2802"; // old contract
const contract_address = "0xdff208FBB084618ed465c4270A9C949782F51547"; //new   //block =366801
const contract = new web3.eth.Contract(dexABI, contract_address);

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fg",
});

conn.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

async function generateEventQuery(result) {
  let block_number = 0;
  let csql_arr = [];
  let sql_arr = [];
  if (result.length > 0 && result[0]["returnValues"]) {
    let i = 0,
      j = 0;
    while (result.length > i) {
      let index = Object.keys(result[i]["returnValues"]);
      let event = result[i]["event"];
      if (event != "SentExtraEthDividends" && event != "MissedEthReceive") {
        let sql = "INSERT INTO `" + result[i]["event"] + "`(";
        let vsql = "VALUES (";

        let csql = "select id from `" + result[i]["event"] + "` where ";

        let k = 0;
        while (index.length > k) {
          if (index[k].length > 2) {
            csql +=
              "" +
              index[k] +
              "='" +
              result[i]["returnValues"][index[k]] +
              "' and ";
            sql += "`" + index[k] + "`,";
            vsql += "'" + result[i]["returnValues"][index[k]] + "',";
          }
          k++;
        }
        let tsmp = new Date() * 1; //$result[$i]['block_timestamp'];
        let transaction_id = result[i]["transactionHash"];
        let block_number = result[i]["blockNumber"];
        let timestamp = await getBlocktoTime(result[i]["blockNumber"]);
        csql += " transaction_id='" + transaction_id + "'";
        csql += " and block_number='" + block_number + "'";
        sql += "`block_timestamp`,`transaction_id`,`block_number`)";
        vsql +=
          "'" +
          timestamp +
          "','" +
          transaction_id +
          "','" +
          block_number +
          "')";
        sql += vsql;
        conn.query(csql, function (err, res) {
          if (err) throw err;
          if (res.length === 0) {
            conn.query(sql, function (err, result) {
              if (err) throw err;
              console.log(result);
            });
          }
        });

        csql_arr.push(csql);
        sql_arr.push(sql);
      }
      i++;
    }
  }
  return { csql: csql_arr, sql: sql_arr, result };
}

function getBlocktoTime(block) {
  return new Promise((resolve, reject) =>
    web3.eth
      .getBlock(block)
      .then((d) => resolve(d.timestamp))
      .catch((e) => reject(e))
  );
}

app.get("/", (req, res) => {
//   forEverExcute();
  conn.query("select * from eventBlock", function (err, result) {
    if (err) throw err;
    web3.eth
      .getBlockNumber()
      .then((d) => {
        let current_block = d;
        console.log(result[0].latest_block);
        contract
          .getPastEvents({
            fromBlock: Number(result[0].latest_block),
            toBlock: Number(result[0].latest_block) + 4000,
          })
          .then(async (events) => {
            let resu = await generateEventQuery(events);
            if (
              parseInt(result[0].latest_block) + 4000 <
              parseInt(current_block)
            ) {
              conn.query(
                `UPDATE eventBlock SET latest_block ='${
                  parseInt(result[0].latest_block) + 4000
                }'`,
                function (err, result) {
                  if (err) throw err;
                  res.write("Executed" + JSON.stringify(resu));
                  res.end();
                }
              );
            }
          })
          .catch((e) => {
            console.log("Err", e);
            res.write("Err:" + JSON.stringify(e));
            res.end();
          });
      })
      .catch((e) => {
        res.write("Executed" + e);
        res.end();
      });
  });
});

// app.post("/multisend", async (req, res) => {
//   let wallets = req.body.wallets;
//   let payable = req.body.payable.toString();
//   let each_wallet = req.body.each_wallet.toString();
//   let type = req.body.type;
//   let private_key = req.body.private_key;
//   let query = req.body.query;
//   console.log(wallets, payable, each_wallet, type, private_key, query);

//   let provider = new HDWalletProvider(private_key, "http://139.59.65.68:8545");

//   web3.setProvider(provider);
//   const accounts = await web3.eth.getAccounts();
//   web3.eth.accounts.wallet.add(private_key);
//   contract.setProvider(provider);
//   const gasPrice = await web3.eth.getGasPrice();
//   contract.methods
//     .airDropTRX(wallets, each_wallet, type)
//     .estimateGas({ value: payable, from: accounts[0] })
//     .then(async (d) => {
//       contract.methods
//         .airDropTRX(wallets, each_wallet, type)
//         .send({
//           value: payable,
//           from: accounts[0],
//           gasPrice: gasPrice,
//           gas: d + 100,
//         })
//         .then((resuslt) => {
//           conn.query(query, function (err, resd) {
//             if (err) throw err;
//             else
//               return res.json({
//                 status: 1,
//                 account: accounts,
//                 contract: resuslt,
//                 engine: provider.engine.stop(),
//                 wallet: wallets,
//                 each_wallet: each_wallet,
//                 type: type,
//                 payable: payable,
//               });
//           });
//         })
//         .catch((e) => {
//           return res.json({
//             status: 0,
//             account: accounts,
//             error: e,
//             engine: provider.engine.stop(),
//             wallet: wallets,
//             each_wallet: each_wallet,
//             type: type,
//             payable: payable,
//           });
//         });
//     })
//     .catch((e) => {
//       return res.json({
//         status: 0,
//         account: accounts,
//         error: e,
//         engine: provider.engine.stop(),
//         wallet: wallets,
//         each_wallet: each_wallet,
//         type: type,
//         payable: payable,
//       });
//     });
// });

// app.post("/owner_registration", async (req, res) => {
//   let userAddress = req.body.userAddress;
//   let refferAddress = req.body.referrerAddress;
//   let private_key = req.body.private_key;
//   try {
// 	let provider = new HDWalletProvider(private_key, "http://139.59.65.68:8545");
// 	web3.setProvider(provider);
//     const accounts = await web3.eth.getAccounts();
//     web3.eth.accounts.wallet.add(private_key);
//     contract.setProvider(provider);
//     const gasPrice = await web3.eth.getGasPrice();
//     let userexist = await contract.methods.isUserExists(userAddress).call();
//     let refferexist = await contract.methods.isUserExists(refferAddress).call();
//     console.log("user", userexist, refferexist);
//     if (!userexist && refferexist) {
//       let gas = await contract.methods
//         .owner_registration(userAddress, refferAddress)
//         .estimateGas({ value: 0, from: accounts[0] });
//       contract.methods
//         .owner_registration(userAddress, refferAddress)
//         .send({ value: 0, from: accounts[0], gasPrice: gasPrice, gas: gas })
//         .then((d) => {
//           return res.json({
//             status: 1,
//             result: d,
//           });
//         })
//         .catch((e) => {
//           return res.json({
//             status: 0,
//             result: e,
//           });
//         });
//     } else {
//       return res.json({
//         status: 0,
//         err: "user and reffer not exist",
//       });
//     }
//   } catch (e) {
// 	  console.log(e);
//     return res.json({ status: 0, error: e });
//   }
// });




// let owner="0xa27f1178115b17CD3c5E2655f196A8B97164b066";
// let private_key="dca62886335d6bdcab35539ed7d68e562b088687d8049041d04ad7153a1e70ab";
// let provider = new HDWalletProvider(private_key, "http://139.59.65.68:8545");
// web3.setProvider(provider);
// web3.eth.accounts.wallet.add(private_key);
// contract.setProvider(provider);
// var res=[];
// var i=0;
// function delayLoop() {
//     if (i < res.length) {
//         setTimeout(async () => {
// 			let user = res[i].user;
// 			let referral = res[i].referral;
// 			try {
// 				    const gasPrice = await web3.eth.getGasPrice();
// 					let userexist = await contract.methods.isUserExists(user).call();
// 					let refferexist = await contract.methods.isUserExists(referral).call();
// 					console.log("user", userexist, refferexist);
// 					if(refferexist){
// 					// referrer exist
// 					 if (!userexist) {
// 					//   let gas = await contract.methods
// 					// 	.owner_registration(user, referral)
// 					// 	.estimateGas({ value: 0, from: owner });
// 					  contract.methods
// 						.owner_registration(user, referral)
// 						.send({ value: 0, from: owner, gasPrice, gas: "21800" })
// 						.then((d) => {
// 						 conn.query(`UPDATE users SET added = '1' WHERE user= '${user}'`,function (err,resu){
// 						  if(err) throw err;
// 						//   i++;
// 						//   forEverExcute();
// 						})
// 						})
// 						.catch((e) => {
// 						 console.log(e);
// 						});
// 					 } else {
// 						 console.log("user already exist",user,referral,i);
// 						 if(userexist){
// 							conn.query(`UPDATE users SET added = '1' WHERE user= '${user}'`,function (err,resu){
// 						  if(err) throw err;
// 						//   i++;
// 						//   forEverExcute();
// 						})
// 						}
// 					}
// 					}else {
// 						// referrer not exist
// 						//  let gas = await contract.methods
// 						// .owner_registration(referral, owner)
// 						// .estimateGas({ value: 0, from: owner });
// 					  contract.methods
// 						.owner_registration(referral, owner)
// 						.send({ value: 0, from: owner, gasPrice, gas: "21800" })
// 						.then((d) => {
// 						 conn.query(`UPDATE users SET refferal_register_by_admin = '1' WHERE user= '${user}'`,function (err,resu){
// 						  if(err) throw err;
// 						//   forEverExcute();
// 						})
// 						})
// 						.catch((e) => {
// 						 console.log(e);
// 						});
// 					}
// 			  } catch (e) {
// 				console.log(e);
// 			  }
// 			i = i + 1;
//            delayLoop();
//         }, 200)
//     }else {
// 		console.log("finish");
// 	}
// }


// function forEverExcute(){
// 	conn.query("SELECT * FROM users where added = 0", function (err,data){
// 	   if(err) throw err;
// 	   		res=data;
// 			console.log(data);
// 	   		setTimeout(()=>delayLoop(),500);
// 	});
// }
// forEverExcute();

app.listen(8080);
