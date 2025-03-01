import {Dimensions, StyleSheet, Text, View, Image} from "react-native";
import {NewsDataType} from "@/types";
import {SharedValue} from "react-native-reanimated";
import {LinearGradient} from "expo-linear-gradient";
import {Colors} from "@/constants/Colors";

type Props = {
    slideItem: NewsDataType,
    index: number,
    scrollX: SharedValue<number>
}

const {width} = Dimensions.get("screen");

const SliderItem = ({slideItem, index}: Props) => {
    return (
        <View style={styles.itemWrapper}>
            <Image source={{uri: slideItem.image_url}} style={styles.image}/>
            <LinearGradient colors={["transparent", 'rgba(0,0,0,0.8)']} style={styles.background}>
                <View style={styles.sourceInfo}>
                    {slideItem.source_icon && (
                        <Image source={{uri: slideItem.source_icon}} style={styles.sourceIcon}/>
                    )}
                    <Text style={styles.sourceName}>{slideItem.source_name}</Text>
                </View>
                <Text style={styles.title} numberOfLines={2}>{slideItem.title}</Text>
            </LinearGradient>
        </View>
    );
};

export default SliderItem;

const styles = StyleSheet.create({
    itemWrapper: {
        position: "relative",
        width: width,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: width - 60,
        height: 180,
        borderRadius: 20
    },
    background: {
        position: "absolute",
        left: 30,
        right: 0,
        top: 0,
        width: width - 60,
        height: 180,
        borderRadius: 20,
        padding: 20,
    },
    sourceInfo: {
        flexDirection: "row",
        position: "absolute",
        top: 85,
        paddingHorizontal: 20,
        alignItems: "center",
        gap: 10
    },
    sourceName: {
      color: Colors.white,
      fontSize: 12,
      fontWeight: '600'
    },
    sourceIcon: {
        width: 25,
        height: 25,
        borderRadius: 20
    },
    title: {
        fontSize: 14,
        color: Colors.white,
        position: "absolute",
        top: 120,
        paddingHorizontal: 20,
        fontWeight: '600',
    }
});