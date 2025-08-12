import { getMenuItem } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import { useCustomizations } from '@/lib/useCustomizations';
import { useCartStore } from '@/store/cart.store';
import { CartCustomization, MenuItem } from '@/type';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export const useItemDetail = (id: string) => {
  const router = useRouter();
  const { addItem } = useCartStore();
  const [selectedCustomizations, setSelectedCustomizations] = useState<CartCustomization[]>([]);
  
  // Fetch item details
  const { data, loading: itemLoading, error } = useAppwrite({ 
    fn: getMenuItem, 
    params: { itemId: id } 
  });
  
  // Fetch customizations data
  const { toppings, sides, loading: customizationsLoading } = useCustomizations(id);
  
  const item = data as unknown as MenuItem;
  const loading = itemLoading || customizationsLoading;

  const handleCustomizationAdd = (customization: CartCustomization) => {
    setSelectedCustomizations(prev => {
      // Check if customization already exists
      const existingIndex = prev.findIndex(c => c.id === customization.id);
      
      if (existingIndex >= 0) {
        // Remove if already selected (toggle behavior)
        return prev.filter(c => c.id !== customization.id);
      } else {
        // Add new customization
        return [...prev, customization];
      }
    });
  };

  const getTotalPrice = () => {
    if (!item) return 0;
    const basePrice = item.price;
    const customizationsPrice = selectedCustomizations.reduce((sum, c) => sum + c.price, 0);
    return basePrice + customizationsPrice;
  };

  const handleAddToCart = () => {
    if (item) {
      addItem({ 
        id: item.$id, 
        name: item.name, 
        price: getTotalPrice(), 
        image_url: item.image_url,
        customizations: selectedCustomizations 
      });
      router.back();
    }
  };

  const goBack = () => {
    router.back();
  };

  return {
    item,
    loading,
    error,
    toppings,
    sides,
    selectedCustomizations,
    handleCustomizationAdd,
    getTotalPrice,
    handleAddToCart,
    goBack
  };
};
