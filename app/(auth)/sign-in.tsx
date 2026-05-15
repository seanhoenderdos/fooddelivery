import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { signIn } from '@/lib/appwrite'
import useAuthStore from '@/store/auth.store'
import * as Sentry from '@sentry/react-native'
import cn from 'clsx'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Platform, Text, useWindowDimensions, View } from 'react-native'

const SignIn = () => {
  const { fetchAuthenticatedUser } = useAuthStore();
  const { width } = useWindowDimensions();
  const isDesktopWeb = Platform.OS === 'web' && width >= 768;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const submit = async () => {
    const { email, password } = form;
    if(!email || !password) return Alert.alert('Error', 'Please fill in all fields');
    setIsSubmitting(true);
    try {
      await signIn({ email, password });
      await fetchAuthenticatedUser(); // Update auth state after successful sign-in
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error.message || error.message );
      Sentry.captureEvent(error);
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <View
      className={cn('bg-white rounded-lg p-5', isDesktopWeb ? 'gap-7 mt-0' : 'gap-10 mt-5')}
      style={isDesktopWeb ? { flexGrow: 1 } : undefined}
    >
      <CustomInput 
        placeholder='Enter your email'
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text}))}
        label='Email'
        keyboardType='email-address'
      />
      <CustomInput 
        placeholder='Enter your password'
        value={form.password}
        onChangeText={(text) => setForm((prev) => ({ ...prev, password: text}))}
        label='Password'
        secureTextEntry={true}
      />
      <CustomButton 
        title='Sign In'
        isLoading={isSubmitting}
        onPress={submit}
      />

      <View className={cn('flex justify-center flex-row gap-2', isDesktopWeb ? 'mt-1' : 'mt-5')}>
        <Text className='base-regular text-gray-100'>
          Don&apos;t have an account?
        </Text>
        <Link href='/sign-up' className='base-bold text-primary'>
          Sign up
        </Link>
      </View>
    </View>
  )
}

export default SignIn
