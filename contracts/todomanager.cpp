#include "todomanager.hpp"

namespace todomanager
{

void todomanager::add(string description)
{
    todos_table.emplace(_self, [&](auto &new_todo) {
        new_todo.id = todos_table.available_primary_key();
        new_todo.description = description;
        new_todo.status = status_type::BACKLOG;
    });
}

void todomanager::update(uint64_t index, uint64_t status)
{
    auto todo_iterator = todos_table.find(index);

    check(todo_iterator != todos_table.end(), "Todo does not exist");
    check(status < 4, "Wrong new status");

    todos_table.modify(todo_iterator, _self, [&](auto &update_todo) {
        update_todo.status = status;
    });
}

void todomanager::remove(uint64_t index)
{
    auto todo_iterator = todos_table.find(index);

    check(todo_iterator != todos_table.end(), "Todo does not exist");

    todos_table.erase(todo_iterator);
}

} // namespace todomanager

EOSIO_DISPATCH(todomanager::todomanager, (add)(update)(remove))
