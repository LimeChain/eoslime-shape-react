import './index.css';

import React from 'react';

import TodoManager from './services/todo-manager';
import MessageComponent from './../message-component';

import { BoardHtml } from './renders/board';
import { TodoFormHtml } from './renders/todo-form';
import { TransactionsMonitorHtml } from './renders/transactions-monitor'

class TodoApplication extends MessageComponent {

	constructor() {
		super();
		this.state = Object.assign(
			this.state,
			{
				txHistory: [],
				todoManager: null,
				newTodoDescription: ''
			});
	}

	async componentDidMount () {
		this.addTodo = this.addTodo.bind(this);
		this.moveTodo = this.moveTodo.bind(this);
		this.removeTodo = this.removeTodo.bind(this);
		this.onNewTodoDescription = this.onNewTodoDescription.bind(this);

		const todoManager = await TodoManager.build();
		this.setState({ todoManager });
	}

	render () {
		return (
			<div className="application">
				<h1 className="application-title">Simple Todos application</h1>
				<div>
					{TodoFormHtml(this)}
				</div>
				<div>
					{BoardHtml(this)}
					{TransactionsMonitorHtml(this)}
				</div>
			</div>
		);
	}

	onNewTodoDescription (event) {
		this.setState({ newTodoDescription: event.target.value });
	}

	async addTodo () {
		const txHistory = this.state.txHistory;
		const txReceipt = await this.state.todoManager.addTodo(this.state.newTodoDescription);

		txHistory.push({
			action: 'add',
			id: txReceipt.transaction_id,
			todoText: this.state.newTodoDescription,
		});

		this.setState({ txHistory, newTodoDescription: '' });
		this.showMessage('Todo has been added successfully!', this.MESSAGE_TYPES.SUCCESS);
	}

	async moveTodo (todo, inState) {
		const txHistory = this.state.txHistory;
		const txReceipt = await this.state.todoManager.moveTodo(todo, inState);

		if (txReceipt) {
			txHistory.push({
				action: `move ( ${inState} )`,
				id: txReceipt.transaction_id,
				todoText: todo.description,
			});

			this.setState({ txHistory });
			this.showMessage('Todo has been moved successfully!', this.MESSAGE_TYPES.SUCCESS);
		} else {
			this.showMessage('Todo is in this state already!', this.MESSAGE_TYPES.INFO);
		}
	}

	async removeTodo (todo) {
		const txHistory = this.state.txHistory;
		const txReceipt = await this.state.todoManager.removeTodo(todo);

		txHistory.push({
			action: "remove",
			id: txReceipt.transaction_id,
			todoText: todo.description,
		});
		this.setState(txHistory);
		this.showMessage("Todo has been removed successfully!", this.MESSAGE_TYPES.SUCCESS)
	}
}

export default TodoApplication;
