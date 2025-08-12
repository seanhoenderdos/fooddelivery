import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LoadingScreenProps {
  message?: string;
  color?: string;
}

const LoadingScreen = ({ 
  message = "Loading...", 
  color = "#FE8C00" 
}: LoadingScreenProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      <ActivityIndicator size="large" color={color} />
      <Text className="mt-2 text-gray-600">{message}</Text>
    </SafeAreaView>
  );
};

export default LoadingScreen;
