import { StyleSheet, Text, useWindowDimensions, View, ViewToken } from "react-native";
import { Colors } from "@/constants/Colors";
import { NewsDataType } from "@/types";
import SliderItem from "@/components/SliderItem";
import { useEffect, useRef, useState } from "react";
import Animated, {
    useAnimatedRef,
    useAnimatedScrollHandler,
    useDerivedValue,
    useSharedValue,
    scrollTo
} from "react-native-reanimated";
import Pagination from "@/components/Pagination";

type Props = {
    newsList: Array<NewsDataType>;
};

const BreakingNews = ({ newsList }: Props) => {
    const [data, setData] = useState(newsList);
    const [paginationIndex, setPaginationIndex] = useState(0);
    const scrollX = useSharedValue(0);
    const ref = useAnimatedRef<Animated.FlatList<any>>();
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const interval = useRef<NodeJS.Timeout>();
    const offset = useSharedValue(0);
    const { width } = useWindowDimensions();

    // Scroll event handler using reanimated
    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
        onMomentumEnd: (event) => {
            offset.value = event.contentOffset.x;
        },
    });

    useEffect(() => {
        if (isAutoPlay === true) {
            interval.current = setInterval(() => {
                offset.value = offset.value + width;
            }, 5000);
        } else {
            clearInterval(interval.current);
        }
        return () => {
            clearInterval(interval.current);
        };
    }, [isAutoPlay, offset, width]);

    useDerivedValue(() => {
        scrollTo(ref, offset.value, 0, true);
    });

    // Handling viewable items
    const onViewableItemsChanged = ({
                                        viewableItems,
                                    }: {
        viewableItems: ViewToken[];
    }) => {
        if (viewableItems.length > 0 && viewableItems[0]?.index !== undefined) {
            setPaginationIndex(viewableItems[0].index % newsList.length);
        }
    };

    // Viewability configuration
    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    };

    const viewabilityConfigCallbackPairs = useRef([
        { viewabilityConfig, onViewableItemsChanged },
    ]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Breaking News</Text>
            <View style={styles.slideWrapper}>
                <Animated.FlatList
                    ref={ref}
                    data={data}
                    keyExtractor={(_, index) => `list_items${index}`}
                    renderItem={({ item, index }) => (
                        <SliderItem slideItem={item} index={index} scrollX={scrollX} />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScroll={onScrollHandler}
                    scrollEventThrottle={16}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => setData((prevData) => [...prevData, ...newsList])}
                    viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                    onScrollBeginDrag={() => {
                        setIsAutoPlay(false);
                    }}
                    onScrollEndDrag={() => {
                        setIsAutoPlay(true);
                    }}
                />
                <Pagination items={newsList} paginationIndex={paginationIndex} />
            </View>
        </View>
    );
};

export default BreakingNews;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: Colors.black,
        marginBottom: 10,
        marginLeft: 20,
    },
    slideWrapper: {
        justifyContent: "center",
    },
});