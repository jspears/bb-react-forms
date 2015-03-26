var React = require('react');

var SelectInput = React.createClass({
    getDefaultProps() {
        return {
            value: '',
            title: '',
            placeholder: ''
        }
    },
    render() {
        var opts = this.props.options || [];
        return <select className="form-control" value={this.props.value} title={this.props.title} placeholder={this.props.placeholder}>
        {opts.map((o, i)=> {
            return <option key={'s' + i}>{o}</option>
        })}
        </select>
    }

})
module.exports = SelectInput;