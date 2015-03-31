var React = require('react');
var tu = require('./tutils');
var EMPTY_OBJ = {};
var EMPTY_ARR = [];
var validators = require('./validators');

function initValidators(v) {
    //If it has a type init it
    if (v.type) {
        return validators[v.type].call(validators, v);
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
    displayName:'Editor',
    getInitialState() {
        return this._handleErrorObj(this.props);
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
    _handleErrorObj(props){
        var {errors, path} = props;
        var e = (errors && errors[path] || EMPTY_OBJ).message;
        return {
            message: e
        }
    },
    componentWillReceiveProps(newProps) {
    //    this.setState(this._handleErrorObj(newProps));
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
        //if (isValid) {
        this.props.onValueChange.apply(this, arguments);
        var hasValidated = this.state.hasValidated;
        if (!hasValidated && !isValid) {
            //don't show errors on change if it has never been validated.
            errors = null;
        } else if (!hasValidated && isValid) {
            hasValidated = true;
        }
        var message = errors && errors[0] && errors[0].message;

        this.setState({
            hasValidated, message
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
        var errors = this.getErrorMessages(value);
        this.setState({
            message: errors && errors[0] && errors[0].message,
            hasValidated: true
        });
        return errors;
    },
    getForm(){

    },
    getErrorMessages(value){
        value = arguments.length === 0 ? this.getValue() : value;
        var form = this.props.form ? this.props.form :  this.refs.field &&  this.refs.field.form;

        var values = form && form.getValue();
        return this.validators.map((v)=> {
            return v(value, values);
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
        var {field, name, value, onValueChange, onValidate, ...props} = this.props,
            {name,type,fieldClass, errorClassName, help} = field,
            errMessage = this.state.message,
            Component = require('types/' + type + '.jsx'),
            title = this.title(),
            errorClassName = errorClassName == null ? 'has-error' : errorClassName;

        return <div
            className={"form-group field-name " + (errMessage != null ? errorClassName : '') + ' ' + fieldClass}>
            {title ? <label className="col-sm-2 control-label" htmlFor={name}>{title}</label> : null}

            <div className="col-sm-10">
                <Component ref="field" value={value} {...props} field={field} name={name} form={this.props.form}
                           onValueChange={this.handleChange}
                           onValidate={this.handleValidate}/>

                <p className="help-block">{errMessage || help || ''}</p>
            </div>
        </div>
    }
});
module.exports = Editor;