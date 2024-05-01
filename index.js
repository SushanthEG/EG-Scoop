/**
 * @format
 */

import {AppRegistry} from 'react-native';// statement imports the AppRegistry module from the react-native library.
import App from './App';// imports the main component of your app from the App.js
import {name as appName} from './app.json';// statement imports the name property from the app.json file, which typically contains configuration settings for your app.

AppRegistry.registerComponent(appName, () => App);//registers the main component (App) with the specified app name (appName). This allows the app to launch and display the App component when it starts.
