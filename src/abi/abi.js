const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "initialOwner",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "cardId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "redeemer",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "bytes8",
				"name": "redeemCode",
				"type": "bytes8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "redeemedAmount",
				"type": "uint256"
			}
		],
		"name": "EthRedeemed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "cardId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "bytes8",
				"name": "redeemCode",
				"type": "bytes8"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "depositAmount",
				"type": "uint256"
			}
		],
		"name": "GiftCardCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint40",
				"name": "pin",
				"type": "uint40"
			}
		],
		"name": "createGiftCard",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes8",
				"name": "",
				"type": "bytes8"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "cardId",
				"type": "uint256"
			}
		],
		"name": "getGiftCardBalanceAndStatus",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "depositAmount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "redeemed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "giftCards",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "cardId",
				"type": "uint256"
			},
			{
				"internalType": "bytes8",
				"name": "redeemCode",
				"type": "bytes8"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "depositAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint40",
				"name": "pin",
				"type": "uint40"
			},
			{
				"internalType": "bool",
				"name": "redeemed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "cardId",
				"type": "uint256"
			},
			{
				"internalType": "bytes8",
				"name": "redeemCode",
				"type": "bytes8"
			},
			{
				"internalType": "uint40",
				"name": "pin",
				"type": "uint40"
			}
		],
		"name": "redeemMind",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawBalance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

export default abi;