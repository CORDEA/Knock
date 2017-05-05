/**
 *
 * Copyright 2017 Yoshihiro Tanaka
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Author: Yoshihiro Tanaka <contact@cordea.jp>
 * date  : 2017-05-05
 */

var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
        background: './src/ts/background.ts',
        options: './src/ts/options.ts',
        popup: './src/ts/popup.ts'
    },
    output: {
        path: path.join(__dirname, 'src', 'js'),
        filename: '[name].js'
    },
    resolve: {
        modules: ['node_modules', 'bower_components'],
        descriptionFiles: ['bower.json', 'package.json'],
        mainFields: ['main'],
        alias: {
            vue: 'vue/dist/vue.esm.js',
            mdl: 'material-design-lite/dist/material.min.js'
        },
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                exclude: /node_modules|vue\/src/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    esModule: true
                }
            }
        ]
    }
}