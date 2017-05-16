  <ItemGroup>
    {{#tsGroup}}
    <TypeScriptCompile Include="{{relativePath}}{{fileName}}.ts" />
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
