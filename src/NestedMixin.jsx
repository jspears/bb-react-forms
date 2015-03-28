var React = require('react');
var tu = require('./tutils'), tpath = tu.path;
var Template = require('./template.jsx');
var NestedMixin = {

    makeFieldset(f, i) {

        var ret = f.legend ?
            <fieldset key={'f' + i}>
                <legend>{f.legend}</legend>
                {this.makeFields(f.fields)}
            </fieldset> :
            <div key={'f' + i}>{this.makeFields(f.fields)}</div>
        return ret;
    },

    handleValueChange(newValue, oldValue, property) {
        var value = this.state.value || {};
        value[property] = newValue;
        if (this.props.onValueChange(value, this.state.value, this.props.name) !== false) {
            this.setState({value: value});
        }
    },
    handleValidate(){
        console.log('handle', arguments);
        this.props.onValidate.apply(this, arguments);
    },
    makeFields(fields) {
        var fieldMap = {}, data = this.state.value, schema = this.schema.schema, Template = this.props.template;

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
            return <Template ref={f} key={'key-' + f} path={tpath(this.props.path, f)} value={data && data[f]} field={ref}
                             onValueChange={this.handleValueChange} onValidate={this.handleValidate}/>
        });
    },
    getInitialState() {
        return {
            //           value: this.props.value
        }
    },
    getDefaultProps() {
        return {
            template: Template,
            value: null,
            path: null,
            onValueChange() {

            },
            onValidate(){
            }
        }

    },
    renderSchema() {
        var schema = this.schema, fieldsets = schema.fieldsets, fields = schema.fields || Object.keys(schema.schema);
        return (fieldsets && Array.isArray(fieldsets) ? fieldsets : ( fieldsets && (fieldsets.legend || fieldsets.fields) ) ? [fieldsets] : [{fields: tu.toArray(fields)}])
            .map(this.makeFieldset, this);
    }
}
module.exports = NestedMixin;