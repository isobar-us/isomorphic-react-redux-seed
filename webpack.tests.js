var context = require.context('./tests', true, /.spec\.js$/);
context.keys().forEach(context);

var layouts = require.context('./app/scripts/layouts', true, /\.js$/);
layouts.keys().forEach(layouts);

var components = require.context('./app/scripts/components', true, /\.js$/);
components.keys().forEach(components);