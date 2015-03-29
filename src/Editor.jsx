var React = require('react');
var tu = require('./tutils');
var EMPTY_OBJ = {};
var EMPTY_ARR = [];
var validators = require('./validators');

function initValidators(v) {
    //If it has a type init it
    if (v.type) {
        return (_.isFunction(v.type) ? v.type : validators[v.type])(v);
    }
    //If it is a RegExp than init ReExp
    if (_.isRegExp(v)) {
        return validators['regexp']({
            regexp: v
        })
    }
    //If its a function just return it.
    if (_.isFunction(v)) {
        return v;
    }
    //otherwise lets try initing it.
    return validators[v]();
}

var Editor = React.createClass({
    getInitialState() {
        var {errors, path} = this.props;
        var e = (errors && errors[path] || EMPTY_OBJ).message;
        if (e != null) {
            this._hasValidated = true;
        }
        return {
            message: e
        }
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
    componentWillMount(){
        var validators = this.props.field.validators;
        this.validators = validators ? validators.map(initValidators) : EMPTY_ARR;
    },
    handleValidate(newValue, oldValue, path) {
        this.validate(newValue)
    },
    handleChange(newValue, oldValue, path) {
        var errors = this.getErrorMessages(newValue), isValid = errors.length === 0;
        if (isValid) {
            if (this.props.onValueChange(newValue, oldValue, path) !== false) {
                this._hasValidated = true;
                errors = null;
            }
        } else if (!this._hasValidated) {
            errors = null;
        }
        this.setState({
            message: errors && errors[0] && errors[0].message
        });


    },
    getValue(){
        return this.refs.field.getValue();
    },
    /**
     * Runs validation and updates empty fields.
     *
     */
        validate(value){
        value = arguments.length === 0 ? this.getValue() : value;
        var errors = this.getErrorMessages(this.getValue());
        this.setState({
            message: errors && errors[0] && errors[0].message
        });
        return errors;
    },
    getErrorMessages(value){
        value = arguments.length === 0 ? this.getValue() : value;

        return this.validators.map((v)=> {
            return v(value, this.refs);
        }).filter(tu.nullCheck);
    },


    title: function () {
        var field = this.props.field || {};
        if (field.title != null) {
            return field.title;
        }
        //Add spaces
        return field.name.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => {
            return s.toUpperCase();
        });
    },
    render() {
        var {field, name, onValueChange, onValidate, ...props} = this.props,
            {name,type,fieldClass, errorClassName, help} = field,
            errMessage = this.state.message,
            Component = require('types/' + type + '.jsx'),
            title = this.title(),
            errorClassName = errorClassName == null ? 'has-error' : errorClassName;

        return <div className={"form-group field-name " + (errMessage != null ? errorClassName : '') + ' ' + fieldClass}>
            {title ? <label className="col-sm-2 control-label" htmlFor={name}>{title}</label> : null}

            <div className="col-sm-10">
                <Component ref="field" {...props} field={field} name={name}
                           onValueChange={this.handleChange}
                           onValidate={this.handleValidate}/>

                <p className="help-block">{errMessage || help || ''}</p>
            </div>
        </div>
    }
});
module.exports = Editor;