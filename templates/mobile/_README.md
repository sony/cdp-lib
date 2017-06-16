# <% projectName %>

## About <% appName %>

[TODO]


### Repository structure
Folder and file structure of this repository is the following list.

    root/
        <% structureConfig.src %>/                                        // application development root directory.
            <% structureConfig.external %>/                               // 3rd party library modules here.
<%# lib %>
            <% structureConfig.lib %>/                                    // for internal library module development.
<%/ lib %>
<%# porting %>
            <% structureConfig.porting %>/                                // platform specific sources are here.
<%/ porting %>
            <% structureConfig.res %>/                                    // for application resources.
            <% structureConfig.srcConfig.script %>/                                // .ts files here.
            <% structureConfig.srcConfig.stylesheet %>/                            // .scss files here.
            <% structureConfig.srcConfig.template %>/                              // templates files are here.
            index.html                              // application root file.
        <% structureConfig.doc %>/                                       // specification documents.
        hooks/                                      // cordova hook scripts here.
<%# cordova %>
        plugins/                                    // installed cordova plugins here.
        platforms/                                  // native project setting files and sources.
<%/ cordova %>
        <% structureConfig.test %>/                                      // tests scripts directory.
        <% structureConfig.pkg %>/                                        // target repository. compiled source and resource are set here.


### How to setup

    $ npm install

### How to development

* build

    $ cordova build [platform] [--release]

* test

    $ npm test

* deplay and update dependencies

    $ npm run update

### How to use
Please see the following documentation.

- [English/英語](docs/en)
- [Japanese/日本語](docs/ja)

## Release Notes

[TODO]

## License

<% license %>
