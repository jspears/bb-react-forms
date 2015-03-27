var React = require('react');
var tu = require('./tutils');


var Template = React.createClass({
    getInitialState() {
        return {}
    },
    handleValidate(mesg) {
        this.setState(mesg || {message: null, type: null});
        this.props.onValidate(mesg);
    },
    getDefaultProps() {
        return {
            field: {
                type: 'Text'
            },
            onValueChange() {
            },
            onValidate() {
            }
        }
    },
    title: function () {
        var field = this.props.field || {};
        if (field.title) {
            return field.title;
        }
        var str = field.name;

        //Add spaces
        str = str.replace(/([A-Z])/g, ' $1');

        //Uppercase first character
        str = str.replace(/^./, function (str) {
            return str.toUpperCase();
        });

        return str;
    },
    render() {
        var {field, content} = this.props;
        var errMessage = this.state.message;
        var clsName = "form-group field-name " + (errMessage != null ? 'has-error' : '');
        var type = field.type;

        var Component = (type === 'Object') ? Form : require('types/' + type + '.jsx');

        return <div className={clsName}>
            <label className="col-sm-2 control-label" htmlFor={field.name}>{this.title()}</label>
            <div className="col-sm-10">
                <span>
                    <Component {...field} onValueChange={this.props.onValueChange} onValidate={this.handleValidate}/>
                </span>
                <p className="help-block">{errMessage || field.help || ''}</p>
            </div>
        </div>
    }
});


var Form = React.createClass({
    makeFieldset(f, i) {

        return f.legend ?
            <fieldset key={'f' + i}>
                <legend>{f.legend}</legend>
                    {this.makeFields(f.fields)}
            </fieldset> :
            <div  key={'f' + i}>{this.makeFields(f.fields)}</div>
    },

    handleValueChange(newValue, oldValue, property) {
        var data = this.state.data;
        data[property] = newValue;
        if (this.props.onValueChange(data, this.state.data, this.props.name) !== false) {
            this.setState({data: data});
        }
    }
    ,
    makeFields(fields) {
        var fieldMap = {}, data = this.props.data || {}, schema = this.props.subSchema || this.props.schema.schema, Template = this.props.template;

        fields = tu.toArray(fields).map((v) => {
            return v.split('.', 2);
        }).map((v) => {
            var f = v[0];
            if (v.length > 1) {
                (fieldMap[f] || (fieldMap[f] = [])).push(v[1]);
            }
            return f;
        });


        return tu.unique(fields).filter((f)=> {
            return schema[f];
        }).map((f) => {

            var ref = schema[f];
            if (tu.isString(ref)) {
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
            return <Template key={'key-' + f} data={data && data[f]} field={ref}  onValueChange={this.handleValueChange}/>
        });
    },
    getInitialState() {
        return {
            data: this.props.data
        }
    },
    getDefaultProps() {
        return {
            template: Template,
            data: {},
            onValueChange: function () {

            }
        }

    }
    ,
    renderSchema(schema) {
        var fieldsets = schema.fieldsets, fields = schema.fields || Object.keys(schema.schema);
        return (fieldsets && Array.isArray(fieldsets) ? fieldsets : ( fieldsets && (fieldsets.legend || fieldsets.fields) ) ? [fieldsets] : [{fields: tu.toArray(fields)}])
            .map(this.makeFieldset, this);
    }
    ,
    render() {

        var {schema, subSchema,  fields, props} = this.props;
        schema = subSchema ? {schema: subSchema, fields: fields} : schema;
        return <form {...props}>{schema && schema.schema ? this.renderSchema(schema) : null}</form>
    }

});
module.exports = Form;