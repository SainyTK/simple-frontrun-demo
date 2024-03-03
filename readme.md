# Frontrun demo
This repository demonstrates a simple frontrun bot using ethers (V6). The purpose of this demo is to show that a normal user will be blocked from receiving airdrop from a smart contract when the bot is running. This bot listens to airdrop claiming transactions from the target smart contract. When an airdrop claim transaction is found, the bot immediately submits a claim transaction with high gas price to get priority on the same block and get airdrop instead of the normal user.

## Setup
1. Installation
`npm i`
2. Environment variable setup
- Copy `.env.example` to `.env`
- Fill in the following variables in the `.env` file:
    - PRIVATE_KEY="bot-private-key"
    - RPC_URL="rpc-url"
    - CONTRACT_ADDRESS="airdrop-smart-contract-address"

Note: the existing contract address is deployed on Sepolia. You can just use it without deploying a new one.

## Running
`npm start`

## Demo video
1. A user successfully claim airdrop when the bot is not running: https://www.youtube.com/watch?v=lYVrFGVUm1w
2. A user fails to claim airdrop when the bot is running: https://www.youtube.com/watch?v=WL8epAUHsyE