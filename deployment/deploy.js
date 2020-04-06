const fs = require('fs');

const CONTRACT_WASM_PATH = './compiled/todomanager.wasm';
const CONTRACT_ABI_PATH = './compiled/todomanager.abi';
const CONFIG_FILE = './web/config.json';

const deploy = async function (eoslime, deployer) {
    const alice = await eoslime.Account.createRandom();

    if (!deployer) {
        deployer = await eoslime.Account.createRandom();
    }

    await eoslime.Contract.deployOnAccount(CONTRACT_WASM_PATH, CONTRACT_ABI_PATH, deployer);

    const configuration = {
        contract: {
            name: deployer.name,
            publicKey: deployer.publicKey,
            privateKey: deployer.privateKey,
        },
        alice: {
            name: alice.name,
            publicKey: alice.publicKey,
            privateKey: alice.privateKey
        }
    };

    storeConfig(configuration);
}

const storeConfig = function (config) {
    try {
        const configContent = JSON.stringify(config);
        fs.writeFileSync(CONFIG_FILE, configContent);
    } catch (err) {
        throw new Error(`Storing configuration failed: ${err.message}`)
    }
}

module.exports = deploy;