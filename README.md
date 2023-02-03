# Automation Testing CodeceptJS

This is automation framework using Codeceptjs

# Project Structure

```
|-- root
    |-- .github (folder stores ci config file)
    |   |-- workflow.yml
    |-- configuration (folder stores configuration for core)
    |   |-- environment
    |   |   |-- dev.env
    |   |-- coreConfiguration
    |-- helpers (folder for plugins/utils)
    |   |-- fragment
    |   |   |-- fakes.ts
    |   |-- plugins
    |   |   |-- playwright
    |   |   |-- allure
    |   |   |-- (another plugins)
    |-- modules (folder for Noah modules)
    |   |-- api
    |   |-- databaseConnection
    |   |-- (another modules)
    |-- pages (pages of web / mobile)
    |   |-- login
    |   |   |-- login.ts
    |   |-- checkout
    |   |-- cart
    |   |-- productDetailModal
    |-- reports (Folder for report json, image attachment)
    |-- test (test files for test)
    |   |-- mock
    |   |   |-- smoke.spec.ts
    |   |-- api
    |   |-- web
    |   |   |-- customer
    |   |   |-- ops
    |   |   |-- doctor
    |   |-- mobile (if have)
    |-- node_modules
    |-- .gitignore  
    |-- codecept.conf.js
    |-- LICENSE
    |-- package.json
    |-- README.md
    |-- steps_file.js
    |-- steps.d.ts
    |-- tsconfig.json
    |-- yarn.lock
```

# Pattern

- [x] Folder and filename should be snack_case
- [x] Scenario should be Upper first
- [x] Variables,function should be camelCase

# Visual Studio Code Extension (recommend)

- [x] ESLint
- [x] Prettier - Code formatter
- [x] Jasmine ES5 Code Snippets
- [x] JavaScript (ES6) code snippets
- [x] Better Comments
- [x] Terminal
- [x] YAML
