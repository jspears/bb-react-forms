var React = require('react'), FieldMixin = require('../FieldMixin.jsx');


var TextInput = React.createClass({
    mixins: [FieldMixin],
    render() {
        return <input id={this.props.name}
                      className="form-control" type="hidden" value={this.props.value}
                      data-path={this.props.path}
                      title={this.props.title} placeholder={this.props.placeholder}/>
    }
});

module.exports = TextInput;