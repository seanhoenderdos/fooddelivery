import { images } from '@/constants';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface AddToCartButtonProps {
  price: number;
  onPress: () => void;
  isLoading?: boolean;
}

const AddToCartButton = ({ price, onPress, isLoading = false }: AddToCartButtonProps) => {
  return (
    <View className="p-6 bg-white border-t border-gray-100">
      <TouchableOpacity 
        onPress={onPress}
        disabled={isLoading}
        className="bg-primary rounded-full py-4 flex-row items-center justify-center"
      >
        <Image 
          source={images.bag} 
          className="w-5 h-5 mr-2" 
          resizeMode="contain"
          tintColor="white"
        />
        <Text className="text-white text-lg font-semibold">
          Add to Cart - R{price}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddToCartButton;
