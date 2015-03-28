module.exports = {
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
            fields: "address.street, address.city, address.zip"
        }

    ]
};
