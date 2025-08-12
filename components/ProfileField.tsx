import { ProfileFieldProps } from '@/type';
import React from 'react';
import { Image, Text, View } from 'react-native';

const ProfileField = ({ label, value, icon }: ProfileFieldProps) => {
  return (
    <View className="flex-row items-center py-4">
      <View className="w-12 h-12 bg-primary/10 rounded-xl items-center justify-center mr-4">
        <Image 
          source={icon} 
          className="w-6 h-6" 
          resizeMode="contain"
          tintColor="#FE8C00" 
        />
      </View>
      
      <View className="flex-1">
        <Text className="text-gray-500 text-sm mb-1">{label}</Text>
        <Text className="text-black text-base font-medium">{value}</Text>
      </View>
    </View>
  )
}

export default ProfileField
