var react = require('react');

var MixedInput = react.createClass({


    render() {
        var {field, name, value, ...props} = this.props;
        this.canAdd = field.canAdd;
        this.canRemove = field.canRemove;
        this.canReorder = field.canReorder;
        this.allowedKeys = field.allowedKeys || [];
        this.schema = field.subSchema;

        var value = this.state.value || {}, keys = Object.keys(value);
        var diff = allowedKeys.filter(function (v) {
            return !~keys.indexOf(v)
        });
        return <div class="mixed-input">

            {Object.keys(value).map((v, k) => {

            })}

        </div>
    }
})