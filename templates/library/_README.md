# <% projectName %>

## About <% moduleName %>

[TODO]


### Repository structure
Folder and file structure of this repository is the following list.

    root/
        <% structureConfig.pkg %>/                                       // deploy target directory.
            <% structureConfig.types %>/                                 // type definition file here.
        <% structureConfig.src %>/                                        // source file directory.
        <%# structureConfig.srcConfig.script %>
            <% structureConfig.srcConfig.script %>/                                // .ts files here.
        <%/ structureConfig.srcConfig.script %>
        <%# structureConfig.srcConfig.stylesheet %>
            <% structureConfig.srcConfig.stylesheet %>/                                // .scss files here.
        <%/ structureConfig.srcConfig.stylesheet %>
        <%# structureConfig.srcConfig.template %>
            <% structureConfig.srcConfig.template %>/                                // templates files are here.
        <%/ structureConfig.srcConfig.template %>
        <% structureConfig.doc %>/                                       // specification documents.
            reports/                                // test reports directory.
                coverage/                           // output test coverage reports.
                metrics/                            // output source metrics reports.
            typedoc/                                // typedoc generated documents here.
        <% structureConfig.test %>/                                      // tests scripts directory.
<%^ outputSameDir %>
        <% structureConfig.built %>/                                      // temporary built scripts here.
<%/ outputSameDir %>


### How to install

    $ npm install <% projectName %>

### How to development

* build

    $ npm run build

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

<%# copyright %>
<% copyright %>

<%/ copyright %>
<% license %>
