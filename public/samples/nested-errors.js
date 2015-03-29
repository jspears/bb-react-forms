var nested = require('./nested');
module.exports = {

    schema: nested.schema,
    data: nested.data,
    errors: {
        'address.city': {
            message: 'Not the right place'
        }
    }
};
