var React = require('react');
var PropsStateValueMixin = require('./PropsStateValueMixin.js');
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
    },
    componentWillReceiveProps:PropsStateValueMixin.componentWillReceiveProps
};

module.exports = FieldMixin;