var React = require('react');

var Editor = require('../Editor.jsx');
var _ = require('lodash');

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
            onValidate() {
            },
            itemTemplate: require('./ListItemTemplate.jsx')
        }
    },
    getInitialState() {
        var value = this.props.value || []
        return {
            wrapped: value.map(toValues)
        }
    },
    handleMoveUp(pos, val) {
        console.log('move-up', arguments);
        var values = this.state.wrapped, oval = values && values.concat();
        values.splice(Math.max(pos - 1, 0), 0, values.splice(pos, 1)[0]);
        this.changeValue(values, oval);
    },
    handleMoveDown(pos, val) {
        console.log('move-down', arguments);
        var values = this.state.wrapped, oval = values && values.concat();
        values.splice(Math.min(pos + 1, values.length), 0, values.splice(pos, 1)[0]);
        this.changeValue(values, oval);

    },
    handleDelete(pos, val, pid) {
        console.log('delete', arguments);
        var values = this.state.wrapped, oval = values && values.concat();
        values.splice(pos, 1);
        this.changeValue(values, oval);
    },
    handleEdit(pos, val, pid) {
        console.log('delete', arguments);
        this._editId = pid;
        this._newValue = _.clone(val);
        this.setState({
            showAdd: false,
            showEdit: true
        });
    },
    changeValue(newValue, oldValue) {
        var unwrapped = newValue.map(extractValue);
        if (this.props.onValueChange(unwrapped, oldValue && oldValue.map(extractValue), this.props.name) !== false) {
        }
        this.props.value = unwrapped;
        this.setState({
            wrapped: newValue,
            showAdd: false,
            showEdit: false
        });
    },
    handleAddBtn(e) {
        e && e.preventDefault();
        this._newValue = this._editId = null;
        this.setState({showAdd: true});
    },
    handleCancelAdd(e) {
        e && e.preventDefault();
        this.setState({showAdd: false, showEdit: false});
        this._newValue = this._editId = null;
    },
    handleAddValue(e) {
        e && e.preventDefault();
        this.addValue(this._newValue);
        this._newValue = this._editId = null;
    },
    handleEditValue(e) {
        e && e.preventDefault();
        var value = this.state.wrapped || [], ov = this._editId, nv = this._newValue, pos = 0;
        value.some(function (v, i) {
            if (v.id === ov) {
                pos = i;
                v.value = nv;
                return true;
            }
        });
        this.changeValue(value);

    },

    addValue(newValue) {
        var values = this.state.wrapped || [], oval = values && values.concat();
        values.push(toValues(newValue, values.length));
        this.changeValue(values, oval);

    },
    updateNewValue(v) {
        this._newValue = v;
    },
    getValue(){
        return this.state.value;
    },
    renderAddTemplate() {
        var newField = this._item;
        return <div>
            <Editor field={newField} value={this._newValue} name="newValue" onValueChange={this.updateNewValue}/>
            <button className="button pull-right" onClick={this.handleAddValue}>Add</button>
            <button className="button pull-right" onClick={this.handleCancelAdd}>Cancel</button>
        </div>
    },
    renderEditTemplate() {
        return <div>
            <Editor field={this._item} value={this._newValue} onValueChange={this.updateNewValue}/>
            <button className="button pull-right" onClick={this.handleEditValue}>Save</button>
            <button className="button pull-right" onClick={this.handleCancelAdd}>Cancel</button>
        </div>
    },
    renderAddBtn() {
        return <button className="button pull-right" onClick={this.handleAddBtn}>
            <i className="icon-add"/>
            Add</button>
    },

    renderAdd() {
        var field = this.props.field;
        if (!field.canAdd) {
            return null;
        }
        return <div className="panel panel-default">
            <div
                className="panel-body">{this.state.showAdd ? this.renderAddTemplate() : this.state.showEdit ? this.renderEditTemplate() : this.renderAddBtn()}</div>
        </div>

    },

    render() {
        console.log('render');
        var {name, itemTemplate, itemType, errors, path,field} = this.props, item = (!itemType || _.isString(itemType)) ? {
            type: itemType || 'Text',
            name: name
        } : itemType, ListItemTemplate = itemTemplate, values = this.state.wrapped || [], length = values.length;
        item.canReorder = field.canReorder;
        item.canDelete = field.canDelete;
        item.canEdit = field.canEdit;
        this._item = item;
        return (<div className="list-editor">
            {this.renderAdd()}
            <ul className="edit-list bbf-list list-group">
                {values.map((v, i) => {
                    return <ListItemTemplate key={'li-' + name + '-' + v.id} pos={i} path={path}
                                             onMoveUp={this.handleMoveUp}
                                             onMoveDown={this.handleMoveDown} onDelete={this.handleDelete}
                                             onEdit={this.handleEdit}
                                             field={item}
                                             pid={v.id}
                                             value={v.value} errors={errors} last={i + 1 === length}/>
                })}
            </ul>
        </div>);
    }

});
module.exports = ListInput;