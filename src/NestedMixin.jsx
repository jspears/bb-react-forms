var React = require('react');
var tu = require('./tutils'), tpath = tu.path;
var Editor = require('./Editor.jsx');

var NestedMixin = {
    getDefaultProps() {
        return {
            template: null,
            path: null,
            onValueChange() {

            },
            onValidate(){
            }
        }

    },
    getInitialState(){
        return {};
    },

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
        var value = this.props.value || {};
        value[property] = newValue;
        if (this.props.onValueChange(value, this.props.value, this.props.name) !== false) {
//           this.props.value {value: value});
        }
    },
    handleValidate(){
        this.props.onValidate.apply(this, arguments);
    },
    getErrorMessages(){
        var refs = this.refs;
        var errors = tu.flatten(Object.keys(refs).map((v) => {
            var ers = refs[v] && refs[v].editor.getErrorMessages();
            if (ers == null || ers.length === 0) return 0;
            var msg = {};
            msg[refs[v].props.path] = ers;
            return msg;
        }).filter(tu.nullCheck));
    },
    /**
     * Return null if no validation errors,
     * otherwise return a map of errors.
     */
        validate(){
        var refs = this.refs, msgs = null;
        Object.keys(refs).forEach((v) => {
            var ref = refs[v], ers;

            //So nested forms do their own validation.
            if (ref.refs.field.validate) {
                ers = ref.refs.field.validate();
                if (ers == null) return null;
                if (!msgs)msgs = {};
                Object.keys(ers).forEach((v)=> {
                    msgs[v] = ers[v];
                });
            } else {
                //otherwise the editor does it.  I know wierd,
                //open to suggestions.
                ers = ref.validate();
                if (ers == null || ers.length === 0) return null;
                if (msgs == null) msgs = {};
                msgs[ref.props.path] = ers;
            }
        });
        return msgs;
    },
    getValue(){
        var refs = this.refs, value = {};
        Object.keys(refs).forEach((v) => {
            value[v] = refs[v].getValue();
        });
        return value;
    },
    makeFields(fields) {
        var fieldMap = {}, {errors, value}  = this.props, schema = this.schema.schema, template = this.props.template;
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

            var ref = schema[f], path = tpath(this.props.path, f);
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
            return <Editor ref={f} key={'key-' + f} path={path} value={value && value[f]}
                           field={ref}
                           errors={errors}
                           parent={this}
                           template={template}
                           onValueChange={this.handleValueChange} onValidate={this.handleValidate}/>
        });
    },


    renderSchema() {
        var schema = this.schema, fieldsets = schema.fieldsets, fields = schema.fields || Object.keys(schema.schema);
        return (fieldsets && Array.isArray(fieldsets) ? fieldsets : ( fieldsets && (fieldsets.legend || fieldsets.fields) ) ? [fieldsets] : [{fields: tu.toArray(fields)}])
            .map(this.makeFieldset, this);
    }
}
module.exports = NestedMixin;