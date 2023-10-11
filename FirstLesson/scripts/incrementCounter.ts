import { NetworkProvider } from '@ton-community/blueprint';
import { toNano } from 'ton-core';
import { FirstContract } from '../wrappers/FirstContract';

export async function run(provider: NetworkProvider) {
    const contract = provider.open(await FirstContract.fromInit(1469n));

    await contract.send(
        provider.sender(),
        {
            value: toNano('0.02'),
        },
        {
            $$type: 'Add',
            amount: 3n,
        }
    );
}
