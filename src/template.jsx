var React = require('react');
var tu = require('./tutils');


var Template = React.createClass({
    getInitialState() {
        return {
            message: this.props.error && (this.props.error.message || this.props.error)
        }
    },
    handleValidate(mesg) {
        if (mesg.length) {
            this.setState({message: mesg[0].message || mesg[0]});
        } else {
            this.setState({message: null});
        }
        this.props.onValidate.apply(this, arguments);
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
        if (field.title != null) {
            return field.title;
        }
        //Add spaces
        return field.name.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => {
            return s.toUpperCase();
        });
    },
    render() {
        var {field,onValueChange, name, value, ...props} = this.props;
        var errMessage = this.state.message;
        var clsName = "form-group field-name " + (errMessage != null ? 'has-error' : '');
        var {name,type, help} = field;

        var Component = require('types/' + type + '.jsx');

        return <div className={clsName}>
            <label className="col-sm-2 control-label" htmlFor={name}>{this.title()}</label>

            <div className="col-sm-10">
                <span>
                    <Component field={field} value={value} name={name} {...props} onValueChange={onValueChange}
                               onValidate={this.handleValidate}/>
                </span>

                <p className="help-block">{errMessage || help || ''}</p>
            </div>
        </div>
    }
});
module.exports = Template;