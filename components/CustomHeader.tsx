import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { images } from "@/constants";
import { useDesktopWebFrame } from "@/lib/useDesktopWebFrame";
import { CustomHeaderProps } from "@/type";

const CustomHeader = ({ title }: CustomHeaderProps) => {
    const router = useRouter();
    const isDesktopWebFrame = useDesktopWebFrame();

    return (
        <View
            className="custom-header"
            style={{
                paddingTop: isDesktopWebFrame ? 56 : undefined,
                marginBottom: isDesktopWebFrame ? 18 : undefined,
            }}
        >
            <TouchableOpacity
                onPress={() => router.back()}
                className="items-center justify-center"
                style={{ width: isDesktopWebFrame ? 36 : undefined, height: isDesktopWebFrame ? 36 : undefined }}
            >
                <Image
                    source={images.arrowBack}
                    className={isDesktopWebFrame ? undefined : "size-5"}
                    style={isDesktopWebFrame ? { width: 24, height: 24 } : undefined}
                    resizeMode="contain"
                />
            </TouchableOpacity>

            {title && <Text className="base-semibold text-dark-100">{title}</Text>}

            <Image
                source={images.search}
                className={isDesktopWebFrame ? undefined : "size-5"}
                style={isDesktopWebFrame ? { width: 24, height: 24 } : undefined}
                resizeMode="contain"
            />
        </View>
    );
};

export default CustomHeader;
