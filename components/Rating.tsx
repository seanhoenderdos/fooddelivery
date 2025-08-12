import { images } from '@/constants';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface RatingProps {
  rating: number;
  showText?: boolean;
  starSize?: string;
  textStyle?: string;
}

const Rating = ({ rating, showText = true, starSize = 'w-4 h-4', textStyle = 'text-white ml-2 font-quicksand' }: RatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <View className="flex-row items-center">
      {[...Array(5)].map((_, i) => (
        <Image
          key={i}
          source={images.star}
          className={`${starSize} mr-1`}
          tintColor={i < fullStars ? '#FE8C00' : '#878787'}
        />
      ))}
      {showText && (
        <Text className={textStyle}>
          {rating}/5
        </Text>
      )}
    </View>
  );
};

export default Rating;
