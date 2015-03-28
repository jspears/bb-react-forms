var React = require('react');

var Template = require('../template.jsx');
function extractValue(v) {
    return v.value;
}
function toValues(value, id) {
    return {
        id, value
    }
}

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
            value: []
        }
    },
    handleMoveUp(pos, val){
        console.log('move-up', arguments);
        var values = this.state.value, oval = values && values.concat();
        values.splice(Math.max(pos - 1, 0), 0, values.splice(pos, 1)[0]);
        this.changeValue(values, oval);
    },
    handleMoveDown(pos, val){
        console.log('move-down', arguments);
        var values = this.state.value, oval = values && values.concat();
        values.splice(Math.min(pos + 1, values.length), 0, values.splice(pos, 1)[0]);
        this.changeValue(values, oval);

    },
    handleDelete(pos, val){
        console.log('delete', arguments);
        var values = this.state.value, oval = values && values.concat();
        values.splice(pos, 1);
        this.changeValue(values, oval);
    },
    changeValue(newValue, oldValue){
        if (this.props.onValueChange(newValue.map(extractValue), oldValue && oldValue.map(extractValue), this.props.name) !== false) {
            this.setState({
                value: newValue,
                showAdd: false,
                newValue: null
            });
            return true;
        }
        return false;

    },
    handleAddBtn(e){
        e && e.preventDefault();
        this.setState({showAdd: true});
    },
    handleCancelAdd(e) {
        e && e.preventDefault();
        this.setState({showAdd: false, newValue: null});
    },
    handleAddValue(e){
        e && e.preventDefault();
        this.addValue(this.state.newValue);
    },
    addValue (newValue) {
        var values = this.state.value || [], oval = values && values.concat();
        values.push(toValues(newValue, values.length));
        this.changeValue(values, oval);
    },
    updateNewValue(v){
        this.setState({newValue: v});
    },
    componentDidMount(){
        this.setState({
            value: this.props.value && this.props.value.map(toValues) || []
        })
    },
    renderAddTemplate(){
        var newField = !this.props.field.itemType || _.isString(this.props.field.itemType) ? {
            type: this.props.field.itemType || 'Text',
            name: 'newValue'
        } : this.props.field.itemType
        return <div>
            <Template field={newField} value={this.state.newValue} name="newValue" onValidChange={this.updateNewValue}/>
            <button className="button pull-right" onClick={this.handleAddValue}>Add</button>
            <button className="button pull-right" onClick={this.handleCancelAdd}>Cancel</button>
        </div>
    },
    renderAddBtn(){
        return <button className="button pull-right" onClick={this.handleAddBtn}><i className="icon-add"/>Add</button>
    },

    renderAdd(){
        var field = this.props.field;
        if (!field.canAdd) {
            return null;
        }
        return this.state.showAdd ? this.renderAddTemplate() : this.renderAddBtn();

    },

    render() {

        var {name, itemTemplate, itemType, errors, path,field} = this.props, item = (!itemType || _.isString(itemType)) ? {
            type: itemType || 'Text',
            name: name
        } : itemType;
        item.canReorder = field.canReorder;
        item.canDelete = field.canDelete;
        var ListItemTemplate = itemTemplate;
        var values = this.state.value || [], length = values.length;
        return <div>
            {this.renderAdd()}
            <ul className="edit-list">
                {values.map((v, i) => {
                    return <ListItemTemplate key={'li-'+name+'-'+v.id} pos={i} path={path} onMoveUp={this.handleMoveUp}
                                             onMoveDown={this.handleMoveDown} onDelete={this.handleDelete}
                                             field={item}
                                             value={v.value} errors={errors} last={i+1 === length}/>
                })}
            </ul>
        </div>;
    }

});
module.exports = ListInput;