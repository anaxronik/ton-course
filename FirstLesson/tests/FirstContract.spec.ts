import { Blockchain, SandboxContract, TreasuryContract } from '@ton-community/sandbox';
import '@ton-community/test-utils';
import { toNano } from 'ton-core';
import { FirstContract } from '../wrappers/FirstContract';

describe('FirstContract', () => {
    let blockchain: Blockchain;
    let firstContract: SandboxContract<FirstContract>;
    let deployer: SandboxContract<TreasuryContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        firstContract = blockchain.openContract(await FirstContract.fromInit(1427n));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await firstContract.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: firstContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and firstContract are ready to use
    });

    it('should increase', async () => {
        const counterBefore = await firstContract.getCounter();

        await firstContract.send(
            deployer.getSender(),
            {
                value: toNano(0.01),
            },
            'increment'
        );
        const counterAfter = await firstContract.getCounter();
        expect(counterBefore).toBeLessThan(counterAfter);
    });

    it('should add', async () => {
        const counterBefore = await firstContract.getCounter();
        const amount = 3n;

        await firstContract.send(
            deployer.getSender(),
            {
                value: toNano(0.01),
            },
            {
                $$type: 'Add',
                amount: amount,
            }
        );
        const counterAfter = await firstContract.getCounter();
        console.log({ counterBefore, counterAfter });

        expect(counterBefore + amount).toStrictEqual(counterAfter);
    });
});
