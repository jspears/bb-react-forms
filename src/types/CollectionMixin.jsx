var _ = require('lodash');
var React = require('react');
var Editor = require('../Editor.jsx');
var CollectionMixin = {

    getInitialState() {
        return this.wrap(this.props);
    },
    componentWillReceiveProps: function (newProps) {
        this.setState(this.wrap(newProps));
    },
    getItemEditorValue(){
        var value = this.refs.itemEditor.getValue();
        return value;
    },
    getValue(){
        return this.unwrap(this.state.wrapped);
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

        this.setState({
            showAdd: false,
            showEdit: true,
            editPid: pid,
            editValue: this.cloneVal(val)
        });
    },

    changeValue(newValue, oldValue) {
        var unwrapped = this.unwrap(newValue);
        if (this.props.onValueChange(unwrapped, this.unwrap(oldValue), this.props.name, this.props.path) !== false) {
        }

        this.setState({
            value: unwrapped,
            wrapped: newValue,
            showAdd: false,
            showEdit: false,
            editValue: null
        });
    },
    handleAddBtn(e) {
        e && e.preventDefault();
        this.setState({showAdd: true, editValue: null});
    },
    handleCancelAdd(e) {
        e && e.preventDefault();
        this.setState({showAdd: false, showEdit: false, editValue: null});
    },
    handleAddValue(e) {
        e && e.preventDefault();
        this.addValue(this.getItemEditorValue());
    },
    handleEditValue(e) {
        e && e.preventDefault();
        var value = this.state.wrapped || [], editPid = this.state.editPid, nv = this.getItemEditorValue(), pos = 0;
        value.some(function (v, i) {
            if (v.id === editPid) {
                pos = i;

                v.value = nv;
                return true;
            }
        });
        this.changeValue(value);

    },

    addValue(newValue) {
        var values = this.state.wrapped || [], oval = values && values.concat();
        values.push({
            id: newValue.key || values.length,
            value: newValue
        });
        this.changeValue(values, oval);

    },

    renderAddEditTemplate(edit, create) {
        var handler, label = ''
        if (edit) {
            handler = this.handleEditValue;
            label = 'Save'
        } else if (create) {
            handler = this.handleAddValue;
            label = 'Create'
        } else {
            return null;
        }
        var form = this.props.form;
        var value = this.state.editValue || (this.state.editValue = {})
        return <div className="panel-body">
            <Editor ref="itemEditor" field={this.getTemplateItem()} value={value}
                    pid={this.state.editPid}
                    form={null}/>
            <button className="btn btn-primary pull-right" onClick={handler}>{label}</button>
            <button className="btn pull-left" onClick={this.handleCancelAdd}>Cancel</button>
        </div>
    },
    renderAddBtn() {
        return <div className="clearfix"><button className="btn btn-xs pull-right btn-default" onClick={this.handleAddBtn}><i
            className="icon-add"/>Add</button></div>
    },

    renderAdd() {
        var field = this.props.field;
        if (!field.canAdd) {
            return null;
        }
        var {showAdd, showEdit} = this.state;
        return showAdd || showEdit ? <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className={ 'panel-title clearfix '}>
                    {showAdd ? 'Create' : 'Edit'  }
                </h3>
            </div>
            { this.renderAddEditTemplate(showEdit, showAdd) }
        </div> : this.renderAddBtn();
    }
}
module.exports = CollectionMixin;