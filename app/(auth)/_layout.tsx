import { images } from '@/constants';
import useAuthStore from '@/store/auth.store';
import { Redirect, Slot } from 'expo-router';
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, useWindowDimensions, View } from 'react-native';

export default function Authlayout() {
  const { isAuthenticated } = useAuthStore();
  const { width } = useWindowDimensions();
  const screen = Dimensions.get('screen');
  const isDesktopWeb = Platform.OS === 'web' && width >= 768;
  const heroHeight = isDesktopWeb ? 255 : screen.height / 2.25;
  const logoSize = isDesktopWeb ? 154 : 192;
  const logoOffset = isDesktopWeb ? -44 : -64;

  if(isAuthenticated) return <Redirect href="/" />;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        className='bg-white h-full'
        contentContainerStyle={{ flexGrow: 1, backgroundColor: '#ffffff' }}
        keyboardShouldPersistTaps='handled'
      >
        <View className='w-full relative overflow-hidden' style={{ height: heroHeight }}>
          <ImageBackground 
            source={images.loginGraphic} 
            className='size-full rounded-b-lg'
            resizeMode='stretch'
          />
          <Image 
            source={images.logo}
            className='self-center absolute z-10'
            style={{ width: logoSize, height: logoSize, bottom: logoOffset }}
          />
        </View>
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
