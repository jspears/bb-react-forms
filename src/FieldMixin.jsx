var React = require('react');
var validators = require('./validators');
var _ = require('lodash');
var tu = require('./tutils');

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
var EMPTY_ARR = [];
var FieldMixin = {
    getDefaultProps() {
        return {
            value: '',
            title: '',
            name: '',
            placeholder: '',
            dataType: this.dataType,
            validators: [],
            onValueChange() {
            },
            onValidate() {
            },
            onValidChange(){

            }
        }
    },
    dataType: 'text',
    componentWillMount(){
        /**
         * So it should not be in error until either it has lost focus, or it has been correct and then went into error.
         * @type {boolean}
         * @private
         */
        this._hasValidated = false;
    },
    getInitialState() {
        return {
            value: this.props.value
        }
    },
    valueFromEvt(e){
        return e.target.value;
    },
    handleChange(e) {
        var newValue = this.valueFromEvt(e), errors = this.getErrorMessages(newValue), isValid = errors.length === 0;
        if (isValid) {
            if (this.props.onValueChange(newValue, this.state.value, this.props.name) !== false) {
                this._hasValidated = true;
                this.triggerOnValidate(errors, newValue);
            }
        } else if (this._hasValidated) {
            this.triggerOnValidate(errors, newValue);
        }

        this.setState({
            value: newValue
        });

    },
    getErrorMessages(value){
        value = value || this.state.value;
        var validators = this.props.field.validators || [];
        if (!validators.length) {
            return EMPTY_ARR;
        }
        this.validators = this.validators || validators.map(initValidators);
        return this.validators.map((v)=> {
            return v(value)
        }).filter(tu.nullCheck);
    },
    triggerOnValidate(errors, newValue){
        this.props.onValidate(errors, newValue, this.props.path);
    },
    handleValidate(e) {
        var newValue = this.valueFromEvt(e);
        this.triggerOnValidate(this.getErrorMessages(newValue), newValue, this.props.path);
    }
};

module.exports = FieldMixin;