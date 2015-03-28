module.exports = {
    "schema": {
        "todos": {
            type: "List",
            canAdd:true,
            canDelete:true,
            canReorder:true
        }
    },
    "fieldsets": [{
        "legend": "Todo",
        "fields": ["todos"]
    }]
};
