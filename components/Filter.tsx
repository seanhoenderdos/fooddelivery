import { Category } from "@/type";
import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Platform, Text, TouchableOpacity } from 'react-native';

const Filter = ({ categories }: { categories: Category[] }) => {
    const searchParams = useLocalSearchParams();
    const [active, setActive] = useState(searchParams.category || '');

    // Convert category name to category ID for matching with filter buttons
    const getCategoryId = useCallback((categoryName: string) => {
        if (!categories || !categoryName) return categoryName;
        const foundCategory = categories.find((cat: any) => cat.name === categoryName);
        return foundCategory ? foundCategory.$id : categoryName;
    }, [categories]);

    useEffect(() => {
        const categoryParam = searchParams.category as string;
        if (categoryParam) {
            // If the category param looks like a name (contains letters), convert to ID
            const isName = /[A-Za-z]/.test(categoryParam) && !categoryParam.includes('all');
            if (isName) {
                const categoryId = getCategoryId(categoryParam);
                setActive(categoryId);
            } else {
                setActive(categoryParam);
            }
        } else {
            // If no category parameter, it means "All" is selected
            setActive('all');
        }
    }, [searchParams.category, categories, getCategoryId]);

    const handlePress = (id: string) => {
        setActive(id);

        if(id === 'all') router.setParams({ category: undefined });
        else router.setParams({ category: id });
    };

    const filterData: (Category | { $id: string; name: string })[] = categories
        ? [{ $id: 'all', name: 'All' }, ...categories]
        : [{ $id: 'all', name: 'All' }]

    return (
        <FlatList
            data={filterData}
            keyExtractor={(item) => item.$id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-x-2 pb-3"
            renderItem={({ item }) => (
                <TouchableOpacity
                    key={item.$id}
                    className={cn('filter', active === item.$id ? 'bg-amber-500' : 'bg-white')}
                    style={Platform.OS === 'android' ? { elevation: 5, shadowColor: '#878787'} : {}}
                    onPress={() => handlePress(item.$id)}
                >
                    <Text className={cn('body-medium', active === item.$id ? 'text-white' : 'text-gray-200')}>{item.name}</Text>
                </TouchableOpacity>
            )}
        />
    )
}
export default Filter;