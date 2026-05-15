import { images } from "@/constants";
import { useDesktopWebFrame } from "@/lib/useDesktopWebFrame";
import { useCartStore } from "@/store/cart.store";
import type { CartItem as CartItemData } from "@/type";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CartItem = ({ item }: { item: CartItemData }) => {
    const { increaseQty, decreaseQty, removeItem } = useCartStore();
    const isDesktopWebFrame = useDesktopWebFrame();
    const customizationsTotal = item.customizations?.reduce((sum, c) => sum + c.price, 0) ?? 0;
    const itemTotal = item.price + customizationsTotal;
    const openItem = () => router.push({ pathname: '/item/[id]', params: { id: item.id } });

    return (
        <TouchableOpacity
            className="cart-item"
            activeOpacity={0.85}
            onPress={openItem}
            style={isDesktopWebFrame ? { paddingRight: 14, gap: 8 } : undefined}
        >
            <View className="flex flex-row items-center gap-x-3 flex-1 min-w-0">
                <View className="cart-item__image">
                    <Image
                        source={{ uri: item.image_url }}
                        className={isDesktopWebFrame ? "rounded-lg" : "size-4/5 rounded-lg"}
                        style={isDesktopWebFrame ? { width: 58, height: 58 } : undefined}
                        resizeMode="cover"
                    />
                </View>

                <View className="flex-1 min-w-0">
                    <Text
                        className="base-bold text-dark-100"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={isDesktopWebFrame ? { maxWidth: 150 } : undefined}
                    >
                        {item.name}
                    </Text>
                    <Text className="paragraph-bold text-primary mt-1">
                        R{itemTotal.toFixed(2)}
                    </Text>

                    <View className="flex flex-row items-center gap-x-4 mt-2">
                        <TouchableOpacity
                            onPress={() => decreaseQty(item.id, item.customizations!)}
                            className="cart-item__actions"
                            style={isDesktopWebFrame ? { width: 22, height: 22 } : undefined}
                        >
                            <Image
                                source={images.minus}
                                className={isDesktopWebFrame ? undefined : "size-1/2"}
                                style={isDesktopWebFrame ? { width: 11, height: 11 } : undefined}
                                resizeMode="contain"
                                tintColor={"#FF9C01"}
                            />
                        </TouchableOpacity>

                        <Text className="base-bold text-dark-100">{item.quantity}</Text>

                        <TouchableOpacity
                            onPress={() => increaseQty(item.id, item.customizations!)}
                            className="cart-item__actions"
                            style={isDesktopWebFrame ? { width: 22, height: 22 } : undefined}
                        >
                            <Image
                                source={images.plus}
                                className={isDesktopWebFrame ? undefined : "size-1/2"}
                                style={isDesktopWebFrame ? { width: 11, height: 11 } : undefined}
                                resizeMode="contain"
                                tintColor={"#FF9C01"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => removeItem(item.id, item.customizations!)}
                className="flex-center"
                style={isDesktopWebFrame ? { width: 30, height: 44, marginLeft: 4, flexShrink: 0 } : undefined}
            >
                <Image
                    source={images.trash}
                    className={isDesktopWebFrame ? undefined : "size-5"}
                    style={isDesktopWebFrame ? { width: 22, height: 22 } : undefined}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default CartItem;
