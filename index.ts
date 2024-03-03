import * as ethers from 'ethers';
import { ABI } from './abi';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
    const privateKey = process.env.PRIVATE_KEY || "";
    const rpcUrl = process.env.RPC_URL || "";
    const contractAddress = process.env.CONTRACT_ADDRESS || "";

    const provider = new ethers.WebSocketProvider(rpcUrl);
    const signer = new ethers.Wallet(privateKey).connect(provider);
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    function delay(ms: number) {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, ms);
        })
    }

    async function frontrun(ms: number) {
        const block = await provider.getBlock('pending', true);
        if (block) {
            const airdropTx = block.prefetchedTransactions.filter(tx => tx.to === contractAddress);

            if (airdropTx.length > 0) {
                try {
                    const estimated = await contract.claim.estimateGas();
                    console.log(estimated);
                    const tx = await contract.claim({ gasPrice: ethers.parseEther('0.00000001'), gasLimit: estimated });
                    console.log("Claim success: ", tx.hash);
                } catch (e) {
                    console.log("Claim fail");
                }
            }

        }

        await delay(ms);
        await frontrun(ms);
    }


    frontrun(1000);
}

main();