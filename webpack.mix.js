const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.options({
    processCssUrls: false
});

if (!mix.inProduction()) {
    mix.webpackConfig({
        devtool: 'source-map'
    })
        .sourceMaps()
}

mix.sass('resources/css/app.scss', 'public/css');
mix.js('resources/js/Content/index.js', 'public/js/content.js').react();
mix.js('resources/js/Admin/index.js', 'public/js/admin.js').react();
// mix.js('resources/js/Reservation/index.js', 'public/js/reservation.js').react();

mix.webpackConfig({
    watchOptions: {
        ignored: /node_modules/
    }
})

// add versions to the compiled assets when they are being loaded with mix()
mix.version();
