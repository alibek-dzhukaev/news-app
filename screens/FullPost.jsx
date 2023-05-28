import React, {useCallback, useEffect, useState} from 'react';
import styled from "styled-components/native";
import {Alert, View} from "react-native";
import axios from "axios";
import {Loading} from "../components/Loading";

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`

export const FullPostScreen = ({ route, navigation }) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {id, title} = route.params

    const fetchPost = useCallback(async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`https://63dfe0a68b24964ae0f5e0cc.mockapi.io/api/v1/articles/${id}`)
            setData(response.data)
        } catch (error) {
            console.error(error)
            Alert.alert('Error', 'cannot load article')
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        navigation.setOptions({title})
        fetchPost()
    }, [])

    if (isLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Loading />
            </View>
        )
    }

    return (
        <View style={{padding: 20}}>
            <PostImage source={{ uri: data.imageUrl }}/>
            <PostText>{data.text}</PostText>
        </View>
    );
};
