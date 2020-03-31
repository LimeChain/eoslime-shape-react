const assert = require('assert');

const TODO_MANAGER_WASM_PATH = './contracts/todomanager.wasm';
const TODO_MANAGER_ABI_PATH = './contracts/todomanager.abi';

const TODOS_TABLE = 'todos'
const DESCRIPTION = 'sample description'
const STATUS_TYPE = { BACKLOG: 0, IN_PROGRESS: 1, REVIEW: 2, DONE: 3 }

describe('TODO Manager', function (eoslime) {

    this.timeout(15000);

    beforeEach(async () => {
        managerContract = await eoslime.Contract.deploy(TODO_MANAGER_WASM_PATH, TODO_MANAGER_ABI_PATH);
    });

    it('Should add a new todo', async () => {
        await managerContract.add(DESCRIPTION);

        const todos = await eoslime.Provider.select(TODOS_TABLE).from(managerContract.name).find()

        assert.equal(todos.length, 1, 'Todo is not added');
        assert.equal(todos[0].description, DESCRIPTION, 'Invalid description')
    });

    it('Should update an existing todo', async () => {
        await managerContract.add(DESCRIPTION);
        await managerContract.update(0, STATUS_TYPE.IN_PROGRESS);

        const todos = await eoslime.Provider.select(TODOS_TABLE).from(managerContract.name).find()

        assert.equal(todos[0].status, STATUS_TYPE.IN_PROGRESS, 'Invalid status')
    });

    it('Should throw updating a non existing todo', async () => {
        await managerContract.add(DESCRIPTION);

        await eoslime.tests.expectAssert(
            managerContract.update(1, STATUS_TYPE.IN_PROGRESS)
        );

        const todos = await eoslime.Provider.select(TODOS_TABLE).from(managerContract.name).find()

        assert.equal(todos[0].status, STATUS_TYPE.BACKLOG, 'Invalid status')
    });

    it('Should remove an existing todo', async () => {
        await managerContract.add(DESCRIPTION);
        await managerContract.remove(0);

        const todos = await eoslime.Provider.select(TODOS_TABLE).from(managerContract.name).find()

        assert.equal(todos.length, 0, 'Todo is not removed');
    });

    it('Should throw removing a non existing todo', async () => {
        await managerContract.add(DESCRIPTION);

        await eoslime.tests.expectAssert(
            managerContract.remove(1)
        );

        const todos = await eoslime.Provider.select(TODOS_TABLE).from(managerContract.name).find()

        assert.equal(todos.length, 1, 'Todo is removed')
    });

});