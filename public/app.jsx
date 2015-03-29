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
        return {
            loadErrors: false,
            loadData: false
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
    handleData(e){
        this.setState({
            loadData: e.target.checked
        })
    },
    handleError(e){
        this.setState({
            loadErrors: e.target.checked
        })
    },

    render() {
        var value = JSON.stringify(this.state.output || this.state.data || {}, null, 2);
        var {errors, schema, data, loadErrors, loadData} = this.state;
        if (!loadData) data = null;
        if (!loadErrors) errors = null;

        return <div>
            <select onChange={this.changeFile}>
                <option value="none">None Selected</option>
                <option value="checkboxes">Checkboxes</option>
                <option value="radio">Radio</option>
                <option value="nested">Nested</option>
                <option value="normal">Normal</option>
                <option value="list">List</option>
            </select>
            <label>Load Data:
                <input type="checkbox" onChange={this.handleData}/>
            </label>
            <label>Load Errors:
                <input type="checkbox" onChange={this.handleError}/>
            </label>
            <Form schema={schema} value={data}
                  errors={ errors }
                  onValueChange={this.handleValueChange} onValidate={this.handleErrors}/>
            <fieldset>
                <legend>Data</legend>
                <pre>{JSON.stringify(data || {}, null, 2)}</pre>
            </fieldset>
            <fieldset>
                <legend>Schema</legend>
                <pre>{JSON.stringify(schema || {}, null, 2)}</pre>
            </fieldset>s
        </div>
    }

});

React.render(<App/>, document.getElementById('content'))