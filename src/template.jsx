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
        var {field, name,  onValidate, ...props} = this.props;

        var {name,type,fieldClass, help} = field;

        var errMessage = this.state.message;
        var Component = require('types/' + type + '.jsx');
        var title = this.title();

        return <div className={"form-group field-name " + (errMessage != null ? 'has-error' : '') + ' ' + fieldClass}>
            {title ? <label className="col-sm-2 control-label" htmlFor={name}>{title}</label> : null}

            <div className="col-sm-10">
                <Component {...props} field={field} name={name}
                           onValidate={this.handleValidate}/>

                <p className="help-block">{errMessage || help || ''}</p>
            </div>
        </div>
    }
});
module.exports = Template;