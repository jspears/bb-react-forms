var React = require('react');


var ListInput = React.createClass({
    getDefaultProps() {
        return {
            value: [],
            title: '',
            placeholder: '',
            itemType: 'Text',
            onValueChange() {
            },
            onValidate(){
            },
            itemTemplate: require('./ListItemTemplate.jsx')
        }
    },
    getInitialState() {
        return {
            value: this.props.value
        }
    },
    handleChange(e) {
        if (this.props.onValueChange(e.target.value, this.state.value, this.props.name) !== false) {
            this.setState({
                value: e.target.value
            });

        }

    },
    handleMoveUp(){
        console.log('move-up', arguments);
    },
    handleMoveDown(){
        console.log('move-down', arguments);

    },
    handleDelete(){
        console.log('delete', arguments);
    },
    render() {

        var {name, itemTemplate, itemType, data, errors, value} = this.props, length = value.length, field = (!itemType || _.isString(itemType)) ? {
            type: itemType || 'Text',
            name: name
        } : itemType;
        data = data || [];
        return <ul className="edit-list">
            {value.map((v, i) => {
                return <itemTemplate key={'li-'+name+'-'+i} pos={i} onMoveUp={this.handleMoveUp}
                                     onMoveDown={this.handleMoveDown} onDelete={this.handleDelete} field={field}
                                     data={v} errors={errors} last={i+1 === length}/>
            })}
        </ul>
    }

});
module.exports = ListInput;