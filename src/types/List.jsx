var React = require('react');

var Template = require('../template.jsx');
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
    handleChange(e) {
        /*if (this.props.onValueChange(e.target.value, this.state.value, this.props.name) !== false) {
         this.setState({
         value: e.target.value
         });

         }*/

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
    handleAddBtn(e){
        e && e.preventDefault();
        this.setState({showAdd: true});
    },
    handleCancelAdd: function (e) {
        e && e.preventDefault();
        this.setState({showAdd: false});
    },
    addValue: function (v) {
        var newValue = this.state.newValue;
        var values = this.state.value;
        values.push(newValue)
        this.setState({showAdd: false, value: values})
    },
    updateNewValue(v){
        this.setState('newValue', v);
    },
    renderAddTemplate(){
        var newField = !this.props.field.itemType || _.isString(this.props.field.itemType) ? {
            type:this.props.field.itemType || 'Text',
            name:'newValue'
        } : this.props.field.itemType
        return <div>
            <Template field={newField} value={this.state.newValue} name="newValue" onValidChange={this.updateNewValue}/>
            <button className="button pull-right" onClick={this.addValue}>Add</button>
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

        var {name, itemTemplate, itemType, errors} = this.props, field = (!itemType || _.isString(itemType)) ? {
            type: itemType || 'Text',
            name: name
        } : itemType;

        var values = this.state.value || [], length = values.length;
        return <div>
            {this.renderAdd()}
            <ul className="edit-list">
                {values.map((v, i) => {
                    return <itemTemplate key={'li-'+name+'-'+i} pos={i} onMoveUp={this.handleMoveUp}
                                         onMoveDown={this.handleMoveDown} onDelete={this.handleDelete} field={field}
                                         value={v} errors={errors} last={i+1 === length}/>
                })}
            </ul>
        </div>;
    }

});
module.exports = ListInput;