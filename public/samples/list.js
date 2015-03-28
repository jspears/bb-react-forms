module.exports = {
    "schema": {
        "todos": {
            type: "List",
            canAdd:true,
            canDelete:true,
            canReorder:true,
            canEdit:true
        }
    },
    "fieldsets": [{
        "legend": "Todo",
        "fields": ["todos"]
    }]
};
