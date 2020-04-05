import React from 'react';
import { TodoCardsHtml } from './todo-cards';

export const BoardHtml = function (context) {
    return (
        < div className="flex" >
            <div className="board backlog">
                <h2>Backlog</h2>
                {TodoCardsHtml(context, "backlog")}
            </div>

            <div className="board in-progress">
                <h2>In progress</h2>
                {TodoCardsHtml(context, "inProgress")}
            </div>

            <div className="board review">
                <h2>Review</h2>
                {TodoCardsHtml(context, "review")}
            </div>

            <div className="board done">
                <h2>Done</h2>
                {TodoCardsHtml(context, "done")}
            </div>
        </div >
    );
}
