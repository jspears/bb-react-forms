var React = require('react');
var tu = require('./tutils');
var NestedMixin = require('./NestedMixin.jsx');


var Form = React.createClass({
    mixins: [NestedMixin],

    render() {

        var {schema, subSchema,  fields, submitButton,  ...props} = this.props;
        this.schema = subSchema ? {schema: subSchema, fields: fields} : schema;
        var isValid = this.state.isValid;
        return <form {...props}>
            {this.schema && this.schema.schema ? this.renderSchema() : null}
            {submitButton ?
                <button type="submit" disabled={isValid} dangerouslySetInnerHTML={{__html: submitButton}}/> : null}

        </form>
    }

});
module.exports = Form;