import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {NewsDataType} from "@/types";
import {Colors} from "@/constants/Colors";

type Props = {
    newsList: Array<NewsDataType>;
};

const NewsList = ({newsList}: Props) => {
    return (
        <View style={styles.container}>
            {newsList.map((item, index) => (
                <View key={index} style={styles.itemContainer}>
                    <Image source={{uri: item.image_url}} style={styles.itemImg}/>
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemCategory}>{item.category}</Text>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <View style={styles.itemSourceInfo}>
                            <Image source={{uri: item.source_icon}} style={styles.itemSourceImg} />
                            <Text style={styles.itemSourceName}>{item.source_name}</Text>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
};

export default NewsList;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginBottom: 50
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        flex: 1,
        gap: 10,
    },
    itemImg: {
        width: 90,
        height: 100,
        borderRadius: 20,
        marginRight: 10
    },
    itemInfo: {
        flex: 1,
        gap: 10,
        justifyContent: 'space-between',
    },
    itemCategory: {
        fontSize: 12,
        color: Colors.darkGrey,
        textTransform: 'capitalize'
    },
    itemTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.black
    },
    itemSourceInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    itemSourceImg: {
        width: 20,
        height: 20,
        borderRadius: 20
    },
    itemSourceName: {
        fontSize: 10,
        fontWeight: '400',
        color: Colors.darkGrey
    }
});
