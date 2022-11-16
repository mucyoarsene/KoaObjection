const { Model } = require("objection");

class Order extends Model {
    static get tableName() {
        return 'orders';
    };

    static get nameColumn() {
        return 'total';
    };

    static get nameColumn() {
        return 'customer_id';
    };

    $beforeInsert() {
        this.createdAt = new Date();
    };

    $beforeUpdate() {
        this.updatedAt = new Date();
    };

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['total'],
            properties: {
                id: {type: 'integer'},
                total: {type: 'number'},
                customer_id: {type: 'integer'},
                createdAt: {type: 'string'},
                updatedAt: {type: 'string'}
            }
        };
    };
}

module.exports = Order;