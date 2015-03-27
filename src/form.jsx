var React = require('react');
var tu = require('./tutils');
var NestedMixin = require('./NestedMixin.jsx');


var Form = React.createClass({
    mixins: [NestedMixin],
    render() {

        var {schema, subSchema,  fields,  props} = this.props;
        this.schema = subSchema ? {schema: subSchema, fields: fields} : schema;

        return <form {...props}>{this.schema && this.schema.schema ? this.renderSchema() : null}</form>
    }

});
module.exports = Form;