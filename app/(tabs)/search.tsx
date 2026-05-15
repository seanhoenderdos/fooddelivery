import CartButton from "@/components/CartButton";
import MenuCard from "@/components/MenuCard";
import { getCategories, getMenu } from "@/lib/appwrite";
import { useDesktopWebFrame } from "@/lib/useDesktopWebFrame";
import useAppwrite from "@/lib/useAppwrite";
import { Category, MenuItem } from "@/type";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import Filter from "@/components/Filter";
import SearchBar from "@/components/SearchBar";

const Search = () => {
    const isDesktopWebFrame = useDesktopWebFrame();
    const { category, query } = useLocalSearchParams<{query: string; category: string}>()

    const { data, refetch, loading } = useAppwrite({ fn: getMenu, params: { category,  query,  limit: 6, } });
    const { data: categories } = useAppwrite({ fn: getCategories });

    // Convert category name to category ID for filtering
    const getCategoryId = (categoryName: string) => {
        if (!categories || !categoryName) return categoryName;
        const foundCategory = (categories as any[]).find((cat: any) => cat.name === categoryName);
        return foundCategory ? foundCategory.$id : categoryName;
    };

    const categoryId = getCategoryId(category);

    useEffect(() => {
        refetch({ category: categoryId, query, limit: 6})
    }, [categoryId, query, refetch]);

    const Header = () => (
        <View className="px-5 gap-5 pb-5" style={{ marginTop: isDesktopWebFrame ? 54 : 20 }}>
            <View className="flex-between flex-row w-full">
                <View className="flex-start">
                    <Text className="small-bold uppercase text-primary">Search</Text>
                    <View className="flex-start flex-row gap-x-1 mt-0.5">
                        <Text className="paragraph-semibold text-dark-100">Find your favorite food</Text>
                    </View>
                </View>

                <CartButton />
            </View>

            <SearchBar />

            <Filter categories={(categories as unknown as Category[]) || []} />
        </View>
    );

    return (
        <SafeAreaView className="bg-white flex-1">
            <Header />
            <FlatList
                data={data}
                renderItem={({ item, index }) => {
                    const isFirstRightColItem = index % 2 === 0;

                    return (
                        <View
                            className={cn("flex-1", !isFirstRightColItem ? 'mt-10': 'mt-0')}
                            style={{ maxWidth: isDesktopWebFrame ? '48%' : '48%' }}
                        >
                            <MenuCard item={item as unknown as MenuItem} />
                        </View>
                    )
                }}
                keyExtractor={item => item.$id}
                numColumns={2}
                columnWrapperClassName={isDesktopWebFrame ? undefined : "gap-7"}
                columnWrapperStyle={isDesktopWebFrame ? { gap: 12 } : undefined}
                contentContainerClassName="gap-7 px-5 pb-32"
                contentContainerStyle={{ paddingTop: isDesktopWebFrame ? 28 : 0 }}
                ListEmptyComponent={() => !loading && <Text>No results</Text>}
            />
        </SafeAreaView>
    )
}

export default Search;
