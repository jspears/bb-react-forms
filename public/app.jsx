var React = require('react');
var Form = require('bb-react-forms').Form;
var tu = require('../src/tutils');
var Alert = require('react-bootstrap/lib/Alert');
var Modal = require('react-bootstrap/lib/Modal');
var ModalTrigger = require('react-bootstrap/lib/ModalTrigger');
var Button = require('react-bootstrap/lib/Button');
require('./index.less');
var MyModal = React.createClass({
    render() {
        return (
            <Modal {...this.props} bsStyle='primary' title='Submit' animation={true}>
                <div className='modal-body'>
                    <h3>Errors</h3>
                    {this.props.errors && Object.keys(this.props.errors).map((key)=> {
                        return <div>
                            <h4>{key}</h4>
                            <ul>
                                {this.props.errors[key].map((v)=> {
                                    return <li>{v}</li>
                                })}
                            </ul>
                        </div>
                    })}
                    <div>
                        <h2>Values</h2>
                        <pre>{JSON.stringify(this.props.value, void(0), 2)}}</pre>
                    </div>
                </div>
                <div className='modal-footer'>
                    <Button onClick={this.props.onRequestHide}>Close</Button>
                </div>
            </Modal>
        );
    }
});
var App = React.createClass({
    getInitialState(){
        return {
            loadErrors: false,
            loadData: false,
            data: {},
            errors: {},
            file: 'list'
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
        this.loadFile(e.target.value, this.state.loadData, this.state.loadErrors);
    },
    loadFile(value, loadErrors, loadData){
        var json = value !== 'none' ? require('./samples/' + value + '.js') : {schema: {}};
        json.output = null;
        var state = {schema: json.schema, file: value};
        if (loadErrors) {
            state.errors = json.errors;
        } else {
            state.errors = {};
        }
        if (loadData) {
            state.data = json.data;
        } else {
            state.data = {};
        }
        this.setState(state);
    },

    componentWillMount() {
        //  this.parse(this.state.value);
        this.loadFile(this.state.file);
    },
    handleValueChange(value){
        this.setState({output: value});
    },
    handleErrors: function (errors) {
        console.log('errors', errors);
    },
    handleData(e){

        this.loadFile(this.state.file, this.state.loadErrors, e.target.checked);
        this.setState({
            loadData: e.target.checked
        });
    },
    handleError(e){

        this.loadFile(this.state.file, e.target.checked, this.state.loadData);
        this.setState({
            loadErrors: e.target.checked
        });
    },
    handleSubmit(e, errors, value){
        e && e.preventDefault();
        this.setState({
            alert: true,
            submitErrors: errors,
            submitValue: value
        })
    }
    ,
    hideModal(e, errors, value){
        this.setState({
            alert: false,
            submitErrors: null,
            submitValue: null

        })
    },

    render() {
        var value = JSON.stringify(this.state.output || this.state.data || {}, null, 2);
        var {errors, schema, data, loadErrors, loadData} = this.state;


        return <div className="container-fluid">
            <div className="row-fluid">
                <div className="span2">
                    <select onChange={this.changeFile} value={this.state.file}>
                        <option value="none">None Selected</option>
                        <option value="login">Login</option>
                        <option value="mixed">Mixed</option>
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
                </div>
                <div className="span10">
                    <div className="container-fluid">
                        <div className="row-fluid">
                            <div className="span12">
                                <Form schema={schema} value={data}
                                      errors={ errors }
                                      onValueChange={this.handleValueChange}
                                      onSubmit={this.handleSubmit}
                                      onValidate={this.handleErrors}/>
                            </div>
                        </div>
                    </div>
                    <fieldset>
                        <legend>Data</legend>
                        <pre>{JSON.stringify(data || {}, null, 2)}</pre>
                    </fieldset>
                    <fieldset>
                        <legend>Schema</legend>
                        <pre>{JSON.stringify(schema || {}, null, 2)}</pre>
                    </fieldset>

                </div>
            </div>
            { this.state.alert ? <MyModal ref="modal" onRequestHide={this.hideModal} errors={this.state.submitErrors}
                                          value={this.state.submitValue}/> : null}

        </div>
    }

});

React.render(<App/>, document.getElementsByTagName('body')[0])