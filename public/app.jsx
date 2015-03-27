require("bootstrap-webpack!../bootstrap.config.js");
var React = require('react');
var Form = require('bb-react-forms').Form;
var tu = require('../src/tutils');

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
            }),
            data: {},
            file: 'nested'
        }
    },
    parse: tu.debounce(function (value) {
        if (!value)
            return;
        try {
            this.setState({
                schema: JSON.parse(value)
            })
        } catch (e) {
        }

    }, 500),
    handleChange(e) {
        this.setState({
            value: e.target.value
        });
        this.parse(e.target.value);
    },
    changeFile(e) {
        var json = e.target.value  !== 'none' ? require('./samples/' + e.target.value + '.js') : {};
        this.setState({
            schema: json,
            file: e.target.value
        });
    },
    handleValueChange(data) {
        this.setState({data: data});
    },
    componentDidMount() {
        this.parse(this.state.value);
    },
    render() {
        var value = JSON.stringify(this.state.data, null, 2);
        return <div>
            <select onChange={this.changeFile}>
                <option value="none">None Selected</option>
                <option value="nested">Nested</option>
                <option value="normal">Normal</option>
            </select>
            <textarea value={this.state.value} onChange={this.handleChange}/>
            <Form schema={this.state.schema} value={this.state.data} onValueChange={this.handleValueChange}/>
            <pre>{value}</pre>
        </div>
    }

});

React.render(<App/>, document.getElementById('content'))