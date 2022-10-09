import React, { useState, useLayoutEffect, useEffect } from "react"
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { Feather } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = '@todo_key'

export default function HomeScreen({route, navigation}) {
    const [todos, setTodos] = useState([]);

    const storeData = async (value) => {
        try{
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(STORAGE_KEY,jsonValue);
        } catch (e) {
            console.log(e);
        }
    }

    const getData = async() => {
        try{
            return AsyncStorage.getItem(STORAGE_KEY)
            .then (req => JSON.parse(req))
            .then (json => {
                if (json === null) {
                    json = []
                }
                setTodos(json);
            })
            .catch (error => console.log(error));
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
       // AsyncStorage.clear();
        if(route.params?.todo) {
            const newKey = todos.lenght + 1;
            const newTodo = {key: newKey.toString(), descpriction: route.params.todo};
            const newTodos = [...todos, newTodo];
            storeData(newTodos);           
        }
        getData();
    },[route.params?.todo])

    useLayoutEffect( () => {
        navigation.setOptions({
            headerStyle: {
                backroundColor: '#f0f0f0'
            },
            headerRight: () => (
                <Feather
                    style={styles.navButton}
                    name="plus"
                    size={24}
                    color="black"
                    onPress={ () => navigation.navigate('Todo')}
                />  
            ),  
        }) 
    }, [])

    return (
        <View style={styles.container}>
   
            <ScrollView>
                {
                    todos.map((todo) => (
                        <View style={styles.rowContainer} key={todo.key}>
                            <Text style={styles.rowText}>{todo.descpriction}</Text>
                        </View>
                    ))
                }
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backroundColor: '#fff',
        padding: 20,
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
    },
    rowText: {
        fontSize: 20,
        marginLeft: 5,
    },
    navButton: {
        marginRight: 5,
        fontSize: 24,
        padding: 4,
    },
});