module.exports = {
    schema: {
        "schema": {
            "todos": {
                type: "List",
                canAdd: true,
                canDelete: true,
                canReorder: true,
                canEdit: true
            }
        },
        "fieldsets": [{
            "legend": "Todo",
            "fields": ["todos"]
        }]
    },
    data: {
        todos: ['Get Stuff', 'Do Stuff', 'Go Home']
    },
    errors:{
        'todos.1':{
            message:'No your not going to'
        }
    }
}
;
