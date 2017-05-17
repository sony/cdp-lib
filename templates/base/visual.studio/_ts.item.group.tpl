  <ItemGroup>
    {{#tsGroup}}
    {{#dependee}}
    <TypeScriptCompile Include="{{relativePath}}{{fileName}}.ts" />
    {{/dependee}}
    <Content Include="{{relativePath}}{{fileName}}.js">
      <DependentUpon>{{fileName}}.ts</DependentUpon>
    </Content>
    {{#map}}
    <Content Include="{{relativePath}}{{fileName}}.js.map">
      <DependentUpon>{{fileName}}.ts</DependentUpon>
    </Content>
    {{/map}}
    {{/tsGroup}}
  </ItemGroup>
