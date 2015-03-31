var React = require('react'), FieldMixin = require('../FieldMixin.jsx');


var DateInput = React.createClass({
    mixins: [FieldMixin],
    render() {
        return <input onBlur={this.handleValidate} onChange={this.handleChange} id={this.props.name}
                      className="form-control" type="date-time" value={this.props.value}
                      title={this.props.title} placeholder={this.props.placeholder}/>
    }
});

module.exports = DateInput;