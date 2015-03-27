var React = require('react');

var SelectInput = React.createClass({
    getDefaultProps() {
        return {
            value: '',
            title: '',
            placeholder: '',
            onValueChange: function () {
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
            });

        }

    },

    render() {
        var opts = this.props.options || [];
        return <select className="form-control" onChange={this.handleChange} name={this.props.name} value={this.state.value} title={this.props.title} placeholder={this.props.placeholder}>
        {opts.map((o, i)=> {
            return <option key={'s' + i}>{o}</option>
        })}
        </select>
    }

})
module.exports = SelectInput;