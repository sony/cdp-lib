  <ItemGroup>
    {{#jsGroup}}
    <Content Include="{{relativePath}}{{fileName}}.js" />
    {{#map}}
    <Content Include="{{relativePath}}{{fileName}}.js.map">
      <DependentUpon>{{fileName}}.js</DependentUpon>
    </Content>
    {{/map}}
    {{#d_ts}}
    <TypeScriptCompile Include="{{relativePath}}{{fileName}}.d.ts">
      <DependentUpon>{{fileName}}.js</DependentUpon>
    </TypeScriptCompile>
    {{/d_ts}}
    {{/jsGroup}}
  </ItemGroup>
