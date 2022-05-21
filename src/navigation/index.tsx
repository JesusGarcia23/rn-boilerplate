import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import React from "react";
import { useColorScheme } from "react-native";
import { DarkTheme, LightTheme, palette } from "../shared/theme/themes";
import HomeScreen from "../screens/Home/HomeScreen";
import { SCREENS } from "../shared/constants";
import Icon from "react-native-dynamic-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomIcon from "../shared/components/CustomIcon/CustomIcon";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import ChatsScreen from "../screens/Chat/ChatsScreen";
import { NewPostScreen } from "../screens/NewPost/NewPostScreen";
import { CustomModal } from "../shared/components";
import { useWindowDimensions } from "react-native";
import GroupsScreen from "../screens/Groups/GroupsScreen";

   
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ChatStack = createStackNavigator();

const ChatStackScreen = () => {
    return (
        <ChatStack.Navigator screenOptions={{ headerShown: false }}>
            <ChatStack.Screen name="Chats" component={ChatsScreen}/>
        </ChatStack.Navigator>
    )
}

const Navigation = () => {
    const scheme = useColorScheme();
    const isDarkMode = scheme === "dark";

    React.useEffect((): any => {
        return () => (isReadyRef.current = false);
    }, []);


    // render tab Items
    const renderTabIcon = (route: any, focused: boolean, color: string, size: number) => {

        let iconName = 'home';
        switch(route.name) {
            case SCREENS.HOME:
                iconName = focused ? 'home' : 'home-outline';
                break;
            case SCREENS.GROUPS:
                iconName = focused ? 'people-outline' : 'people-outline';
                break;
            case SCREENS.CHATS:
                iconName = focused ? 'chatbubble-outline' : 'chatbubble-outline';
                break;
            case SCREENS.NEWPOST:
                iconName = focused ? 'play-outline' : 'play-outline';
                break;
            case SCREENS.PROFILE:
                iconName = focused ? 'person-outline' : 'person-outline';
                break;
            default:
                iconName = focused ? 'home' : 'home-outline';
                break;
        }
        // return <CustomIcon name="users" size={size}/>
        return <Icon name={iconName} type="Ionicons" size={size} color={color} />;
    }

    const RenderTabNavigation = () => {
        const { width } = useWindowDimensions();
        return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) =>
                renderTabIcon(route, focused, color, 20),
                tabBarActiveTintColor: palette.white,
                tabBarInactiveTintColor: "gray",
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'transparent',
                    borderTopWidth: 0,
                    position: 'absolute',
                    elevation: 0,
                    width: width,
                    height: 90,
                //   backgroundColor: isDarkMode ? palette.black : palette.white,
                },
            })}>
                <Tab.Screen name={SCREENS.HOME} component={HomeScreen}/>
                <Tab.Screen name={SCREENS.GROUPS} component={GroupsScreen}/>
                <Tab.Screen name={SCREENS.NEWPOST} component={NewPostScreen} options={{
                    tabBarButton: () => (<CustomModal />),
                }}/>
                <Tab.Screen name={SCREENS.CHATS} component={ChatStackScreen}/>
                <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen}/>
        </Tab.Navigator>
        )
    }

    return (
        <SafeAreaView style={{flex: 1 }}>
            <NavigationContainer
                ref={navigationRef}
                onReady={() => {
                isReadyRef.current = true;
                }}
                theme={isDarkMode ? DarkTheme : LightTheme}
            >
                {RenderTabNavigation()}
                {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={SCREENS.HOME} component={RenderTabNavigation} />
                </Stack.Navigator> */}
            </NavigationContainer>
        </SafeAreaView>

    )
}

export default Navigation;