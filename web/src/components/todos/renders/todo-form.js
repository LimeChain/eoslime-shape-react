import React from 'react';

export const TodoFormHtml = function (context) {
    return (
        < div >
            <div className="row">
                <div className="col">
                    <form className="form-inline justify-content-center">
                        <button type="button" className="btn btn-success mb-2" onClick={context.addTodo}>Add</button>
                        <div className="form-group mx-sm-3 mb-2">
                            <input type="text" className="form-control" onChange={context.onNewTodoDescription} placeholder="Description" />
                        </div>
                    </form>
                    <div className="message-box">
                        <div className={context.state.message.class} role="alert">{context.state.message.text}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
