var React = require('react');
var PropsStateValueMixin = require('../PropsStateValueMixin.js');
var tu = require('../tutils');

var RadioItem = React.createClass({

    render(){
        var {val, label, labelHTML, id, name, checked, handleChange} = this.props;


        var labelOut = labelHTML ? <label htmlFor={id} dangerouslySetInnerHTML={{__html:labelHTML}}/> :
            <label htmlFor={id}>{label}</label>;

        return <li><input checked={checked} type="radio"
                          name={name} id={id} value={val}
                          onChange={handleChange}/>{labelOut}</li>;
    }
});

var RadioInput = React.createClass({
    mixins: [PropsStateValueMixin],
    getDefaultProps() {
        return {
            value: '',
            title: '',
            name: '',
            placeholder: '',
            dataType: this.dataType,
            onValueChange() {
            },
            onValidate(){
            },
            template: RadioItem
        }

    },
    getValue(){
        return this.state.value;
    },

    getInitialState() {
        return {
            value: this.props.value
        }
    },

    handleCheckChange(e){
        this.props.onValueChange(e.target.value, this.state.value, this.props.name);
        this.setState({
            value: e.target.value
        });
    },

    /**
     * Create the checkbox list HTML
     * @param {Array}   Options as a simple array e.g. ['option1', 'option2']
     *                      or as an array of objects e.g. [{val: 543, label: 'Title for object 543'}]
     * @return {String} HTML
     */
        makeOptions (array, props) {


    },

    render()
    {
        var {name,template,path, field} = this.props, value = '' + (this.state.value == null ? '' : this.state.value);
        var RadioItemTemplate = template || RadioItem;
        return (<ul>{field.options.map((option, index)=> {
            option = tu.isString(option) ? {label: option, val: option} : option;
            if (!('val' in option)) {
                option.val = index;
            }
            var key = '' + name + option.val;
            console.log('key', key);
            return <RadioItemTemplate key={key}
                                      id={tu.path(path,index)}
                                      name={name}
                                      val={option.val}
                                      label={option.label}
                                      labelHTML={option.labelHTML}
                                      checked={value === ''+option.val}
                                      handleChange={this.handleCheckChange}/>


        }, this)}</ul>)
    }
});

module.exports = RadioInput;