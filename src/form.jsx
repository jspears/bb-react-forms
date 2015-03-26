var React = require('react');
function isString(v) {
    return (typeof v == 'string' || v instanceof String);
}

function toArray(v) {
    if (Array.isArray(v)) {
        return v;
    }
    if (isString(v)) {
        return v.split(/\,\s*/);
    }
    if (v == null) {
        return [];
    }
    return [v];
}

var Template = React.createClass({
    render() {
        var {field, content} = this.props;
        return <div className="form-group field-name">
            <label className="col-sm-2 control-label" htmlFor={field.name}>{field.label || field.name}</label>
            <div className="col-sm-10">
                <span>{content}</span>
                <p className="help-block">{field.help || ''}</p>
            </div>
        </div>
    }
});
function unique(array) {
    return array.filter(function (a, b, c) {
        // keeps first occurrence
        return c.indexOf(a) === b;
    });
};
var Form = React.createClass({
    makeFieldset(f, i) {

        return f.legend ?
            <fieldset key={'f' + i}>
                <legend>{f.legend}</legend>
                    {this.makeFields(f.fields)}
            </fieldset> :
            <div  key={'f' + i}>{this.makeFields(f.fields)}</div>
    },
    makeField(field) {
        var type = field.type;
        if (type === 'Object') {
            return <Form schema={field.subSchema}/>
        }
        var Component = require('types/' + type + '.jsx');
        return <Component {...field}/>


    },
    makeFields(fields) {
        fields = toArray(fields);


        var fieldMap = {}
        fields = fields.map(function (v) {
            return v.split('.', 2);
        }).map(function (v) {
            if (v.length > 1) {
                (fieldMap[v[0]] || (fieldMap[v[0]] = [])).push(v[1]);
            }
            return v[0];
        });


        var data = this.props.data || {}, schema = this.props.schema.schema, Template = this.props.template;
        return unique(fields).map((f) => {

            var ref = schema[f];
            if (isString(ref)) {
                ref = {
                    name: f,
                    type: ref
                }
            } else {
                if (!ref.name) {
                    ref.name = f;
                }
                if (!ref.type) {
                    ref.type = 'Text';
                }
            }
            if (!ref.fields && fieldMap[f]) {
                ref.fields = fieldMap[f];
            }
            ref._property = f;
            return <Template key={'key-' + f}  field={ref} content={this.makeField(ref)}/>
        });
    },
    getDefaultProps() { 
        return {
            schema: {},
            template: Template
        }

    },
    renderSchema(schema) {
        var fieldsets = schema.fieldsets, fields = schema.fields || Object.keys(schema.schema);
        return (Array.isArray(fieldsets) ? fieldsets : ( fieldsets.legend || fieldsets.fields) ? [fieldsets] : {fields: toArray(fields)})
            .map(this.makeFieldset, this);
    },
    render() {
        var {schema, template, props} = this.props;
        return <form {...props}>{this.renderSchema(schema)}</form>
    }

});
module.exports = Form;