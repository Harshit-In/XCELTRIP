const Web3 = require('web3');
const  tokenAddress="0x7b26C55B8daef5f803f00D01C4C5A481ba3cbD1B";
const tokenABI=[{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"wallet","type":"address"}],"name":"bnbWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_contract","type":"address"},{"internalType":"address","name":"wallet","type":"address"}],"name":"dustTransfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const contractAddress="0x45aa9144B5B6997Ff95aF1CAFCa1D282D179aBD5";
const contractABI=[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"uid","type":"string"},{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"investor","type":"address"},{"indexed":false,"internalType":"uint256","name":"WithAmt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"netAmt","type":"uint256"}],"name":"MemberPayment","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"NetQty","type":"uint256"}],"name":"Payment","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_uid","type":"string"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"ownerAddress","type":"address"},{"internalType":"contract IERC20","name":"_busdToken","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable[]","name":"_contributors","type":"address[]"},{"internalType":"uint256[]","name":"_balances","type":"uint256[]"},{"internalType":"uint256","name":"totalQty","type":"uint256"},{"internalType":"uint256[]","name":"NetAmt","type":"uint256[]"}],"name":"multisendToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recepient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"userWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

const ownerAddress = ""

//const web3 = new Web3("https://rpc01.bdltscan.io/");


function toFixed(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    return String(x);
  }
  
  function round(number) {
    return Math.round(number * 1000) / 1000;
  }
  
  function getBlocktoTime(block) {
    return new Promise((resolve, reject) =>
      web3.eth
        .getBlock(block)
        .then((d) => resolve(d.timestamp))
        .catch((e) => reject(e))
    );
  }

  async function generateEventQuery(result) {
    let block_number = 0;
    let csql_arr = [];
    let sql_arr = [];
    if (result.length > 0 && result[0]["returnValues"]) {
      let i = 0,
        j = 0,
        userId = 0;
      referrer = '';
      while (result.length > i) {
        let index = Object.keys(result[i]["returnValues"]);
        let event = result[i]["event"];
        if (
          event != "SentExtraEthDividends" &&
          event != "MissedEthReceive" &&
          event != undefined &&
          event != "AdminChanged" &&
          event != "Upgraded"
        ) {
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
              if (index[k] === 'userId') {
                userId = result[i]["returnValues"][index[k]];
              }
              if (index[k] === 'referrer') {
                referrer = result[i]["returnValues"][index[k]];
              }
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
              });
            }
          });
  
          csql_arr.push(csql);
          sql_arr.push(sql);
        }
        if (event === 'Registration') {
          conn.query(`SELECT count(*) as total from Registration Where referrer = '${referrer}'`,
            function (err, result) {
              if (err) throw err;
              if (result) {
                conn.query(
                  `Update Registration SET direct_member = '${result[0].total + 1}'  where user = '${referrer}'`,
                  function (err, result) {
                    if (err) throw err;
                  })
              }
            })
          let i = 1;
          conn.query(
            `Update Registration SET level = '${i}'  Where user = '${referrer}' and  level < '${i}'`,
            function (err, result) {
              if (err) throw err;
              if (result.changedRows > 0) {
                i++;
                recursive_data()
                function recursive_data() {
                  conn.query(
                    `Select * from Registration where user = '${referrer}' and  user != '0x0000000000000000000000000000000000000000'`,
                    function (err, result) {
                      if (err) throw err;
                      console.log("ID  :: ", result)
                      if (result.length > 0) {
                        referrer = result[0].referrer;
                        conn.query(
                          `Update Registration SET level = '${i}'  Where user = '${referrer}' and  level < '${i}'`,
                          function (err, result) {
                            if (err) throw err;
                            if (result.changedRows == 0) {
                              return;
                            } else {
                              console.log("REF ID :: ", referrer, i);
                              i++;
                              if (i < 13) {
                                recursive_data()
                              }
                            }
                          }
                        );
                      } else {
                        return;
                      }
                    });
                }
              }
            }
          );
        }
        i++;
      }
    }
    return { csql: csql_arr, sql: sql_arr, result };
  }
  
  
  

  async function captureTransactions() {
    setInterval(() => {
        conn.query("select * from eventBlock", function (err, result) {
          if (err) throw err;
          web3.eth
            .getBlockNumber()
            .then((d) => {
              let current_block = d;
              console.log(result[0].latest_block);
              // console.log("contract",contract);
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
                      `UPDATE eventBlock SET latest_block ='${parseInt(result[0].latest_block) + 4000
                      }'`,
                      function (err, result) {
                        if (err) throw err;
                        // console.log("Executed::", result);
                      }
                    );
                  }
                })
                .catch((e) => {
                  console.log("Error::", e);
                });
            })
            .catch((e) => {
              console.log("Error::", e);
            });
        });
      }, 10000);
  }
  