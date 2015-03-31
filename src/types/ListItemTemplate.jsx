var React = require('react');
var tpath = require('../tutils').path;
var PropsStateValueMixin = require('../PropsStateValueMixin');
var ListItemTemplate = React.createClass({
    mixins: [PropsStateValueMixin],
    getDefaultProps() {
        return {
            type: 'Text',
            onMoveUp() {
            },
            onMoveDown() {
            },
            onDelete() {
            },
            onValidate() {
            },
            onValueChange() {
            },
            onEdit() {
            },
            last: false,
            itemToString: function (v) {
                return v != null ? v.toString() : '';
            }
        }
    },
    handleMoveUp(e) {
        e.preventDefault();
        this.props.onMoveUp(this.props.pos, this.props.value, this.props.pid);
    },
    handleMoveDown(e) {
        e.preventDefault();
        this.props.onMoveDown(this.props.pos, this.props.value, this.props.pid);
    },
    handleDelete(e) {
        e.preventDefault();
        this.props.onDelete(this.props.pos, this.props.value, this.props.pid);
    },
    handleEdit(e) {
        e.preventDefault();
        this.props.onEdit(this.props.pos, this.props.value, this.props.pid);
    },
    render() {
        var {pos, field, value, errors, path, onValidate, last, onValueChange} = this.props;
        var {type, name, canReorder, canDelete} = field;
        var Component = require('./' + type + '.jsx');
        var error = errors && errors[path];
        var btnCls='btn btn-xs btn-default'
        return <li className={'list-group-item '+(error ? 'has-error' : '')}>
            <span className="item-value" onClick={field.canEdit ? this.handleEdit : null}
                  path={tpath(this.props.path, this.props.pos)}
                 >{this.props.itemToString(value)}</span>
            { error ? <p className="help-block">{error}</p> : null }
            <div className="btn-group  pull-right">
                {canReorder && pos > 0 ? <button onClick={this.handleMoveUp} className={btnCls}
                                                 title="Move Up">
                    <i className='glyphicon glyphicon-chevron-up'/>
                </button> : null }
                {canReorder && !last ? <button onClick={this.handleMoveDown} className={btnCls}
                                               title="Move Down">
                    <i className='glyphicon glyphicon-chevron-down'/>
                </button> : null }
                { canDelete ? <button onClick={this.handleDelete} className={btnCls} title="Delete">
                    <i
                        className='glyphicon glyphicon-remove'/>
                </button> : null}
            </div>
        </li>
    }

});
module.exports = ListItemTemplate;