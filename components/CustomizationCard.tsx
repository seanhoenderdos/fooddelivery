import { images } from '@/constants';
import { useDesktopWebFrame } from '@/lib/useDesktopWebFrame';
import { CartCustomization, Customization } from '@/type';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface CustomizationCardProps {
  customization: Customization;
  itemId: string; // The menu item this customization belongs to
  isSelected?: boolean;
  onAdd?: (customization: CartCustomization) => void;
}

// Mapping customization names to their corresponding image assets
const getCustomizationImage = (name: string) => {
  const normalizedName = name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
  
  const imageMap: { [key: string]: any } = {
    // Vegetables and toppings
    'tomato': images.tomatoes,
    'tomatoes': images.tomatoes,
    'onions': images.onions,
    'onion': images.onions,
    'avocado': images.avocado,
    'cucumber': images.cucumber,
    'mushrooms': images.mushrooms,
    'mushroom': images.mushrooms,
    
    // Cheese varieties
    'cheese': images.cheese,
    'extracheese': images.cheese,
    'mozzarella': images.cheese,
    'cheddar': images.cheese,
    'parmesan': images.cheese,
    
    // Meat toppings
    'bacon': images.bacon,
    'pepperoni': images.bacon,
    'ham': images.bacon,
    'chicken': images.chickenSandwich,
    'beef': images.baconBurger,
    'turkey': images.chickenSandwich,
    
    // Sides
    'fries': images.fries,
    'frenchfries': images.fries,
    'salad': images.salad,
    'greens': images.salad,
    'coleslaw': images.coleslaw,
    'slaw': images.coleslaw,
    'onionrings': images.onionRings,
    'rings': images.onionRings,
    'mozarellasticks': images.mozarellaSticks,
    'mozzarellasticks': images.mozarellaSticks,
    'cheesesticks': images.mozarellaSticks,
    
    // Proteins and mains
    'burger': images.burgerOne,
    'cheeseburger': images.burgerTwo,
    'hamburger': images.burgerOne,
    'sandwich': images.chickenSandwich,
    'wrap': images.chickenSandwich,
    'burrito': images.buritto,
    'bowl': images.beanBurrito,
    'pizza': images.pizzaOne,
    
    // Specific items
    'baconburger': images.baconBurger,
    'beanburrito': images.beanBurrito,
    'paneerburrito': images.paneerBurrito,
    'doublepatty': images.doublePattyBurger,
    'doublepattyburger': images.doublePattyBurger,
    'veggie': images.veggieSandwich,
    'veggiesandwich': images.veggieSandwich,
    
    // Extras and condiments
    'mayo': images.cheese, // Using cheese as placeholder for condiments
    'ketchup': images.tomatoes,
    'mustard': images.cheese,
    'ranch': images.cheese,
    'bbq': images.bacon,
    'sauce': images.cheese,
    
    // Bread and bases
    'bun': images.burgerOne,
    'bread': images.chickenSandwich,
    'tortilla': images.buritto,
    'wrapping': images.buritto,
    
    // Pickles and extras
    'pickles': images.cucumber,
    'pickle': images.cucumber,
    'lettuce': images.salad,
    'spinach': images.salad,
  };

  // Try exact match first
  if (imageMap[normalizedName]) {
    return imageMap[normalizedName];
  }

  // Try partial matches for compound names
  for (const key in imageMap) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return imageMap[key];
    }
  }

  // Default fallback
  return images.avocado;
};

const CustomizationCard = ({ customization, itemId, isSelected = false, onAdd }: CustomizationCardProps) => {
  const isDesktopWebFrame = useDesktopWebFrame();

  const handleAddCustomization = () => {
    const cartCustomization: CartCustomization = {
      id: customization.$id,
      name: customization.name,
      price: customization.price,
      type: customization.type,
    };

    // Call the optional onAdd callback
    if (onAdd) {
      onAdd(cartCustomization);
    }
  };

  return (
    <View
      className="bg-brown-100 rounded-2xl overflow-hidden"
      style={{ width: isDesktopWebFrame ? 132 : 144, height: isDesktopWebFrame ? 146 : undefined }}
    >
      {/* Card Container */}
      <View className="rounded-2xl relative flex-1">
        {/* Food Image */}
        <View
          className="items-center justify-center bg-white w-full rounded-2xl"
          style={{
            height: isDesktopWebFrame ? 82 : undefined,
            borderWidth: isSelected ? 1 : 0,
            borderColor: isSelected ? '#FE8C00' : 'transparent',
          }}
        >
          <Image 
            source={getCustomizationImage(customization.name)}
            className={isDesktopWebFrame ? undefined : "w-16 h-16"}
            style={isDesktopWebFrame ? { width: 58, height: 58 } : undefined}
            resizeMode="contain"
          />
        </View>

        <View
          className='items-center justify-center gap-2'
          style={{
            paddingHorizontal: isDesktopWebFrame ? 10 : 16,
            paddingTop: isDesktopWebFrame ? 8 : 16,
            paddingBottom: isDesktopWebFrame ? 14 : 16,
          }}
        >

        {/* Name Label */}
        <Text
          className="font-medium text-white text-center"
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ fontSize: isDesktopWebFrame ? 12 : 14, width: '100%' }}
        >
          {customization.name}
        </Text>
        
        {/* Plus Button */}
        <TouchableOpacity 
          onPress={handleAddCustomization}
          className={`rounded-full items-center justify-center ${
            isSelected ? 'bg-green-500' : 'bg-red-500'
          }`}
          style={{ width: isDesktopWebFrame ? 22 : 24, height: isDesktopWebFrame ? 22 : 24 }}
        >
          <Image 
            source={isSelected ? images.check : images.plus}
            className={isDesktopWebFrame ? undefined : "w-4 h-4"}
            style={isDesktopWebFrame ? { width: 12, height: 12 } : undefined}
            resizeMode="contain"
            tintColor="white"
          />
        </TouchableOpacity>
        </View>
        
      </View>
    </View>
  );
};

export default CustomizationCard;
