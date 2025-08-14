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
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch ALL customizations to verify the collection works
        const allCustomizations = await getAllCustomizations();

        // For now, let's return ALL customizations to see if the carousel renders
        // This is just for debugging - we'll fix the filtering later
        setCustomizations(allCustomizations as unknown as Customization[]);
      } catch (err) {
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

  return {
    customizations,
    toppings,
    sides,
    loading,
    error
  };
};
