import React from 'react';
import { Text, View } from 'react-native';

interface NutritionInfoProps {
  calories: number;
  protein: number;
  bunType: string;
}

const NutritionInfo = ({ calories, protein, bunType }: NutritionInfoProps) => {
  return (
    <View className="flex-row justify-between mb-6">
      <View>
        <Text className="text-gray-100 text-sm font-quicksand">Calories</Text>
        <Text className="text-white text-lg font-quicksand-bold">{calories} Cal</Text>
      </View>
      <View>
        <Text className="text-gray-100 text-sm font-quicksand">Protein</Text>
        <Text className="text-white text-lg font-quicksand-bold">{protein}g</Text>
      </View>
      <View>
        <Text className="text-gray-100 text-sm font-quicksand">Bun Type</Text>
        <Text className="text-white text-lg font-quicksand-bold">{bunType}</Text>
      </View>
    </View>
  );
};

export default NutritionInfo;
