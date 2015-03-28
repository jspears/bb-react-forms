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

    getInitialState() {
        return {
            value: this.props.value,
            isValid: true
        }
    },
    valueFromEvt(e){
        return e.target.value;
    },
    handleChange(e) {
        var newValue = this.valueFromEvt(e);
        if (this.props.onValueChange(newValue, this.state.value, this.props.name) !== false) {
            if (this.getErrorMessages().length === 0) {
                this.props.onValidChange(newValue, this.state.value, this.props.name)
                this.setState({
                    value: newValue
                });
            }
        }
    },
    getErrorMessages(){
        var value = this.state.value, validators = this.props.field.validators || [];
        if (!validators.length) {
            return EMPTY_ARR;
        }
        this.validators = this.validators || validators.map(initValidators);
        return this.validators.map((v)=> {
            return v(value)
        }).filter(tu.nullCheck);
    },
    handleValidate(e) {


        this.props.onValidate.apply(this, this.getErrorMessages());
    }
};

module.exports = FieldMixin;