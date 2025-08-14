import { CreateUserParams, GetMenuParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: 'com.seanhoenderdos.fooddelivery',
    databaseId: '68999423000b181dd0a0',
    userCollectionId: '689994660000991675ae',
    categoriesCollectionId: '689a4f0900034574fc53',
    menuCollectionId: '689a4fe60029d32356cd',
    customizationsCollectionId: '689a51f5003931697a8d',
    menuCustomizationsCollectionId: '689a53360010e0a7386a',
    bucketId: '689a54b6002864accc1e',
}

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

export const createUser = async ({email, password, name}: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name)

        if(!newAccount) throw Error;

        await signIn({ email, password });

        const avatarURL = avatars.getInitialsURL(name);

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                email, 
                name,
                accountId: newAccount.$id,
                avatar: avatarURL
            }
        )
        
    } catch (e) {
        throw new Error( e as string )
    }
};

export const signIn = async ({email, password}: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (e) {
        throw new Error( e as string )
    }
};

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getMenu = async ({ category, query }: GetMenuParams) => {
    try {
        const queries: string[] = [];

        if(category) queries.push(Query.equal('categories', category));
        if(query) queries.push(Query.search('name', query));

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries,
        )

        return menus.documents;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getMenuItem = async ({ itemId }: { itemId: string }) => {
    try {
        // Validate the itemId
        if (!itemId || typeof itemId !== 'string' || itemId.length === 0) {
            throw new Error('Invalid itemId: ID is required and must be a non-empty string');
        }
        
        if (itemId.length > 36) {
            throw new Error(`Invalid itemId: ID is too long (${itemId.length} chars, max 36)`);
        }
        
        // Check for invalid characters
        const validPattern = /^[a-zA-Z0-9_][a-zA-Z0-9_]*$/;
        if (!validPattern.test(itemId)) {
            throw new Error(`Invalid itemId: Contains invalid characters or starts with underscore`);
        }

        const item = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            itemId
        );
        // If the item has a categories relationship, fetch the category name
        if (item.categories) {
            try {
                const category = await databases.getDocument(
                    appwriteConfig.databaseId,
                    appwriteConfig.categoriesCollectionId,
                    item.categories
                );
                (item as any).categoryName = category.name;
            } catch {
                // Continue without category name
            }
        }

        return item;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getMenuCustomizations = async ({ itemId }: { itemId: string }) => {
    try {
        const customizations = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCustomizationsCollectionId,
            [Query.equal('menu', itemId)]
        );

        return customizations.documents;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getAllCustomizations = async () => {
    try {
        const customizations = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.customizationsCollectionId,
        );

        return customizations.documents;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getCustomizationsByIds = async (customizationIds: string[]) => {
    try {
        if (customizationIds.length === 0) return [];
        
        // For querying by $id, we need to use Query.contains or create multiple OR queries
        // Since Query.contains might not work with $id, let's use individual document fetches
        const customizationPromises = customizationIds.map(id => 
            databases.getDocument(
                appwriteConfig.databaseId,
                appwriteConfig.customizationsCollectionId,
                id
            )
        );

        const customizations = await Promise.all(customizationPromises);
        return customizations;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getCategories = async () => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
        )

        return categories.documents;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const signOut = async () => {
    try {
        await account.deleteSession('current');
    } catch (e) {
        throw new Error(e as string);
    }
}