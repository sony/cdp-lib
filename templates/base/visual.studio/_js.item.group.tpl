  <ItemGroup>
    {{#jsGroup}}
    {{#dependee}}
    <Content Include="{{relativePath}}{{fileName}}.js" />
    {{/dependee}}
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
    {{#min_map}}
    <Content Include="{{relativePath}}{{fileName}}.min.js">
      <DependentUpon>{{fileName}}.js</DependentUpon>
    </Content>
    <Content Include="{{relativePath}}{{fileName}}.min.js.map">
      <DependentUpon>{{fileName}}.js</DependentUpon>
    </Content>
    {{/min_map}}
    {{/jsGroup}}
  </ItemGroup>
