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
        e.preventDefault();
        this.props.onMoveUp(this.props.pos, this.props.value);
    },
    handleMoveDown(e){
        e.preventDefault();
        this.props.onMoveDown(this.props.pos, this.props.value);
    },
    handleDelete(e){
        e.preventDefault();
        this.props.onDelete(this.props.pos, this.props.value);
    },

    render(){
        var {pos, field, value, onValidate, last, onValueChange} = this.props;
        var {type, name, canReorder, canDelete} = field;
        var Component = require('./' + type + '.jsx');
        return <li>
            <Component field={field} value={value} onValidate={onValidate} onValueChange={onValueChange}/>

            <div className="button-group  pull-right">
                {canReorder ? <button onClick={this.handleMoveUp} className={'tiny-button '+(pos == 0 ? 'hide':'') }
                                      title="Move Up">
                    <i className='glyphicon glyphicon-chevron-up'/></button> : null }
                {canReorder ? <button onClick={this.handleMoveDown} className={'tiny-button '+(last ? 'hide':'') }
                                      title="Move Down">
                    <i className='glyphicon glyphicon-chevron-down'/></button> : null }
                { canDelete ? <button onClick={this.handleDelete} className='tiny-button' title="Delete"><i
                    className='glyphicon glyphicon-remove'/></button> : null}
            </div>
        </li>
    }

});
module.exports = ListItemTemplate;