// export const CONTRACT_ADDRESS = "0x363622c5845B82f4e756e890B8548f198b6C7fFf";
// export const CONTRACT_ADDRESS = "0xc951f7205De9D88c759620f745d71Aff7F3138EE";
export const CONTRACT_ADDRESS = "0xdff208FBB084618ed465c4270A9C949782F51547";
export const dex_abi =[
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
]



// owner wallet private key="dca62886335d6bdcab35539ed7d68e562b088687d8049041d04ad7153a1e70ab"