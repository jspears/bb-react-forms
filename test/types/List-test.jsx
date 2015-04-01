describe('List', function () {
    var React = require('react/addons');
    var TestUtils = require('react/lib/ReactTestUtils');
    var expect = require('expect');
    var Form = require('../../src/index').Form;
    var Simulate = React.addons.TestUtils.Simulate;
    var _ = require('lodash');
    it('should render a list', function () {
        var schema = {
            schema: {
                todos: {
                    type: 'List',
                    itemType: 'Text',
                    canAdd: true,
                    canEdit: true,
                    canReorder: true,
                    canDelete: true
                }
            }
        }
        var root = TestUtils.renderIntoDocument(<Form schema={schema}/>);
        expect(root).toExist();
        expect(root.refs.todos).toExist();
        expect(root.refs.todos.refs.field.refs.todos_0).toNotExist();
        expect(root.refs.todos.refs.field.refs.todos_1).toNotExist();
        expect(root.refs.todos.refs.field.refs.todos_2).toNotExist();
    });
    it('should render a list with data the canAdd', function () {
        var schema = {
            schema: {
                todos: {
                    type: 'List',
                    itemType: 'Text',
                    canAdd: true,
                    canEdit: true,
                    canReorder: true,
                    canDelete: true
                }
            }
        }, data = {
            todos: [
                'one',
                'two',
                'three'
            ]
        }
        var root = TestUtils.renderIntoDocument(<Form schema={schema} value={data}/>);
        expect(root).toExist();
        expect(root.refs.todos).toExist();
        expect(root.refs.todos.refs.field.refs.addBtn).toExist();
        var todos = root.refs.todos.refs.field.refs

        expect(todos.todos_0.refs.upBtn).toNotExist();
        expect(todos.todos_0.refs.deleteBtn).toExist();
        expect(todos.todos_0.refs.downBtn).toExist();

        expect(todos.todos_1.refs.upBtn).toExist();
        expect(todos.todos_1.refs.deleteBtn).toExist();
        expect(todos.todos_1.refs.downBtn).toExist();

        expect(todos.todos_2.refs.upBtn).toExist();
        expect(todos.todos_2.refs.deleteBtn).toExist();
        expect(todos.todos_2.refs.downBtn).toNotExist();


    });
    it('should render a list with data without canAdd', function () {
        var schema = {
            schema: {
                todos: {
                    type: 'List',
                    itemType: 'Text',
                    canEdit: true,
                    canReorder: true,
                    canDelete: true
                }
            }
        }, data = {
            todos: [
                'one',
                'two',
                'three'
            ]
        }
        var root = TestUtils.renderIntoDocument(<Form schema={schema} value={data}/>);
        var todos = root.refs.todos.refs.field.refs
        expect(todos.addBtn).toNotExist();
        expect(todos.todos_0).toExist();
        expect(todos.todos_1).toExist();
        expect(todos.todos_2).toExist();
    });
    it('should render a list with data is not editable', function () {
        var schema = {
            schema: {
                todos: {
                    type: 'List',
                    itemType: 'Text'
                }
            }
        }, data = {
            todos: [
                'one',
                'two',
                'three'
            ]
        }
        var root = TestUtils.renderIntoDocument(<Form schema={schema} value={data}/>);

        expect(root.refs.todos.refs.field.refs.addBtn).toNotExist();
        var todos = root.refs.todos.refs.field.refs;

        expect(todos.todos_0.refs.upBtn).toNotExist();
        expect(todos.todos_0.refs.deleteBtn).toNotExist();
        expect(todos.todos_0.refs.downBtn).toNotExist();

        expect(todos.todos_1.refs.upBtn).toNotExist();
        expect(todos.todos_1.refs.deleteBtn).toNotExist();
        expect(todos.todos_1.refs.downBtn).toNotExist();

        expect(todos.todos_2.refs.upBtn).toNotExist();
        expect(todos.todos_2.refs.deleteBtn).toNotExist();
        expect(todos.todos_2.refs.downBtn).toNotExist();

    });
    it('should render a list without data and add values', function () {
        var schema = {
            schema: {
                todos: {
                    type: 'List',
                    itemType: 'Text',
                    canAdd: true,
                    canEdit: true,
                    canReorder: true,
                    canDelete: true
                }
            }
        }, data = {
            todos:[]
        }
        var root = TestUtils.renderIntoDocument(<Form schema={schema} value={data}/>);
        expect(root).toExist();
        expect(root.refs.todos).toExist();

        var refs = root.refs.todos.refs.field.refs;
        Simulate.click(refs.addBtn);
        var input = refs.itemEditor.refs.field.refs.value.refs.field.refs.input;
        Simulate.change(input, {target: {value: 'Hello, world'}});
        Simulate.click(refs.createBtn);
        expect(data.todos[0]).toEqual('Hello, world');

/*
        expect(todos.todos_1.refs.upBtn).toExist();
        expect(todos.todos_1.refs.deleteBtn).toExist();
        expect(todos.todos_1.refs.downBtn).toExist();

        expect(todos.todos_2.refs.upBtn).toExist();
        expect(todos.todos_2.refs.deleteBtn).toExist();
        expect(todos.todos_2.refs.downBtn).toNotExist();*/


    });

})