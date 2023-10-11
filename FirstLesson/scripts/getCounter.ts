import { NetworkProvider } from '@ton-community/blueprint';
import { FirstContract } from '../wrappers/FirstContract';

export async function run(provider: NetworkProvider) {
    const contract = provider.open(await FirstContract.fromInit(1469n));

    const counter = await contract.getCounter();

    const id = await contract.getId();

    console.log({ id, counter });
}
