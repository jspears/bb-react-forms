var React = require('react');
var Template = require('../template.jsx');
var List = React.createClass({
    getDefaultProps() {
        return {
            value: [],
            title: '',
            placeholder: '',
            itemType:'Text',
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
        return <ul className="">
        {this.props.value.map((v) => {
            return <li>{}</li>
        })}
        </ul>
    }

})
module.exports = List;