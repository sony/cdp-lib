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
          <IISUrl>http://localhost:51731/</IISUrl>
          <NTLMAuthentication>False</NTLMAuthentication>
          <UseCustomServer>False</UseCustomServer>
          <CustomServerUrl>
          </CustomServerUrl>
          <SaveServerSettingsInUserFile>False</SaveServerSettingsInUserFile>
        </WebProjectProperties>
      </FlavorProperties>
    </VisualStudio>
  </ProjectExtensions>
  <PropertyGroup Condition="'$(Configuration)' == 'Debug'">
    <TypeScriptTarget>ES5</TypeScriptTarget>
    <TypeScriptIncludeComments>true</TypeScriptIncludeComments>
    <TypeScriptSourceMap>true</TypeScriptSourceMap>
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
    <PostBuildEvent>
</PostBuildEvent>
  </PropertyGroup>
  <ItemGroup>
    <Content Include=".gitignore" />
    <Content Include=".npmignore" />
    <Content Include="BANNER" />
    {{#license}}
    <Content Include="LICENSE" />
    {{/license}}
    <Content Include="NOTICE" />
    <Content Include="package.json" />
    <Content Include="project.config.js" />
    <Content Include="README.md" />
    <Content Include="tsconfig.json" />
    {{# webpack }}
    <Content Include="webpack.config.js" />
    {{/ webpack }}
  </ItemGroup>
  <ItemGroup>
    <Content Include="{{pkg}}\{{mainBaseName}}.js" />
    <TypeScriptCompile Include="{{pkg}}\{{types}}\{{projectName}}\index.d.ts" />
  </ItemGroup>
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
  <ItemGroup>
    <TypeScriptCompile Include="{{src}}\{{mainBaseName}}.ts" />
  </ItemGroup>
  <ItemGroup>
    <Content Include="{{task}}\banner.js" />
    <Content Include="{{task}}\build-ts-clean.js" />
    <Content Include="{{task}}\build-ts-normalize.js" />
    <Content Include="{{task}}\clean.js" />
    <Content Include="{{task}}\srcmap.js" />
  </ItemGroup>
  <ItemGroup>
    <Content Include="{{test}}\eslint\eslintrc.json" />
    <Content Include="{{test}}\tslint\tslint.json" />
    <Content Include="{{test}}\jasmine\tsconfig.json" />
  </ItemGroup>
</Project>
