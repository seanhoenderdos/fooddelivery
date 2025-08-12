import { CartCustomization, Customization } from '@/type';
import { FlatList, Text, View } from 'react-native';
import CustomizationCard from './CustomizationCard';

interface CustomizationCarouselProps {
  title: string;
  customizations: Customization[];
  itemId: string;
  selectedCustomizations?: CartCustomization[];
  onCustomizationAdd?: (customization: CartCustomization) => void;
}

const CustomizationCarousel = ({ 
  title, 
  customizations, 
  itemId, 
  selectedCustomizations = [],
  onCustomizationAdd 
}: CustomizationCarouselProps) => {
  
  if (!customizations || customizations.length === 0) {
    return null;
  }

  const renderCustomizationCard = ({ item }: { item: Customization }) => {
    const isSelected = selectedCustomizations.some(sc => sc.id === item.$id);
    
    return (
      <CustomizationCard 
        customization={item}
        itemId={itemId}
        isSelected={isSelected}
        onAdd={onCustomizationAdd}
      />
    );
  };

  return (
    <View className="mb-6">
      {/* Section Title */}
      <Text className="text-xl font-bold text-dark-100 mb-4 px-6">
        {title}
      </Text>
      
      {/* Horizontal Scrollable Cards */}
      <FlatList
        data={customizations}
        renderItem={renderCustomizationCard}
        keyExtractor={(item) => item.$id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
      />
    </View>
  );
};

export default CustomizationCarousel;
