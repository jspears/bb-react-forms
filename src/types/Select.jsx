var React = require('react'),  FieldMixin = require('../FieldMixin.jsx');;

var SelectInput = React.createClass({

    render() {
        var opts = this.props.options || [];
        return <select className="form-control"  onBlur={this.handleValidate} onChange={this.handleChange} name={this.props.name} value={this.state.value} title={this.props.title} placeholder={this.props.placeholder}>
        {opts.map((o, i)=> {
            return <option key={'s' + i}>{o}</option>
        })}
        </select>
    }

})
module.exports = SelectInput;