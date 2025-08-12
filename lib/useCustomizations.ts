import { getAllCustomizations } from '@/lib/appwrite';
import { Customization } from '@/type';
import { useEffect, useState } from 'react';

export const useCustomizations = (itemId: string) => {
  const [customizations, setCustomizations] = useState<Customization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomizations = async () => {
      if (!itemId) {
        console.log('❌ No itemId provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log('🔍 useCustomizations - Fetching customizations for item:', itemId);

        // First, let's check if we can fetch ALL customizations to verify the collection works
        console.log('🧪 Testing: Fetching ALL customizations to verify collection...');
        const allCustomizations = await getAllCustomizations();
        console.log('📊 Total customizations in collection:', allCustomizations.length);
        console.log('📋 First few customizations:', allCustomizations.slice(0, 3));

        // For now, let's return ALL customizations to see if the carousel renders
        // This is just for debugging - we'll fix the filtering later
        setCustomizations(allCustomizations as unknown as Customization[]);
      } catch (err) {
        console.error('❌ Error fetching customizations:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch customizations');
        setCustomizations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomizations();
  }, [itemId]);

  // Group customizations by type
  const toppings = customizations.filter(c => c.type === 'topping');
  const sides = customizations.filter(c => c.type === 'side');

  console.log('🍔 Final toppings:', toppings);
  console.log('🍟 Final sides:', sides);

  return {
    customizations,
    toppings,
    sides,
    loading,
    error
  };
};
