#include "todomanager.hpp"

namespace todomanager
{

void todomanager::addtodo(string description)
{
    todos_table.emplace(_self, [&](auto &new_todo) {
        new_todo.id = todos_table.available_primary_key();
        new_todo.description = description;
        new_todo.status = e_status_option::INITIAL;
    });
}

void todomanager::updatetodo(uint64_t index, uint8_t status)
{
    auto todo_iterator = todos_table.find(index);

    check(todo_iterator != todos_table.end(), "Todo does not exist");
    check(status > todo_iterator->id, "Wrong new status");

    todos_table.modify(todo_iterator, _self, [&](auto &update_todo) {
        update_todo.status = status;
    });
}

void todomanager::removetodo(uint64_t index)
{
    auto todo_iterator = todos_table.find(index);

    check(todo_iterator != todos_table.end(), "Todo does not exist");

    todos_table.erase(todo_iterator);
}

} // namespace todomanager

EOSIO_DISPATCH(todomanager::todomanager, (addtodo)(updatetodo)(removetodo))
