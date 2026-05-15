import { images } from '@/constants';
import { useDesktopWebFrame } from '@/lib/useDesktopWebFrame';
import { useCartStore } from '@/store/cart.store';
import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const CartButton = () => {
    const { getTotalItems } = useCartStore();
    const totalItems = getTotalItems();
    const isDesktopWebFrame = useDesktopWebFrame();

  return (
    <TouchableOpacity
        className='cart-btn'
        style={isDesktopWebFrame ? { width: 34, height: 34, borderRadius: 17 } : undefined}
        onPress={() => router.push('/(tabs)/cart')}
    >
        <Image
            source={images.bag}
            className={isDesktopWebFrame ? undefined : 'size-5'}
            style={isDesktopWebFrame ? { width: 18, height: 18 } : undefined}
            resizeMode='contain'
        />
        {totalItems > 0 && (
            <View className='cart-badge'>
                <Text className='small-bold text-white'>{totalItems}</Text>
            </View>
        )}
    </TouchableOpacity>
  )
}

export default CartButton;
