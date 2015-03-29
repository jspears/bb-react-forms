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
                title: false,
                subSchema: {
                    street: 'Text',
                    city: 'Text',
                    state: {
                        options: ['CA', 'NV', 'DE'],
                        type: 'Select'
                    },
                    zip: {
                        type: 'Text',
                        validators: ['required', /[0-9]{5}(-([0-9]{4}))?/,]
                    }
                }
            }
        },
        "fieldsets": [{
            "legend": "Name",
            "fields": ["title", "name", "email"]
        },
            {
                legend: "Address",
                fields: "address.street, address.city, address.state, address.zip"
            }

        ]
    },
    data: null
};
