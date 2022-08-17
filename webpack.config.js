const HtmlWebPackPlugin    = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin           = require("copy-webpack-plugin");


module.exports = {
    mode: "development",

    output: {
        clean: true //limpia la carpeta de distribucion o despliegue y la actualiza
        // esto pasa cuando se pone npm run build
    },

    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/i,
                exclude: /styles.css$/, //se excluye esta pagina de css para esta regla y pasa a la sgnte
                use: ['style-loader', 'css-loader']//se exporta el css a js en la version del dist (build)
            },
            {
                test: /styles.css$/, //se crea una carpeta de css aparte, no se exportan los componentes a js
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            }
        ]
    },

    optimization: {},

    plugins: [
        new HtmlWebPackPlugin({
            title: "Mi Webpack",
            // filename: 'index.html'
            template: './src/index.html'//pagina HTML que dara lugar a la creacion del index.html(de desarrollo) de la carpeta de despliegue (dist) html de BASE si no hace 
            //el html.index estara vacio en la carpeta de desplicegue

        }), //configuracion del html que se creara automaticamente para 
            //el despliegue de la pagina
        
        new MiniCssExtractPlugin({
            filename: '[name].css', //.[fullhash] evita que los clientes no mantengan en cache ese archivo
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
             {from: 'src/assets/', to: 'assets/'} //se utiliza para enviar archivos estaticos a la carpeta de despliegue
            ] 
        })    
    ]
}