var React = require('react');
var tu = require('./tutils');


var Template = React.createClass({
    getInitialState() {
        return {}
    },
    handleValidate(mesg) {
        this.setState(mesg || {message: null, type: null});
        this.props.onValidate(mesg);
    },
    getDefaultProps() {
        return {
            field: {
                type: 'Text'
            },
            onValueChange() {
            },
            onValidate() {
            }
        }
    },
    title: function () {
        var field = this.props.field || {};
        if (field.title) {
            return field.title;
        }
        //Add spaces
        return field.name.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => {
            return s.toUpperCase();
        });
    },
    render() {
        var {field,onValueChange, name, ...props} = this.props;
        var errMessage = this.state.message;
        var clsName = "form-group field-name " + (errMessage != null ? 'has-error' : '');
        var type = field.type;

        var Component = require('types/' + type + '.jsx');

        return <div className={clsName}>
            <label className="col-sm-2 control-label" htmlFor={field.name}>{this.title()}</label>

            <div className="col-sm-10">
                <span>
                    <Component field={field} name={field.name} {...props} onValueChange={onValueChange} onValidate={this.handleValidate}/>
                </span>

                <p className="help-block">{errMessage || field.help || ''}</p>
            </div>
        </div>
    }
});
module.exports = Template;