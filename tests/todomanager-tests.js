const assert = require('assert');

const TODO_MANAGER_WASM_PATH = './contracts/todomanager.wasm';
const TODO_MANAGER_ABI_PATH = './contracts/todomanager.abi';

describe('TODO Manager', function (eoslime) {

    this.timeout(15000);

    beforeEach(async () => {
        managerContract = await eoslime.Contract.deploy(TODO_MANAGER_WASM_PATH, TODO_MANAGER_ABI_PATH);
    });

    it('Should add a new todo', async () => {
        await managerContract.add("sample description");

        const todos = await eoslime.Provider.select('todos').from(managerContract.name).find()

        assert(todos.length == 1, 'Todo is not added');
        assert(todos[0].description == 'sample description', 'Wrong description')
    });

});