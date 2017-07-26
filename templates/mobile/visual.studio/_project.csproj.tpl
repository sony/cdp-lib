<?xml version="1.0" encoding="utf-8"?>
<Project ToolsVersion="4.0" DefaultTargets="Build" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <Import Project="$(MSBuildExtensionsPath)\$(MSBuildToolsVersion)\Microsoft.Common.props" Condition="Exists('$(MSBuildExtensionsPath)\$(MSBuildToolsVersion)\Microsoft.Common.props')" />
  <PropertyGroup>
    <Configuration Condition=" '$(Configuration)' == '' ">Debug</Configuration>
    <ProjectGuid>{{projectGUID}}</ProjectGuid>
    <ProjectTypeGuids>{349c5851-65df-11da-9384-00065b846f21};{fae04ec0-301f-11d3-bf4b-00c04f79efbc}</ProjectTypeGuids>
    <OutputType>Library</OutputType>
    <OutputPath>bin</OutputPath>
    <TargetFrameworkVersion>v4.5</TargetFrameworkVersion>
    <DebugType>full</DebugType>
    <DebugSymbols>true</DebugSymbols>
    <FileUpgradeFlags>
    </FileUpgradeFlags>
    <OldToolsVersion>4.0</OldToolsVersion>
    <UseIISExpress>true</UseIISExpress>
    <IISExpressSSLPort />
    <IISExpressAnonymousAuthentication />
    <IISExpressWindowsAuthentication />
    <IISExpressUseClassicPipelineMode />
    <UpgradeBackupLocation />
    <UseGlobalApplicationHostFile />
  </PropertyGroup>
  <PropertyGroup>
    <VisualStudioVersion Condition="'$(VisualStudioVersion)' == ''">10.0</VisualStudioVersion>
    <VSToolsPath Condition="'$(VSToolsPath)' == ''">$(MSBuildExtensionsPath32)\Microsoft\VisualStudio\v$(VisualStudioVersion)</VSToolsPath>
  </PropertyGroup>
  <PropertyGroup>
    <RootNamespace>{{projectName}}</RootNamespace>
  </PropertyGroup>
  <PropertyGroup>
    <RunPostBuildEvent>OnBuildSuccess</RunPostBuildEvent>
  </PropertyGroup>
  <Import Project="$(MSBuildBinPath)\Microsoft.CSharp.targets" />
  <Import Project="$(VSToolsPath)\WebApplications\Microsoft.WebApplication.targets" Condition="'$(VSToolsPath)' != ''" />
  <Import Project="$(MSBuildExtensionsPath32)\Microsoft\VisualStudio\v10.0\WebApplications\Microsoft.WebApplication.targets" Condition="false" />
  <ProjectExtensions>
    <VisualStudio>
      <FlavorProperties GUID="{349c5851-65df-11da-9384-00065b846f21}">
        <WebProjectProperties>
          <UseIIS>False</UseIIS>
          <AutoAssignPort>True</AutoAssignPort>
          <DevelopmentServerPort>60454</DevelopmentServerPort>
          <DevelopmentServerVPath>/</DevelopmentServerVPath>
          <IISUrl>http://localhost:60454/</IISUrl>
          <NTLMAuthentication>False</NTLMAuthentication>
          <UseCustomServer>False</UseCustomServer>
          <CustomServerUrl>
          </CustomServerUrl>
          <SaveServerSettingsInUserFile>False</SaveServerSettingsInUserFile>
        </WebProjectProperties>
      </FlavorProperties>
      <UserProperties package_1json__JSONSchema="" tsconfig_1base_1json__JSONSchema="http://json.schemastore.org/tsconfig" />
    </VisualStudio>
  </ProjectExtensions>
  <PropertyGroup Condition="'$(Configuration)' == 'Debug'">
    <TypeScriptTarget>ES5</TypeScriptTarget>
    <TypeScriptIncludeComments>true</TypeScriptIncludeComments>
    <TypeScriptSourceMap>true</TypeScriptSourceMap>
    <GenerateSerializationAssemblies>On</GenerateSerializationAssemblies>
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)' == 'Release'">
    <TypeScriptTarget>ES5</TypeScriptTarget>
    <TypeScriptIncludeComments>false</TypeScriptIncludeComments>
    <TypeScriptSourceMap>false</TypeScriptSourceMap>
  </PropertyGroup>
  <Import Project="$(MSBuildExtensionsPath32)\Microsoft\VisualStudio\v$(VisualStudioVersion)\TypeScript\Microsoft.TypeScript.targets" />
  <PropertyGroup>
    <PreBuildEvent>
    </PreBuildEvent>
  </PropertyGroup>
  <PropertyGroup>
    <PostBuildEvent>npm run compile:scss</PostBuildEvent>
  </PropertyGroup>
  <ItemGroup>
    <Content Include=".gitignore" />
    <Content Include=".npmignore" />
    <Content Include="BANNER" />
    {{#cordova}}
    <Content Include="config.xml" />
    {{/cordova}}
    {{#license}}
    <Content Include="LICENSE" />
    {{/license}}
    <Content Include="NOTICE" />
    <Content Include="package.json" />
    <Content Include="project.config.js" />
    <Content Include="README.md" />
    <Content Include="tsconfig.base.json">
      <DependentUpon>tsconfig.json</DependentUpon>
    </Content>
    <Content Include="tsconfig.json" />
    <Content Include="web.config" />
    <None Include="web.Debug.config">
      <DependentUpon>web.config</DependentUpon>
    </None>
    <None Include="web.Release.config">
      <DependentUpon>web.config</DependentUpon>
    </None>
  </ItemGroup>
  <ItemGroup>
    <Content Include="{{src}}\{{external}}\{{types}}\patch.dependencies\index.d.ts" />
    <Content Include="{{src}}\{{external}}\backbone\{{srcConfig.script}}\backbone.js" />
    <Content Include="{{src}}\{{external}}\cdp\{{srcConfig.script}}\cdp.js" />
    <Content Include="{{src}}\{{external}}\cdp\{{srcConfig.stylesheet}}\cdp.css" />
    <Content Include="{{src}}\{{external}}\cdp\{{srcConfig.stylesheet}}\cdp.icons.css" />
    <Content Include="{{src}}\{{external}}\cdp\{{srcConfig.stylesheet}}\cdp.structure.css" />
    <Content Include="{{src}}\{{external}}\cdp\{{srcConfig.stylesheet}}\cdp.swatch.css" />
    {{#flipsnap}}
    <Content Include="{{src}}\{{external}}\flipsnap\{{srcConfig.script}}\flipsnap.js" />
    <Content Include="{{src}}\{{external}}\{{types}}\patch.dependencies\flipsnap.d.ts" />
    {{/flipsnap}}
    {{#hammerjs}}
    <Content Include="{{src}}\{{external}}\hammerjs\{{srcConfig.script}}\hammer.js" />
    <Content Include="{{src}}\{{external}}\hammerjs\{{srcConfig.script}}\jquery.hammer.js" />
    <Content Include="{{src}}\{{external}}\{{types}}\patch.dependencies\jquery.hammer.d.ts" />
    {{/hammerjs}}
    {{#hogan}}
    <Content Include="{{src}}\{{external}}\hogan\{{srcConfig.script}}\hogan.js" />
    {{/hogan}}
    {{#iscroll}}
    <Content Include="{{src}}\{{external}}\iscroll\{{srcConfig.script}}\iscroll-probe.js" />
    <Content Include="{{src}}\{{external}}\{{types}}\patch.dependencies\iscroll.d.ts" />
    {{/iscroll}}
    <Content Include="{{src}}\{{external}}\jquery\{{srcConfig.script}}\jquery.js" />
    <Content Include="{{src}}\{{external}}\requirejs\{{srcConfig.script}}\require.js" />
    <Content Include="{{src}}\{{external}}\underscore\{{srcConfig.script}}\underscore.js" />
    <Content Include="{{src}}\{{res}}\locales\messages.en-US.json" />
    <Content Include="{{src}}\{{res}}\locales\messages.ja-JP.json" />
  </ItemGroup>
  <ItemGroup>
    <Folder Include="{{src}}\{{srcConfig.stylesheet}}\images\" />
    <Content Include="{{src}}\{{srcConfig.stylesheet}}\cdp\utils\_utils.scss" />
    <Content Include="{{src}}\{{srcConfig.stylesheet}}\_base.scss" />
    <Content Include="{{src}}\{{srcConfig.stylesheet}}\_gallery.scss" />
    <Content Include="{{src}}\{{srcConfig.stylesheet}}\_splash.scss" />
    <Content Include="{{src}}\{{srcConfig.stylesheet}}\_utils.scss" />
    <Content Include="{{src}}\{{srcConfig.stylesheet}}\app.scss" />
    <Content Include="{{src}}\{{srcConfig.stylesheet}}\app.css">
      <DependentUpon>app.scss</DependentUpon>
    </Content>
    <Content Include="{{src}}\{{srcConfig.stylesheet}}\splash.scss" />
    <Content Include="{{src}}\{{srcConfig.stylesheet}}\splash.css">
      <DependentUpon>splash.scss</DependentUpon>
    </Content>
  </ItemGroup>
  <ItemGroup>
    <Content Include="{{src}}\{{srcConfig.template}}\gallery\listctrl.html" />
    <Content Include="{{src}}\{{srcConfig.template}}\gallery\theme-switcher.html" />
    <Content Include="{{src}}\{{srcConfig.template}}\main.html" />
    <Content Include="{{src}}\index.html" />
  </ItemGroup>
  {{#enableLib}}
  <ItemGroup>
    <Folder Include="{{src}}\{{lib}}\{{srcConfig.script}}\" />
    <Folder Include="{{src}}\{{lib}}\{{srcConfig.stylesheet}}\" />
  </ItemGroup>
  {{/enableLib}}
  {{#enablePorting}}
  <ItemGroup>
    <Folder Include="{{src}}\{{porting}}\{{srcConfig.script}}\" />
    <Folder Include="{{src}}\{{porting}}\{{srcConfig.script}}\{{types}}" />
    <Folder Include="{{src}}\{{porting}}\{{srcConfig.stylesheet}}\" />
    <Folder Include="{{src}}\{{porting}}\{{srcConfig.template}}\" />
  </ItemGroup>
  {{#platforms}}
  <ItemGroup>
    <Folder Include="platforms\{{.}}\{{porting}}\{{srcConfig.script}}\" />
    <Folder Include="platforms\{{.}}\{{porting}}\{{srcConfig.stylesheet}}\" />
    <Folder Include="platforms\{{.}}\{{porting}}\{{srcConfig.template}}\" />
  </ItemGroup>
  {{/platforms}}
  {{/enablePorting}}
  <ItemGroup>
    <Folder Include="{{doc}}\images\" />
    <Content Include="{{doc}}\en\README.md" />
    <Content Include="{{doc}}\ja\README.md" />
    <Content Include="{{doc}}\reports\coverage\index.html" />
    <Content Include="{{doc}}\reports\metrics\display.html" />
    <Content Include="{{doc}}\reports\metrics\index.html" />
    <Content Include="{{doc}}\typedoc\globals.html" />
    <Content Include="{{doc}}\typedoc\index.html" />
  </ItemGroup>
  {{#cordova}}
  <ItemGroup>
    <Content Include="hooks\before_prepare\cordova-delegater.js" />
    <Content Include="hooks\README.md" />
  </ItemGroup>
  {{/cordova}}
  <ItemGroup>
    <Content Include="{{task}}\banner.js" />
    <Content Include="{{task}}\build-addon.js" />
    <Content Include="{{task}}\bundle-finalizer.js" />
    <Content Include="{{task}}\clean.js" />
    <Content Include="{{task}}\command.js" />
    <Content Include="{{task}}\compile-scss.js" />
    <Content Include="{{task}}\compile-ts.js" />
    <Content Include="{{task}}\copy.js" />
    <Content Include="{{task}}\cordova-receiver.js" />
    <Content Include="{{task}}\external-rearrange.js" />
    <Content Include="{{task}}\instrument.js" />
    <Content Include="{{task}}\minify.js" />
    <Content Include="{{task}}\porting-setup.js" />
    <Content Include="{{task}}\remap-coverage.js" />
    <Content Include="{{task}}\srcmap.js" />
    <Content Include="{{task}}\string-replace.js" />
    <Content Include="{{task}}\tsconfig-templates.js" />
  </ItemGroup>
  <ItemGroup>
  </ItemGroup>
  <ItemGroup>
    <Content Include="{{test}}\eslint\eslintrc.json" />
    <Content Include="{{test}}\runner\config-generator.js" />
    <Content Include="{{test}}\runner\index.mustache" />
    <Content Include="{{test}}\runner\test-config.js" />
    <Content Include="{{test}}\runner\test-main.js" />
    <Content Include="{{test}}\runner\testem-amd.js" />
    <Content Include="{{test}}\runner\testem-ci.js" />
    <Content Include="{{test}}\runner\testem.json" />
    <Content Include="{{test}}\tslint\tslint.json" />
  </ItemGroup>
</Project>
