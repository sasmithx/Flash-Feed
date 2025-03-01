/*
import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import {NewsDataType} from "@/types";


type Props = {}

const Page = (props: Props) => {
  const {top: safeTop} = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);

  useEffect(() => {
        getBreakingNews();
  }, []);

  const getBreakingNews = async () => {
      try {
          const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&q=news&country=lk&language=si&category=business,education,sports,technology,top@removeduplicate=1&size=5`;
          const response = await axios.get(URL);

          if( response && response.data ) {
            setBreakingNews(response.data.results);
          }
      } catch (error:any) {
            console.log(error);
      }
  }

  return (
    <View style={[styles.container, {paddingTop: safeTop}]}>
      <Header />
      <SearchBar />
        {breakingNews.map((item,index) => (
            <Text>{item.title}</Text>
        ))}
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})*/

import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import axios from 'axios';
import {NewsDataType} from '@/types';
import BreakingNews from "@/components/BreakingNews";

const Page = () => {
    const {top: safeTop} = useSafeAreaInsets();
    const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getBreakingNews();
    }, []);

    const getBreakingNews = async () => {
        try {
            const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

            if (!API_KEY) {
                console.error("API Key is missing. Make sure it's set in your .env file.");
                return;
            }

            const URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=news&country=lk&language=si&category=business,education,sports,technology,top&removeduplicate=1&size=5`;

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

    return (
        <View style={[styles.container, {paddingTop: safeTop}]}>
            <Header/>
            <SearchBar/>
            {isLoading ? (
                <ActivityIndicator size={'large'}/>
            ) : (
                <BreakingNews newsList={breakingNews}/>
            )}
        </View>
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
