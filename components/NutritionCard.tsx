import React from 'react';
import { Text, View } from 'react-native';

interface NutritionCardProps {
  calories: number;
  protein: number;
  rating: number;
}

const NutritionCard = ({ calories, protein, rating }: NutritionCardProps) => {
  return (
    <View className="bg-gray-50 rounded-lg p-4 mb-6">
      <Text className="text-lg font-semibold text-dark-100 mb-3">Nutrition Information</Text>
      <View className="flex-row justify-between">
        <View className="items-center">
          <Text className="text-gray-500 text-sm mb-1">Calories</Text>
          <Text className="text-dark-100 text-lg font-semibold">{calories} Cal</Text>
        </View>
        <View className="items-center">
          <Text className="text-gray-500 text-sm mb-1">Protein</Text>
          <Text className="text-dark-100 text-lg font-semibold">{protein}g</Text>
        </View>
        <View className="items-center">
          <Text className="text-gray-500 text-sm mb-1">Rating</Text>
          <Text className="text-dark-100 text-lg font-semibold">{rating}⭐</Text>
        </View>
      </View>
    </View>
  );
};

export default NutritionCard;
