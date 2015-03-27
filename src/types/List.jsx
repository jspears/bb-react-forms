var React = require('react');

var ListItemTemplate = React.createClass({
    getDefaultProps(){
        return {
            type: 'Text',
            onMoveUp(){
            },
            onMoveDown(){
            },
            onDelete(){
            },
            onValidate(){
            },
            onValueChange(){
            },
            last: false
        }
    },
    handleMoveUp(e){
        this.props.onMoveUp(this.props.pos, this.props.value);
    },
    handleMoveDown(e){
        this.props.onMoveDown(this.props.pos, this.props.value);
    },
    handleDelete(e){
        this.props.onDelete(this.props.pos, this.props.value);
    },

    render(){
        var {pos, name, schema, value, onMoveUp, onMoveDown, onDelete, onValidate, onValueChange} = this.props;
        var type = schema.type;
        var Component = require('types/' + type + '.jsx');
        return <li>
            <Component field={schema} value={value} onValidate={onValidate} onValueChange={onValueChange}/>

            <div className="button-group  pull-right">
                <button onClick={this.handleMoveUp} className={'tiny-button '+(pos == 0 ? 'hide':'') } title="Move Up">
                    <i className='glyphicon glyphicon-chevron-up'/></button>
                <button onClick={this.handleMoveDown} className={'tiny-button '+(last ? 'hide':'') } title="Move Down">
                    <i className='glyphicon glyphicon-chevron-down'/></button>
                <button onClick={this.handleDelete} className='tiny-button' title="Delete"><i
                    className='glyphicon glyphicon-remove'/></button>
            </div>
        </li>
    }

});

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
            itemTemplate: ListItemTemplate
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