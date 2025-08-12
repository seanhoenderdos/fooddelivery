import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ErrorScreenProps {
  title: string;
  buttonText?: string;
  onButtonPress?: () => void;
}

const ErrorScreen = ({ 
  title, 
  buttonText = "Go Back", 
  onButtonPress 
}: ErrorScreenProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      <Text className="text-xl font-bold text-gray-600 mb-4">{title}</Text>
      {onButtonPress && (
        <TouchableOpacity 
          onPress={onButtonPress}
          className="bg-primary px-6 py-3 rounded-full"
        >
          <Text className="text-white font-semibold">{buttonText}</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default ErrorScreen;
