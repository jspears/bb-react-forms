var React = require('react');

var TextInput = React.createClass({
    getDefaultProps(){
        return {
            value:'',
            title:'',
            name:'',
            placeholder:'',
            dataType:'text'
        }
    },
    render(){
        return <input id={this.props.name} className="form-control" type={this.props.dataType} value={this.props.value} title={this.props.title} placeholder={this.props.placeholder}/>
    }

})
module.exports = TextInput;