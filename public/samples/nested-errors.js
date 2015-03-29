var nested = require('./nested-data');
module.exports = {

    schema: nested.schema,
    data: nested.data,
    errors: {
        'address.city': {
            message: 'Not the right place'
        }
    }
};
