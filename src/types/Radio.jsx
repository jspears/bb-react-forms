var React = require('react');
var tu = require('../tutils');

var RadioItem = React.createClass({

    render(){
        var {val, label, labelHTML, id, name, checked, handleChange} = this.props;


        label = labelHTML ? <span htmlFor={id} dangerouslySetInnerHTML={{__html:labelHTML}}/> : label;

        return (<div className="radio">
            <label htmlFor={id}>
                <input checked={checked} type="radio"
                       name={name} id={id} value={val}
                       onChange={handleChange}/>
                {label}
            </label>
        </div>);
    }
});

var RadioInput = React.createClass({
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
        return this.props.value;
    },


    handleCheckChange(e){
        this.props.onValueChange(e.target.value, this.props.value, this.props.name, this.props.path);
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
        var {name,template,path, field, value} = this.props;
        var RadioItemTemplate = template || RadioItem;
        return (<ul>{field.options.map((option, index)=> {
            option = tu.isString(option) ? {label: option, val: option} : option;
            if (!('val' in option)) {
                option.val = option.label || index;
            }
            var key = '' + name + option.val, checked = '' + value === '' + option.val;
            console.log('key', key);
            return <RadioItemTemplate key={key}
                                      id={tu.path(path,index)}
                                      name={name}
                                      val={option.val}
                                      label={option.label}
                                      labelHTML={option.labelHTML}
                                      checked={checked}
                                      handleChange={this.handleCheckChange}/>


        }, this)}</ul>)
    }
});

module.exports = RadioInput;