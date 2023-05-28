import axios from 'axios'
import {ActivityIndicator, Alert, FlatList, RefreshControl, Text, TouchableOpacity, View} from 'react-native';
import Post from "../components/Post";
import {useCallback, useEffect, useState} from "react";


const HomeScreen = ({ navigation }) => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchPosts = useCallback(async () => {
        try {
            setIsLoading(true)
            const response = await axios.get('https://63dfe0a68b24964ae0f5e0cc.mockapi.io/api/v1/articles')
            setItems(response.data)
        } catch (error) {
            console.error(error)
            Alert.alert('Error', 'cannot load articles')
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchPosts()
    }, [])

    if (isLoading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large"/>
                <Text style={{marginTop: 15}}>Loading...</Text>
            </View>
        )
    }

    return (
        <View>
            <FlatList
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts}/>}
                data={items}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('FullPost', { id: item.id, title: item.title })}
                    >
                        <Post
                            imageUrl={item.imageUrl}
                            title={item.title}
                            createdAt={item.createdAt}
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

export default HomeScreen