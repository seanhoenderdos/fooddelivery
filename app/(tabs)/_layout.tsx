import { images } from "@/constants";
import { useDesktopWebFrame } from "@/lib/useDesktopWebFrame";
import useAuthStore from "@/store/auth.store";
import { Redirect, Tabs } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

const tabItems = {
    index: { title: 'Home', icon: images.home },
    search: { title: 'Search', icon: images.search },
    cart: { title: 'Cart', icon: images.bag },
    profile: { title: 'Profile', icon: images.person },
};

const AppTabBar = ({ state, descriptors, navigation, isDesktopWebFrame }: any) => {
    const focusedOptions = descriptors[state.routes[state.index].key]?.options;
    if (focusedOptions?.tabBarStyle?.display === 'none') return null;

    const height = isDesktopWebFrame ? 64 : 80;
    const bottom = isDesktopWebFrame ? 18 : 40;
    const iconSize = isDesktopWebFrame ? 22 : 28;
    const labelSize = isDesktopWebFrame ? 11 : 14;

    return (
        <View
            style={{
                position: 'absolute',
                left: 20,
                right: 20,
                bottom,
                height,
                borderRadius: height / 2,
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                shadowColor: '#1a1a1a',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 5,
            }}
        >
            {state.routes.map((route: any, index: number) => {
                const item = tabItems[route.name as keyof typeof tabItems];
                if (!item) return null;

                const focused = state.index === index;
                const color = focused ? '#FE8C00' : '#878787';

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!focused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                return (
                    <Pressable
                        key={route.key}
                        onPress={onPress}
                        style={{
                            flex: 1,
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 4,
                        }}
                    >
                        <Image
                            source={item.icon}
                            style={{ width: iconSize, height: iconSize }}
                            resizeMode="contain"
                            tintColor={color}
                        />
                        <Text
                            style={{
                                color,
                                fontSize: labelSize,
                                fontWeight: '700',
                                lineHeight: labelSize + 4,
                            }}
                        >
                            {item.title}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
};

const EmptyTabIcon = () => {
    return (
        <View />
    );
};

export default function TabLayout() {
    const { isAuthenticated } = useAuthStore();
    const isDesktopWebFrame = useDesktopWebFrame();

    if(!isAuthenticated) return <Redirect href="/sign-in" />

    return (
        <Tabs
            tabBar={(props) => <AppTabBar {...props} isDesktopWebFrame={isDesktopWebFrame} />}
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
            }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: EmptyTabIcon,
                }}
            />
            <Tabs.Screen
                name='search'
                options={{
                    title: 'Search',
                    tabBarIcon: EmptyTabIcon,
                }}
            />
            <Tabs.Screen
                name='cart'
                options={{
                    title: 'Cart',
                    tabBarIcon: EmptyTabIcon,
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    tabBarIcon: EmptyTabIcon,
                    tabBarStyle: { display: 'none' }
                }}
            />
        </Tabs>
    );
}
