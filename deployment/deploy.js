const fs = require('fs');

const CONTRACT_WASM_PATH = './compiled/todomanager.wasm';
const CONTRACT_ABI_PATH = './compiled/todomanager.abi';
const CONFIG_FILE = 'config.json';

const deploy = async function (eoslime, deployer) {
    if (!deployer) {
        deployer = await eoslime.Account.createRandom();
    }

    await eoslime.Contract.deployOnAccount(CONTRACT_WASM_PATH, CONTRACT_ABI_PATH, deployer);

    const CONFIGURATION = {
        account: deployer.name,
        privateKey: deployer.privateKey,
        publicKey: deployer.publicKey
    };
    
    storeConfig(CONFIG_FILE, CONFIGURATION);
}

const storeConfig = function (filename, data) {
    const stringifiedData = JSON.stringify(data);
  
    fs.writeFile(filename, stringifiedData, (error) => {
        if (error) {
            throw new Error(`Storing configuration failed: ${error.message}`)
        }
    });
}

module.exports = deploy;