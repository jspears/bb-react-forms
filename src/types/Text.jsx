var React = require('react'), FieldMixin = require('../FieldMixin.jsx');


var TextInput = React.createClass({
    mixins: [FieldMixin],
    render() {
        return <input ref="input" onBlur={this.handleValidate} onChange={this.handleChange} id={this.props.name}
                      className="form-control" type={this.props.dataType} value={this.props.value}
                      data-path={this.props.path}
                      title={this.props.title} placeholder={this.props.placeholder}/>
    }
});

module.exports = TextInput;