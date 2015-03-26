require("bootstrap-webpack!../bootstrap.config.js");
var React = require('react');
var Form = require('bb-react-forms').Form;

var App = React.createClass({
    getInitialState() {
        return {
            value: JSON.stringify({
                schema: {
                    title: {type: 'Select', options: ['Mr', 'Mrs', 'Ms']},
                    name: 'Text'/*,
                    email: {validators: ['required', 'email']},
                    birthday: 'Date',
                    password: 'Password',
                    address: {type: 'NestedModel'},
                    notes: {type: 'List', itemType: 'Text'}*/
                },
                fieldsets: [
                    {legend: 'Name', fields: ['title', 'name']}/*, 'email', 'password']},
                    {legend: 'Birthday', fields: 'birthday'},
                    {legend: 'Other'}*/
                ]
            })
        }
    },
    handleChange(e) {
        this.setState({
            value: e.target.value
        })
    },
    render() {
        var schema;
        try {
            schema = JSON.parse(this.state.value);
        } catch (e) {
            console.log('can not parse', e, val);
        }
        return <div>
            <textarea value={this.state.value} onChange={this.handleChange}/>
        { schema ? <Form schema={schema}/> : null}

        </div>
    }

});

React.render(<App/>, document.getElementById('content'))