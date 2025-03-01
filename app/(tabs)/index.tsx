import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import axios from 'axios';
import {NewsDataType} from '@/types';
import BreakingNews from "@/components/BreakingNews";
import Categories from "@/components/Categories";
import NewsList from "@/components/NewsList";
import Loading from "@/components/Loading";

const Page = () => {
    const {top: safeTop} = useSafeAreaInsets();
    const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
    const [news, setNews] = useState<NewsDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getBreakingNews();
        getNews();
    }, []);

    const getBreakingNews = async () => {
        try {
            const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

            if (!API_KEY) {
                console.error("API Key is missing. Make sure it's set in your .env file.");
                return;
            }

            const URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=news&language=si&category=business,education,sports,technology,top&removeduplicate=1&size=5`;

            console.log("Fetching data from:", URL);

            const response = await axios.get(URL);

            console.log(response.data);
            if (response && response.data) {
                setBreakingNews(response.data.results);
                setIsLoading(false);
            }
        } catch (error: any) {
            console.error("Error fetching news:", error.response ? error.response.data : error.message);
        }
    };

    const getNews = async () => {
        try {
            const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

            if (!API_KEY) {
                console.error("API Key is missing. Make sure it's set in your .env file.");
                return;
            }

            const URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=news&language=si&category=business,education,sports,technology,top&removeduplicate=1&size=10`;

            console.log("Fetching data from:", URL);

            const response = await axios.get(URL);

            console.log(response.data);
            if (response && response.data) {
                setBreakingNews(response.data.results);
                setIsLoading(false);
            }
        } catch (error: any) {
            console.error("Error fetching news:", error.response ? error.response.data : error.message);
        }
    };

    const onCatChanged = (category: string) => {
        console.log('Category: ', category);
    }

    return (
        <ScrollView style={[styles.container, {paddingTop: safeTop}]}>
            <Header/>
            <SearchBar/>
            {isLoading ? (
                <Loading size={'large'} />
            ) : (
                <BreakingNews newsList={breakingNews}/>
            )}
            <Categories onCategoryChanged={onCatChanged} />
            <NewsList newsList={news} />
        </ScrollView>
    );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
    },
    newsText: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 5,
    },
    loadingText: {
        fontSize: 16,
        color: "gray",
        textAlign: "center",
        marginTop: 20,
    },
});
