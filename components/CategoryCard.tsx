import React from 'react';
import { Text, View } from 'react-native';

interface CategoryCardProps {
  category: string;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <View className="bg-gray-50 rounded-lg p-4 mb-6">
      <Text className="text-sm text-gray-500 mb-1">Category</Text>
      <Text className="text-base font-semibold text-dark-100">{category}</Text>
    </View>
  );
};

export default CategoryCard;
