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
        var Component = require('./' + type + '.jsx');
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
module.exports = ListItemTemplate;