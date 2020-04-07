import React from 'react';

export const TodoCardsHtml = function (context, todoState) {
    const todosInState = [];

    if (context.state.todoManager) {
        for (let i = 0; i < context.state.todoManager.todosList[todoState].length; i++) {
            const todo = context.state.todoManager.todosList[todoState][i];
            todo.state = todoState;

            todosInState.push(
                <div key={todo.id} className="input-group overflow">
                    <span>{todo.description}</span>

                    <button onClick={() => context.removeTodo(todo)} className="button-remove">Remove</button>
                    <div className="margin-top-10">
                        <button onClick={() => context.moveTodo(todo, "backlog")} className="button button-backlog">Backlog</button>
                        <button onClick={() => context.moveTodo(todo, "inProgress")} className="button button-progress">In Progress</button>
                        <button onClick={() => context.moveTodo(todo, "review")} className="button button-review">Review</button>
                        <button onClick={() => context.moveTodo(todo, "done")} className="button button-done">Done</button>
                    </div>
                </div >
            );
        }
    }

    return (
        <div>
            {todosInState}
        </div>
    );
}
