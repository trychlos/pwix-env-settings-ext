# pwix:core-app

## What is it ?

The `pwix:core-app` package provides a common framework to applications by gathering needed elementary other packages.

Goal is to be able to initialize a running (though rather empty) application rather quickly, maximizing time to code actual application features.

### pwix:env-settings

`pwix:core-app` extends the `pwix:env-settings` package with some application-level features:

- manage per-environment configuration in a server-side `environments` object, to be addressed by the `APP_ENV` environment variable on the server

- attaches to `EnvSettings` global an `environmentSettings()` async function which returns the current private-filtered environment settings

- manage the reconfiguration of other packages based of got environment settings

## Provides

### `CoreApp`

The exported `CoreApp` global object provides following items:

#### Classes

##### `CoreApp.RunContext`

A class to be instanciated by the application.

This package provides a `RunContext` class to the application.

The provided class inherits from `IAppSaa` interface, and make the management of `pwix:startup-app-admin` easier and more generic.

This class is extended with the IAppSaa interface by the package itself.

It is extended too by the `IAppEditable` interface with the `pwix:app-edit` package, and by the `IAppPageable` interface with the `pwix:app-pages` package.

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

    Defines the name of the **application administrator** role.

    Defaults to 'APP_ADMINISTRATOR'.

    As a reminder, this same value is expected to be also configured in the `pwix:startup-app-admin` package.

- `appName`

    Defines the name of the application role. By convention, this name MUST also be a key in settings, and contain an `environments` object addressed by the `APP_ENV` environment variable on the server.

- `routePrefix`

    Defines the prefix of the routes to be used in provided links.

    Defaults to `/coreApp`.

- `verbosity`

    Defines the expected verbosity level.

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

Dependencies as of v 1.0.0:

```js
    'ellipsize': '^0.5.1',
    'lodash': '^4.17.0',
    'strftime': '^0.10.2',
    '@vestergaard-company/js-mixin': '^1.0.3'
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
- Last updated on 2024, Jul. 29th
