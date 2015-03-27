var React = require('react'), validators = require('../validators');


var TextInput = React.createClass({
    getDefaultProps() {
        return {
            value: '',
            title: '',
            name: '',
            placeholder: '',
            dataType: 'text',
            validators: [],
            onValueChange() {

            },
            onValidate() {
            }
        }
    },
    getInitialState() {
        return {
            value: this.props.value
        }
    },
    handleChange(e) {
        if (this.props.onValueChange(e.target.value, this.state.value, this.props.name) !== false) {
            this.setState({
                value: e.target.value
            })
        }

    },
    handleValidate(e) {
        var value = this.state.value;
        this.validators = this.validators || this.props.validators.map((v)=> {
            return (validators[v] || v).call(validators);
        });
        this.props.onValidate.apply(this, this.validators.map((v)=> {
            return v(value)
        }).filter((v)=>v));
    },
    render() {
        return <input onBlur={this.handleValidate} onChange={this.handleChange} id={this.props.name} className="form-control" type={this.props.dataType} value={this.state.value} title={this.props.title} placeholder={this.props.placeholder}/>
    }

})
module.exports = TextInput;