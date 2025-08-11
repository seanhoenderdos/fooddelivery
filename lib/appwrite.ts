import { CreateUserParams, SignInParams, User } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: 'com.seanhoenderdos.fooddelivery',
    databaseId: '68999423000b181dd0a0',
    userCollectionId: '689994660000991675ae',
}

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
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

export const getCurrentUser = async (): Promise<User | null> => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser || currentUser.documents.length === 0) throw Error;

        return currentUser.documents[0] as unknown as User;
    } catch (e) {
        console.log('getCurrentUser error:', e);
        return null;
    }
}