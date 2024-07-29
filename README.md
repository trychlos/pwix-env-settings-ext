# pwix:core-app

## What is it ?

A package which provides some core features to our applications.

## Features

### Page management

A core feature of any application is to display pages to the users, to propose menus, maybe to use modal dialogs to provide informations or let the user enter datas.

`pwix:core-app` try to take in charge the common code, for example the user is he allowed to access the required display unit, is he allowed to enter data in it, and so on.

Pages collection as obviously described by the application, and the current run context, are both materialized by classes that the application may (and even should) derive:

- `CoreApp.RunContext`

### Application administrator

An application may need a _super user_, a user who is allowed to modify some special configuration settings, or to do anything... The `pwix:startup-app-admin` package, when installed in an application, provides the code needed to define this application administrator, verify his/her email address, attribute required role.

To take advantage of this feature, the application must:

- install the required package:

```sh
    meteor add pwix:startup-app-admin
```

- configure this package to take advantage of it:

```js
    CoreApp.configure({
        withStartupAppAdmin: true
    });
```

When these two conditions are met, a reactive data source is 


+++++++++++++++++++++++++

### Environment management

While `nodejs` defines only three environments (`development`, `staging` and `production`), and though Meteor has followed the same route, we strongly believe that many more would be better, and that we should not be tied to such only three parts.

We so use the `APP_ENV` environment variable to address our own environment identifier. Through this identifier, we ask the server to publish the setings recorded inside of its private settings (see `pwix:env-settings`).

The settings are read from the server settings for this environment through the path `Meteor.settings[APP.name].environments[<environment_identifier>]`.

If not specified in the `APP_ENV` variable, the environment identifier falls back to the `nodejs` environment name.

### Settings management

`pwix:core-app` the settings dedicated to the current environment as the `CoreApp.envSettings` reactive var.

## Provides

### `CoreApp`

The exported `CoreApp` global object provides following items:

#### `CoreApp.envSettings`

A ReactiveVar which is set at startup with the settings for this environment. It contains following keys:

- `env`: the name of the running environment from `APP_ENV` environment variable
- `settings`: the relevant settings read from the APP/private/config/server JSON configuration.

#### Functions

##### `CoreApp.configure()`

See [below](#configuration).

A reactive data source.

##### `CoreApp.i18n.namespace()`

Returns the i18n namespace used by the package. Used to add translations at runtime.

### Blaze components

#### `coreCookiesLink`

Display a link to the Cookies Policy.

Parameters can be provided:

- label, defaulting to 'Cookies management policy'
- title, defaulting to 'Cookies management policy'
- route, defaulting to configured routePrefix + '/cookies'.

#### `coreFieldCheckIndicator`

Display an indicator about the validity status of a field.

Parameters:

- type: a `CoreApp.FieldCheck` constant as `INVALID`, `NONE`, `UNCOMPLETE` or `VALID`.

#### `coreFieldTypeIndicator`

Display an indicator about the type of a field.

Parameters:

- type: a `CoreApp.FieldType` constant as `INFO`, `SAVE` or `WORK`
- classes: if set, a list of classes to be added to the default ones.

#### `coreGDPRLink`

Display a link to the Privacy Policy.

Parameters can be provided:

- label, defaulting to 'Privacy Policy'
- title, defaulting to 'Privacy Policy'
- route, defaulting to configured routePrefix + '/gdpr'.

#### `coreGTULink`

Display a link to the General Terms of Use.

Parameters can be provided:

- label, defaulting to 'General Terms of Use'
- title, defaulting to 'General Terms of Use'
- route, defaulting to configured routePrefix + '/gtu'.

#### `coreLegalsLink`

Display a link to the Legal Informations.

Parameters can be provided:

- label, defaulting to 'Legal Informations'
- title, defaulting to 'Legal Informations'
- route, defaulting to configured routePrefix + '/legals'.

### Less mixins

#### `.x-btn-variant( @color )`

#### `.x-btn-outline-variant( @color )`

## Configuration

The package's behavior can be configured through a call to the `CoreApp.configure()` method, with just a single javascript object argument, which itself should only contains the options you want override.

Known configuration options are:

- `adminRole`

    Define the name of the **application administrator** role.

    Default to 'APP_ADMINISTRATOR'.

    As a reminder, this same value is expected to be also configured in the `pwix:startup-app-admin` package.

- `layout`

    Define the name of the default layout for a page which doesn't define it.

    Default to 'app'.

    This layout is expected to be provided by the application.

- `routePrefix`

    Define the prefix of the routes to be used in provided links.

    Default to `/coreUI`.

- `verbosity`

    Define the expected verbosity level.

    The accepted value can be any or-ed combination of following:

    - `CoreApp.C.Verbose.NONE`

        Do not display any trace log to the console

    - `CoreApp.C.Verbose.CONFIGURE`

        Trace `CoreApp.configure()` calls and their result

    - `CoreApp.C.Verbose.PAGE`

        Trace changes on page and relevant authorizations

Please note that `CoreApp.configure()` method should be called in the same terms both in client and server sides.

Remind too that Meteor packages are instanciated at application level. They are so only configurable once, or, in other words, only one instance has to be or can be configured. Addtionnal calls to `CoreApp.configure()` will just override the previous one. You have been warned: **only the application should configure a package**.

## NPM peer dependencies

Starting with v 0.1.0, and in accordance with advices from [the Meteor Guide](https://guide.meteor.com/writing-atmosphere-packages.html#peer-npm-dependencies), we no more hardcode NPM dependencies in the `Npm.depends` clause of the `package.js`.

Instead we check npm versions of installed packages at runtime, on server startup, in development environment.

Dependencies as of v 0.3.0:

```js
    '@popperjs/core': '^2.11.6',
    'bootstrap': '^5.2.1',
    'lodash': '^4.17.0'
```

Each of these dependencies should be installed at application level:

```sh
    meteor npm install <package> --save
```

## Translations

New and updated translations are willingly accepted, and more than welcome. Just be kind enough to submit a PR on the [Github repository](https://github.com/trychlos/pwix-core-app/pulls).

## Cookies and comparable technologies

None at the moment.

## Issues & help

In case of support or error, please report your issue request to our [Issues tracker](https://github.com/trychlos/pwix-core-app/issues).

---
P. Wieser
- Last updated on 2023, June 5th
