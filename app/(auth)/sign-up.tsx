import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import cn from 'clsx';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, Text, useWindowDimensions, View } from 'react-native';
import { createUser } from '../../lib/appwrite';

const SignUp = () => {
  const { width } = useWindowDimensions();
  const isDesktopWeb = Platform.OS === 'web' && width >= 768;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const submit = async () => {
    const { name, email, password } = form;

    if(!name || !email || !password) return Alert.alert('Error', 'Please fill in all fields');
    setIsSubmitting(true);
    try {
      await createUser({
        email: email,
        password: password,
        name: name
      })
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error.message || error.message );
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <View
      className={cn('bg-white rounded-lg p-5', isDesktopWeb ? 'gap-5 mt-0' : 'gap-10 mt-5')}
      style={isDesktopWeb ? { flexGrow: 1 } : undefined}
    >
      <CustomInput 
        placeholder='Enter your full name'
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text}))}
        label='Full Name'
      />
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
        title='Sign Up'
        isLoading={isSubmitting}
        onPress={submit}
      />

      <View className={cn('flex justify-center flex-row gap-2', isDesktopWeb ? 'mt-0' : 'mt-5')}>
        <Text className='base-regular text-gray-100'>
          Already have an account?
        </Text>
        <Link href='/sign-in' className='base-bold text-primary'>
          Sign in
        </Link>
      </View>
    </View>
  )
}

export default SignUp
