var React = require('react');
var _ = require('lodash');
var tu = require('./tutils');

var FieldMixin = {
    getDefaultProps() {
        return {
            value: '',
            title: '',
            name: '',
            placeholder: '',
            dataType: this.dataType,
            onValueChange() {
            },
            onValidate(){
            }
        }

    },
    dataType: 'text',

    getValue(){
        return this.state.value;
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
        var value = this.valueFromEvt(e);
        this.props.onValueChange(value, this.state.value, this.props.path);
        this.setState({
            value: value
        });

    },
    handleValidate(e){
        this.props.onValidate(this.valueFromEvt(e), this.state.value, this.props.path);
    }
};

module.exports = FieldMixin;