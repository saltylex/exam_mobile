import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainSectionScreen from './src/screens/MainScreen';
import {ModelProvider} from "./src/context/ModelContext";
import {LogBox} from "react-native";
import AddScreen from "./src/screens/AddScreen";
import ModelScreen from "./src/screens/ModelScreen";
import AnalyticsScreen from "./src/screens/AnalyticsScreen";
import ProgressScreen from "./src/screens/ProgressScreen";
console.error = () => {}
const Stack = createStackNavigator();
LogBox.ignoreLogs(['ReactImageView:', 'source.uri', 'Failed prop type', 'Possible', 'Encountered']);
const App: React.FC = () => {
    return (
        <ModelProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="MainSection">
                    <Stack.Screen name="ModelScreen" component={ModelScreen} options={{title: 'Models'}}/>
                    <Stack.Screen name="MainSection" component={MainSectionScreen} options={{title: 'Events'}}/>
                    <Stack.Screen name="AddScreen" component={AddScreen} options={{title: 'Add Event'}}/>
                    <Stack.Screen name="AnalyticsScreen" component={AnalyticsScreen} options={{title: 'analytics'}}/>
                    <Stack.Screen name="ProgressScreen" component={ProgressScreen} options={{title: 'progress'}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </ModelProvider>
    );
};

export default App;
