import React from 'react';

export const TransactionsMonitorHtml = function (context) {
    const monitorEntries = [];

    if (context.state.todoManager) {
        for (let i = 0; i < context.state.txHistory.length; i++) {
            const transaction = context.state.txHistory[i];

            monitorEntries.push(
                <div key={transaction.id} className="transaction">
                    <div className="transaction-text text-center">{transaction.todoText}</div>
                    <div className="transaction-text">Action: {transaction.action}</div>
                    <div className="transaction-text">{transaction.id}</div>
                </div>
            );
        }
    }

    return (
        <div className="monitor">
            <h5 className="monitor-title">Transactions monitor</h5>
            <div className="bar">
                <div className="filledbar"></div>
            </div>
            <div className="transactions">
                {monitorEntries}
            </div>
        </div>
    );
}
