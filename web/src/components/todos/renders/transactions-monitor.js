import React from 'react';

export const TransactionsMonitorHtml = function (context) {
    const monitorEntries = [];

    if (context.state.todoManager) {
        for (let i = 0; i < context.state.txHistory.length; i++) {
            const transaction = context.state.txHistory[i];

            monitorEntries.push(
                <div key={transaction.id} className="tx">
                    <div className="tx-text text-center">{transaction.todoText}</div>
                    <div className="tx-text w3-flat-turquoise">Action: {transaction.action}</div>
                    <div className="tx-text">{transaction.id}</div>
                </div>
            );
        }
    }

    return (
        <div>
            <div className="monitor-container">
                <div className="monitor">
                    <h5 className="monitor-title">Transactions monitor</h5>
                    <div className="bar">
                        <div className="emptybar"></div>
                        <div className="filledbar"></div>
                    </div>
                    <div>
                        {monitorEntries}
                    </div>
                </div>

            </div>
        </div>
    );
}
