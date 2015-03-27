var React = require('react');
var NestedMixin = require('../NestedMixin.jsx');


var ObjectInput = React.createClass({
    mixins: [NestedMixin],
    render() {

        var {schema, subSchema,  fields, value, props} = this.props;
        this.schema = subSchema ? {schema: subSchema, fields: fields} : schema;

        return <div {...props}>{schema && schema.schema ? this.renderSchema() : null}</div>
    }

});
module.exports = ObjectInput;