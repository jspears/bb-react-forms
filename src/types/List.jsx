var React = require('react');


var _ = require('lodash');
var tu = require('../tutils');
var CollectionMixin = require('./CollectionMixin.jsx');
var ListInput = React.createClass({
    mixins: [CollectionMixin],
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
    /*
     extractValue(v) {
     return v.value;
     },
     wrap(prop){
     return {wrapped: prop && prop.value && prop.value.map(this.toValues) || []};
     },
     toValues(value, id) {
     return {
     id, value
     }
     },
     */
    unwrap(value) {
        var ret = (value || []).map(function (v, i) {
            return v && v.value && v.value.value;
        });
        return ret;
    },

    wrap(prop){
        var value = prop && prop.value || [];
        var wrapped = value.map(function (v, k) {
            return {
                id: k,
                value: {
                    value: value[k]
                }
            }
        });
        return {
            wrapped
        };
    },
    cloneVal(val){
        return {
            value: _.clone(val)
        }
    },
    /* unwrap:function(value){
     if (value == null) return [];
     return value.map(this.extractValue);
     },*/
    getTemplateItem(){
        return {
            type: 'Object',
            name: this.props.field.name,
            title: this.props.field.title,
            subSchema: {
                value: this.props.field.itemType || this.props.itemType
            },
            fields: ['value']
        };
    },
    render() {
        var {name, itemTemplate, itemType, errors, path,field} = this.props, item = (!itemType || _.isString(itemType)) ? {
            type: itemType || 'Text',
            name: name
        } : itemType, ListItemTemplate = itemTemplate, values = this.state.wrapped || [], length = values.length;
        item.canReorder = field.canReorder;
        item.canDelete = field.canDelete;
        item.canEdit = field.canEdit;
        item.canAdd = field.canAdd;
        this._item = item;
        return (<div className="list-editor">
            {this.renderAdd()}
            <ul className="edit-list list-group">
                {values.map((v, i) => {
                    return <ListItemTemplate ref={name+'_'+i} key={'li-' + name + '-' + v.id} pos={i} path={tu.path(path,v.id)}
                                             onMoveUp={this.handleMoveUp}
                                             onMoveDown={this.handleMoveDown} onDelete={this.handleDelete}
                                             onEdit={this.handleEdit}
                                             field={item}
                                             pid={v.id}
                                             value={v.value.value} errors={errors} last={i + 1 === length}/>
                })}
            </ul>
        </div>);
    }

});
module.exports = ListInput;