var React = require('react');

var Password = React.createClass({
    getDefaultProps(){
        return {
            value:'',
            title:'',
            name:'',
            placeholder:'',
            dataType:'text'
        }
    },
    getInitialState(){
      return {
          value:this.props.value
      }
    },
    render(){
        return <input id={this.props.name} onChange={this.handleChange} className="form-control" type="password" value={this.state.value} title={this.props.title} placeholder={this.props.placeholder}/>
    }

})
module.exports = Password;