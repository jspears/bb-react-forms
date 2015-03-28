module.exports = {
    schema: {
        "schema": {"title": {"type": "Select", "options": ["Mr", "Mrs", "Ms"]}, "name": "Text"},
        "fieldsets": [{"legend": "Name", "fields": ["title", "name"]}]
    },
    data: {
        title: 'Mrs',
        name: 'Johnson'
    }
};
