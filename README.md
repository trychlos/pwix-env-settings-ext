# pwix:env-settings-ext

## What is it ?

The `pwix:env-settings-ext` package extends `pwix:env-settings` with some application-level features:

- manage per-environment configuration in a server-side `environments` object, to be addressed by the `APP_ENV` environment variable on the server,

- attaches to `EnvSettings` global (which is provided by `pwix:env-settings`) a reactive `environmentSettings()` async function which returns the current private-filtered environment settings,

- manage the reconfiguration of other packages based of got environment settings.

## Usage

Install the package with the usual command:

```sh
    meteor add pwix:env-settings-ext
```

and configure it to address the `environments` object in the settings.

## Provides

### `EnvSettingsExt`

The exported `EnvSettingsExt` global object provides following items:

#### Functions

##### `EnvSettingsExt.configure()`

See [below](#configuration).

A reactive data source.

## Configuration

The package's behavior can be configured through a call to the `EnvSettingsExt.configure()` method, with just a single javascript object argument, which itself should only contains the options you want override.

Known configuration options are:

- `environmentsKeys`

    Defines the list of keys which address the `environments` object inside of the settings.

    This list of keys can be specified as an array of keys, or as a dot-separated string, or as a mixed of these.

    Example:

```js
        EnvSettingsExt.configure({
            environmentsKeys: [
                'key1',
                'key2.key3'
            ]
        });
```

    which means that the `environments` object will be addressed as `Meteor.settings[key1][key2][key3]`.

    Defaults to `environments`: object is addressed as `Meteor.settings.environments`.

- `verbosity`

    Defines the expected verbosity level.

    The accepted value can be any or-ed combination of following:

    - `EnvSettingsExt.C.Verbose.NONE`

        Do not display any trace log to the console

    - `EnvSettingsExt.C.Verbose.CONFIGURE`

        Trace `EnvSettingsExt.configure()` calls and their result

    - `EnvSettingsExt.C.Verbose.SETTINGS`

        Trace the result of calls to `environmentSettings()` function

    - `EnvSettingsExt.C.Verbose.PACKAGES`

        Be verbose when reconfiguring a package based of the got settings

    Defaults to `EnvSettingsExt.C.Verbose.CONFIGURE`.

Please note that `EnvSettingsExt.configure()` method should be called in the same terms both in client and server sides.

Remind too that Meteor packages are instanciated at application level. They are so only configurable once, or, in other words, only one instance has to be or can be configured. Addtionnal calls to `EnvSettingsExt.configure()` will just override the previous one. You have been warned: **only the application should configure a package**.

## NPM peer dependencies

Starting with v 1.0.0, and in accordance with advices from [the Meteor Guide](https://guide.meteor.com/writing-atmosphere-packages.html#peer-npm-dependencies), we no more hardcode NPM dependencies in the `Npm.depends` clause of the `package.js`.

Instead we check npm versions of installed packages at runtime, on server startup, in development environment.

Dependencies as of v 1.0.0:

```js
    'lodash': '^4.17.0',
```

Each of these dependencies should be installed at application level:

```sh
    meteor npm install <package> --save
```

## Translations

None at the moment.

## Cookies and comparable technologies

None at the moment.

## Issues & help

In case of support or error, please report your issue request to our [Issues tracker](https://github.com/trychlos/pwix-env-settings-ext/issues).

---
P. Wieser
- Last updated on 2024, Jul. 29th
