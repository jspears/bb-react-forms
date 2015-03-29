module.exports = {
    schema: require('./nested').schema,
    data: {
        title: 'Mr',
        name: 'bob',
        email: 'bob@b.co',
        address: {
            street: '1 First St',
            city: 'San Jose',
            state: 'CA',
            zip: 95109
        }
    }
};
