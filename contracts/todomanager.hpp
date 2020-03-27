#include <eosio/eosio.hpp>
#include <eosio/system.hpp>
#include <string>

namespace todomanager
{
using namespace eosio;
using std::string;

class[[eosio::contract("todomanager")]] todomanager : public contract
{
public:
    using contract::contract;

    todomanager(name receiver, name code, datastream<const char *> ds) : contract(receiver, code, ds),
                                                                         todos_table(receiver, code.value)
    {
    }

    enum e_status_option : uint8_t {
        INITIAL = 0,
        TODO,
        INPROGRESS,
        DONE
    };

    typedef uint8_t status_option;

    struct [[eosio::table]] todo
    {
        uint64_t id;
        string description;
        status_option status;

        uint64_t primary_key() const { return id; }
    };

    typedef eosio::multi_index<"todos"_n, todo> todos;
    todos todos_table;

    [[eosio::action]] void addtodo(string description);
    [[eosio::action]] void updatetodo(uint64_t index, uint8_t status);
    [[eosio::action]] void removetodo(uint64_t index);

    using addtodo_action = eosio::action_wrapper<"addtodo"_n, &todomanager::addtodo>;
    using updatetodo_action = eosio::action_wrapper<"updatetodo"_n, &todomanager::updatetodo>;
    using removetodo_action = eosio::action_wrapper<"removetodo"_n, &todomanager::removetodo>;

};

} // namespace todomanager
