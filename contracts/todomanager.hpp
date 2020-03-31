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

    enum status_type : uint64_t {
        BACKLOG = 0,
        IN_PROGRESS,
        REVIEW,
        DONE
    };

    struct [[eosio::table]] todo
    {
        uint64_t id;
        string description;
        uint64_t status;

        uint64_t primary_key() const { return id; }
        uint64_t by_status() const { return status; }
    };

    typedef eosio::multi_index<"todos"_n, todo,
        eosio::indexed_by<"bystatus"_n, eosio::const_mem_fun<todo, uint64_t, &todo::by_status>>> todos;
    todos todos_table;

    [[eosio::action]] void add(string description);
    [[eosio::action]] void update(uint64_t index, uint64_t status);
    [[eosio::action]] void remove(uint64_t index);

    using add_action = eosio::action_wrapper<"add"_n, &todomanager::add>;
    using update_action = eosio::action_wrapper<"update"_n, &todomanager::update>;
    using remove_action = eosio::action_wrapper<"remove"_n, &todomanager::remove>;

};

} // namespace todomanager
