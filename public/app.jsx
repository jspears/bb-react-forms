require("bootstrap-webpack!../bootstrap.config.js");
var React = require('react');
var Form = require('bb-react-forms').Form;
var tu = require('../src/tutils');

var App = React.createClass({
    /* getInitialState() {
     return {
     schema: JSON.stringify({
     schema: {
     title: {type: 'Select', options: ['Mr', 'Mrs', 'Ms']},
     name: 'Text'/!*,
     email: {validators: ['required', 'email']},
     birthday: 'Date',
     password: 'Password',
     address: {type: 'NestedModel'},
     notes: {type: 'List', itemType: 'Text'}*!/
     },
     fieldsets: [
     {legend: 'Name', fields: ['title', 'name']}/!*, 'email', 'password']},
     {legend: 'Birthday', fields: 'birthday'},
     {legend: 'Other'}*!/
     ],
     submitButton: 'Save'
     }),
     data: {},
     file: 'nested'
     }
     },*/
    getInitialState(){
        return {}
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
        this.loadFile(e.target.value);
    },
    loadFile(value){
        var json = value !== 'none' ? require('./samples/' + value + '.js') : {schema: {}};
        json.output = null;
        this.setState(json);
    },

    componentWillMount() {
        //  this.parse(this.state.value);
        this.loadFile('list');
    },
    handleValueChange(value){
        this.setState({output: value});
    },
    handleErrors: function (errors) {
        console.log('errors', errors);
    },
    render() {
        var value = JSON.stringify(this.state.output || this.state.data || {}, null, 2);
        var errors = this.state.errors;
        return <div>
            <select onChange={this.changeFile}>
                <option value="none">None Selected</option>
                <option value="checkboxes">Checkboxes</option>
                <option value="nested">Nested</option>
                <option value="nested-data">Nested Data</option>
                <option value="nested-errors">Nested Errors</option>
                <option value="normal">Normal</option>
                <option value="list">List</option>
            </select>
            <textarea value={this.state.value} onChange={this.handleChange}/>
            <Form schema={this.state.schema} value={this.state.data} errors={errors}
                  onValueChange={this.handleValueChange} onValidate={this.handleErrors}/>
            <pre>{value}</pre>

        </div>
    }

});

React.render(<App/>, document.getElementById('content'))