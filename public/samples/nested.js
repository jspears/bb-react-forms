module.exports = {
    schema: {
        "schema": {
            "title": {
                "type": "Select",
                "options": ["Mr", "Mrs", "Ms"]
            },
            "name": "Text",
            "email": {
                type: "Text",
                dataType: 'email',
                validators: ['required', 'email']
            },
            "address": {
                type: "Object",
                subSchema: {
                    street: 'Text',
                    city: 'Text',
                    state: {
                        options: ['CA', 'NV', 'DE'],
                        type: 'Select'
                    },
                    zip: 'Text'
                }
            }
        },
        "fieldsets": [{
            "legend": "Name",
            "fields": ["title", "name", "email"]
        },
            {
                legend: "Something else",
                fields: "address.street, address.city, address.state, address.zip"
            }

        ]
    },
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
