import AddToCartButton from '@/components/AddToCartButton';
import CustomHeader from '@/components/CustomHeader';
import CustomizationCarousel from '@/components/CustomizationCarousel';
import ErrorScreen from '@/components/ErrorScreen';
import LoadingScreen from '@/components/LoadingScreen';
import Rating from '@/components/Rating';
import { images } from '@/constants';
import { useItemDetail } from '@/lib/useItemDetail';
import { useDesktopWebFrame } from '@/lib/useDesktopWebFrame';
import { useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ItemDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const isDesktopWebFrame = useDesktopWebFrame();
  
  const { 
    item, 
    loading, 
    toppings,
    sides,
    selectedCustomizations,
    handleCustomizationAdd, 
    getTotalPrice, 
    handleAddToCart,
    goBack 
  } = useItemDetail(id || '');
  
  // Handle case where ID is not provided or invalid
  if (!id || typeof id !== 'string') {
    return (
      <ErrorScreen 
        title="Invalid item ID" 
        onButtonPress={goBack} 
      />
    );
  }

  if (loading) {
    return <LoadingScreen message="Loading item details..." />;
  }

  if (!item) {
    return (
      <ErrorScreen 
        title="Item not found" 
        onButtonPress={goBack} 
      />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <CustomHeader />
      
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Main Content Row */}
        <View className="flex-row mb-6" style={isDesktopWebFrame ? { minHeight: 190, overflow: 'hidden' } : undefined}>
          {/* Left Side - Item Details */}
          <View className="flex-1 justify-center">
            {/* Item Name */}
            <Text className="text-2xl font-bold text-dark-100 mb-1">{item.name}</Text>
            
            {/* Category */}
            <Text style={{ color: '#666666', fontSize: 16 }} className="mb-2">
              {(item as any).categoryName || 
               (item as any).categories?.name || 
               (item as any).category_name || 
               item.type || 
               'No category'}
            </Text>
            
            {/* Rating */}
            <View className="mb-2">
              <View className="flex-row items-center">
                <Rating rating={item.rating || 0} showText={false} starSize="w-4 h-4" />
                <Text style={{ color: '#666666', marginLeft: 8 }}>
                  {item.rating ? `${item.rating}/5` : 'No rating'}
                </Text>
              </View>
            </View>
            
            {/* Price */}
            <Text className="text-2xl font-bold text-dark-100 mb-4">R{item.price}</Text>
            
            {/* Nutrition Info */}
            <View className="flex-row">
              <View className="mr-6">
                <Text className="text-gray-500 text-sm">Calories</Text>
                <Text className="text-dark-100 text-base font-semibold">{item.calories} Cal</Text>
              </View>
              <View>
                <Text className="text-gray-500 text-sm">Protein</Text>
                <Text className="text-dark-100 text-base font-semibold">{item.protein}g</Text>
              </View>
            </View>
          </View>
          
          {/* Right Side - Item Image */}
          <View
            className={isDesktopWebFrame ? undefined : "w-80 h-80 -mr-28"}
            style={isDesktopWebFrame ? { width: 190, height: 190, marginRight: -58, overflow: 'hidden' } : undefined}
          >
            <Image 
              source={{ uri: item.image_url }} 
              className="w-full h-full" 
              resizeMode={isDesktopWebFrame ? "contain" : "cover"}
              style={{ borderRadius: 12 }}
            />
          </View>
        </View>

        {/* Info Bar */}
        <View
          className="bg-primary/10 rounded-full mb-6 flex-row items-center"
          style={{
            paddingHorizontal: isDesktopWebFrame ? 12 : 16,
            paddingVertical: isDesktopWebFrame ? 10 : 12,
            gap: isDesktopWebFrame ? 6 : undefined,
          }}
        >
          <View className="flex-row items-center justify-center" style={{ flex: 1 }}>
            <Image 
              source={images.dollar} 
              className={isDesktopWebFrame ? undefined : "w-6 h-6 mr-2"}
              style={isDesktopWebFrame ? { width: 12, height: 12, marginRight: 5 } : undefined}
              resizeMode="contain"
              tintColor="#FE8C00"
            />
            <Text
              className="text-primary font-medium"
              style={{ fontSize: isDesktopWebFrame ? 12 : 14 }}
              numberOfLines={1}
            >
              Free Delivery
            </Text>
          </View>
          
          <View className="flex-row items-center justify-center" style={{ flex: 1 }}>
            <Image 
              source={images.clock} 
              className={isDesktopWebFrame ? undefined : "w-4 h-4 mr-2"}
              style={isDesktopWebFrame ? { width: 12, height: 12, marginRight: 5 } : undefined}
              resizeMode="contain"
              tintColor="#FE8C00"
            />
            <Text
              className="text-primary font-medium"
              style={{ fontSize: isDesktopWebFrame ? 12 : 14 }}
              numberOfLines={1}
            >
              20 - 30 min
            </Text>
          </View>
          
          <View className="flex-row items-center justify-center" style={{ flex: 0.58 }}>
            <Image 
              source={images.star} 
              className={isDesktopWebFrame ? undefined : "w-4 h-4 mr-2"}
              style={isDesktopWebFrame ? { width: 12, height: 12, marginRight: 5 } : undefined}
              resizeMode="contain"
              tintColor="#FE8C00"
            />
            <Text
              className="text-primary font-medium"
              style={{ fontSize: isDesktopWebFrame ? 12 : 14 }}
              numberOfLines={1}
            >
              {(item.rating || 0).toFixed(1)}
            </Text>
          </View>
        </View>

        {/* Description */}
        <Text className="text-gray-600 text-base leading-6 mb-6">{item.description}</Text>

        {/* Customization Carousels */}
        {toppings && toppings.length > 0 && (
          <CustomizationCarousel
            title="Toppings"
            customizations={toppings}
            itemId={id}
            selectedCustomizations={selectedCustomizations}
            onCustomizationAdd={handleCustomizationAdd}
          />
        )}

        {sides && sides.length > 0 && (
          <CustomizationCarousel
            title="Side options"
            customizations={sides}
            itemId={id}
            selectedCustomizations={selectedCustomizations}
            onCustomizationAdd={handleCustomizationAdd}
          />
        )}
      </ScrollView>

      <AddToCartButton 
        price={getTotalPrice()} 
        onPress={handleAddToCart} 
      />
    </SafeAreaView>
  );
}
