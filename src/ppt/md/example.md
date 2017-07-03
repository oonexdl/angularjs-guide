What is Angularjs?

A framework to extend HTML's syntax when buiding dynamic web apps. 



Core Concepts

- Data binding
- Expressisons
- Interpolation
- Directives
- View and routes
- Filters
- HTML Compiler
- Forms


Data binding

```html
<div ng-init="email='xiaodongli312@gmail.com';password='123456';">
  <div>
    email: <input type="string" min="0" ng-model="email">
  </div>
  <div>
    password: <input type="password" min="0" ng-model="password">
  </div>
  <div>
    <b>Validation:</b> {{ password }}
  </div>
</div> 
```
