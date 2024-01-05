# pwix:core-app

## Using `pwix:core-app` instead of (obsoleted) `pwix:core-ui`

In the application directory:

```
    cd packages/
    ln -s ../../pwix-core-app core-app
    cd ..
    meteor add pwix:core-app
    ack -l CoreUI | while read f; do sed -i -e 's|CoreUI|CoreApp|g' $f; done && ack -l core-ui | while read f; do sed -i -e 's|core-ui|core-app|g' $f; done && ack -l coreUi | while read f; do sed -i -e 's|coreUi|coreApp|g' $f; done && ack -l core_ui | while read f; do sed -i -e 's|core_ui|core_app|g' $f; done
    meteor remove pwix:core-ui
    rm -f packages/core-ui
    git add packages/core-app
```

and maybe update files which were named along the old package:

```
    git status | grep core
```
