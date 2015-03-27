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
            }
        }
    },
    dataType: 'text',

    getInitialState() {
        return {
            value: this.props.value
        }
    },
    handleChange(e) {
        if (this.props.onValueChange(e.target.value, this.state.value, this.props.name) !== false) {
            this.setState({
                value: e.target.value
            });
        }
    },
    handleValidate(e) {
        var value = this.state.value, validators = this.props.field.validators || [];
        if (!validators.length) {
            return;
        }
        this.validators = this.validators || validators.map(initValidators);
        var mesgs = this.validators.map((v)=> {
            return v(value)
        }).filter(tu.nullCheck);
        this.props.onValidate.apply(this, mesgs);
    }
};

module.exports = FieldMixin;