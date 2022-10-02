import React, { useState, useLayoutEffect, useEffect } from "react"
import { ScrollView, View, StyleSheet, Text } from "react-native";
import {AntDesing} from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function HomeScreen({route, navigation}) {
    const [todos, setTodos] = useState(
        Array(20).fill('').map((_,i)=> (`Test ${i}`))
    );

    useEffect(() => {
        if(route.params?.todo) {
            const newTodos = [...todos, route.params.todo];
            setTodos(newTodos);
        }
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
                    todos.map((todo,index) => (
                        <View key={index} style={styles.rowContainer}>
                            <Text style={styles.rowText}>{todo}</Text>
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