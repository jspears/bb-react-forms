var React = require('react');
var NestedMixin = require('./NestedMixin.jsx');


var Form = React.createClass({
    mixins: [NestedMixin],
    handleSubmit(e){
        e && e.preventDefault();
        console.log(this.validate());
    },
    render() {

        var {schema, subSchema,  fields, submitButton,  ...props} = this.props;
        this.schema = subSchema ? {schema: subSchema, fields: fields} : schema;
        var sb = submitButton || this.schema.submitButton;
        return <form {...props} onSubmit={this.handleSubmit}>
            {this.schema && this.schema.schema ? this.renderSchema() : null}
            {sb ?
                <button type="submit"  className='btn btn-primary' dangerouslySetInnerHTML={{__html: sb}}/> : null}

        </form>
    }

});
module.exports = Form;