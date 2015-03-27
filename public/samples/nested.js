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
        }
    },
    "fieldsets": [{"legend": "Name", "fields": ["title", "name", "email"]}]
};
