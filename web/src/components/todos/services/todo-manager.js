const eoslime = require('eoslime').init();
const config = require('./../../../config.json');

const TODO_STATES = {
    backlog: 0,
    inProgress: 1,
    review: 2,
    done: 3
};

// EOSIO - Class for interacting with blockchain
class TodoManager {

    constructor(todoContract, todosList) {
        this.todoContract = todoContract;
        this.todosList = todosList;
    }

    async addTodo (description) {
        const todoData = {
            id: this.todosList.length,
            description: description,
            status: TODO_STATES.backlog
        }

        const txReceipt = await this.todoContract.add(todoData.description);

        this.todosList.backlog.push(todoData);
        this.todosList.length++;

        return txReceipt;
    }

    async moveTodo (todo, inState) {
        if (todo.status === TODO_STATES[inState]) {
            return false;
        }

        const txReceipt = await this.todoContract.update(todo.id, TODO_STATES[inState]);

        // Update todo in local todosList cache
        const todoIndex = this.todosList[todo.state].findIndex((todoElement) => todoElement.id === todo.id);
        this.todosList[todo.state].splice(todoIndex, 1);
        this.todosList[inState].push(todo);
        todo.status = TODO_STATES[inState];
        todo.state = inState;

        return txReceipt;
    }

    async removeTodo (todo) {
        const txReceipt = await this.todoContract.remove(todo.id);

        // Clear todo from local todosList cache
        const todoIndex = this.todosList[todo.state].findIndex((todoElement) => todoElement.id === todo.id);
        this.todosList[todo.state].splice(todoIndex, 1);
        this.todosList.length--;

        return txReceipt;
    }

    static async build () {
        const aliceAccount = eoslime.Account.load(config.alice.name, config.alice.privateKey);
        const todoContract = await eoslime.Contract.at(config.contract.name, aliceAccount);

        getTodosByState = getTodosByState.bind({ todoContract });

        const todosList = {
            backlog: await getTodosByState(TODO_STATES.backlog),
            inProgress: await getTodosByState(TODO_STATES.inProgress),
            review: await getTodosByState(TODO_STATES.review),
            done: await getTodosByState(TODO_STATES.done)
        }

        todosList.length = (
            todosList.backlog.length +
            todosList.inProgress.length +
            todosList.review.length +
            todosList.done.length
        );

        return new TodoManager(todoContract, todosList);
    }
}

let getTodosByState = async function (todoState) {
    const stateTodos = await this.todoContract.todos.equal(todoState).index(2).limit(100).find();
    return stateTodos;
}

export default TodoManager;
// EOSIO - End
