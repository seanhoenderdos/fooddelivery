import CustomButton from '@/components/CustomButton';
import CustomHeader from '@/components/CustomHeader';
import ProfileField from '@/components/ProfileField';
import useAuthStore from '@/store/auth.store';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/sign-in');
  };

  // Mock data for fields not in schema
  const mockData = {
    phone: '+27 76 366 1098',
    address1: '13 Limpopo Avenue, Springfield, IL 62704',
    address2: '221B Rose Street, Foodville, FL 12345'
  };

  return (
    <SafeAreaView className="flex-1 bg-white/50">
      <CustomHeader title="Profile" />
      
      <ScrollView className="flex-1 px-6">
        {/* Profile Picture Section */}
        <View className="items-center mt-8 mb-8">
          <View className="relative">
            <Image
              source={{ uri: user?.avatar }}
              className="w-24 h-24 rounded-full"
              resizeMode="cover"
            />
            <View className="absolute -bottom-1 -right-1 bg-primary p-2 rounded-full">
              <Image
                source={require('@/assets/icons/pencil.png')}
                className="w-4 h-4"
                tintColor="white"
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        {/* Profile Information */}
        <View className="space-y-6 bg-white p-4 rounded-3xl">
          <ProfileField
            label="Full Name"
            value={user?.name || 'Sean Hoenderdos'}
            icon={require('@/assets/icons/user.png')}
          />

          <ProfileField
            label="Email"
            value={user?.email || 'sean.hoenderdos@gmail.com'}
            icon={require('@/assets/icons/envelope.png')}
          />

          <ProfileField
            label="Phone number"
            value={mockData.phone}
            icon={require('@/assets/icons/phone.png')}
          />

          <ProfileField
            label="Address 1 - (Home)"
            value={mockData.address1}
            icon={require('@/assets/icons/location.png')}
          />

          <ProfileField
            label="Address 2 - (Work)"
            value={mockData.address2}
            icon={require('@/assets/icons/location.png')}
          />
        </View>

        {/* Action Buttons */}
        <View className="mt-6">
          <CustomButton
            title="Edit Profile"
            style="bg-orange-50 border border-primary py-4 rounded-full mb-3"
            textStyle="text-primary font-bold text-base"
            onPress={() => {
              // This will be implemented later
            }}
          />

          <CustomButton
            title="Logout"
            style="bg-red-50 border border-red-500 py-4 rounded-full"
            textStyle="text-red-500 font-bold text-base"
            leftIcon={
              <Image
                source={require('@/assets/icons/logout.png')}
                className="w-5 h-5 mr-2"
                tintColor="#ef4444"
                resizeMode="contain"
              />
            }
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;