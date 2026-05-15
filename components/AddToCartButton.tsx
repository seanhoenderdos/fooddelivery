import { images } from '@/constants';
import { useDesktopWebFrame } from '@/lib/useDesktopWebFrame';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface AddToCartButtonProps {
  price: number;
  onPress: () => void;
  isLoading?: boolean;
}

const AddToCartButton = ({ price, onPress, isLoading = false }: AddToCartButtonProps) => {
  const isDesktopWebFrame = useDesktopWebFrame();

  return (
    <View className="bg-white border-t border-gray-100" style={{ padding: isDesktopWebFrame ? 20 : 24 }}>
      <TouchableOpacity 
        onPress={onPress}
        disabled={isLoading}
        className="bg-primary rounded-full flex-row items-center justify-center"
        style={{ paddingVertical: isDesktopWebFrame ? 14 : 16 }}
      >
        <Image 
          source={images.bag} 
          className={isDesktopWebFrame ? undefined : "w-5 h-5 mr-2"}
          style={isDesktopWebFrame ? { width: 18, height: 18, marginRight: 8 } : undefined}
          resizeMode="contain"
          tintColor="white"
        />
        <Text className="text-white text-lg font-semibold">
          Add to Cart - R{price.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddToCartButton;
