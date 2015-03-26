#Backbone Forms for React
Not really anything to do with backbone, but borrowed backbone-forms schema.

###Example
```jsx
    <Form
        action='/submit/path'
        method='POST'
         schema= {{
        schema:{
            title:      { type: 'Select', options: ['Mr', 'Mrs', 'Ms'] },
            name:       'Text',
            email:      { validators: ['required', 'email'] },
            birthday:   'Date',
            password:   'Password',
            address:    { type: 'NestedModel', model: Address },
            notes:      { type: 'List', itemType: 'Text' }
        },
        fieldsets:[
                              {legend:'Name', fields:['title', 'email', 'name', 'password']},
                              {legend:'Other'}
                              ]

        }}

    }/>


```