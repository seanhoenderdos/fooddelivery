import { useCartStore } from "@/store/cart.store";
import { MenuItem } from "@/type";
import { router } from 'expo-router';
import { Image, Platform, Text, TouchableOpacity } from 'react-native';
import { useDesktopWebFrame } from "@/lib/useDesktopWebFrame";

const MenuCard = ({ item: { $id, image_url, name, price }}: { item: MenuItem}) => {
    const { addItem } = useCartStore();
    const isDesktopWebFrame = useDesktopWebFrame();

    const handleCardPress = () => {
        router.push({
            pathname: "/item/[id]",
            params: { id: $id }
        });
    };

    return (
        <TouchableOpacity 
            className={isDesktopWebFrame ? "relative flex items-center bg-white shadow-md shadow-black/10 rounded-3xl" : "menu-card"}
            style={[
                isDesktopWebFrame
                    ? {
                        minHeight: 190,
                        paddingHorizontal: 10,
                        paddingTop: 84,
                        paddingBottom: 16,
                        justifyContent: 'flex-start',
                    }
                    : null,
                Platform.OS === 'android' ? { elevation: 10, shadowColor: '#878787'}: {}
            ]}
            onPress={handleCardPress}
        >
            <Image 
                source={{ uri: image_url }} 
                className={isDesktopWebFrame ? "absolute" : "size-32 absolute -top-10"}
                style={isDesktopWebFrame ? { top: -28, width: 116, height: 116 } : undefined}
                resizeMode="contain"
            />
            <Text className="text-center base-bold text-dark-100 mb-2" numberOfLines={1}>{name}</Text>
            <Text className="body-regular text-gray-200 mb-4">From R{price}</Text>
            <TouchableOpacity onPress={() => addItem({ id: $id, name, price, image_url, customizations: []})}>
                <Text
                    className="paragraph-bold text-primary"
                    numberOfLines={1}
                    style={isDesktopWebFrame ? { fontSize: 15 } : undefined}
                >
                    Add to Cart +
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
export default MenuCard
