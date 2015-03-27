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
        return
    }

})
module.exports = SelectInput;