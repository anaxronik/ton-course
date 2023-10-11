import { NetworkProvider } from '@ton-community/blueprint';
import { toNano } from 'ton-core';
import { FirstContract } from '../wrappers/FirstContract';

export async function run(provider: NetworkProvider) {
    const firstContract = provider.open(await FirstContract.fromInit(1469n));

    await firstContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(firstContract.address);

    // run methods on `firstContract`
}