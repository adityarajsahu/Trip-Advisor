import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    Platform,
    FlatList,
    TextInput,
    Pressable
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";

export default function App() {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch("https://localhost:8000/");
                if(!response.ok) {
                    throw new Error("Network response was not OK");
                }
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        getData();
    }, []);

    const handleSend = () => {
        console.log("Button Pressed");
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Trip Advisor AI</Text>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingContainer}
            >
                <View style={styles.chatboxContainer}>
                    <View style={styles.botMessageContainer}>
                        <Text>Bot Message</Text>
                    </View>
                    <View style={styles.userMessageContainer}>
                        <Text>User Message</Text>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={text}
                        onChangeText={(newText) => setText(newText)}
                        placeholder="Type a message"
                    />
                    <Pressable onPress={handleSend}>
                        <Ionicons name="send" size={36} color="gray" />
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#212121",
    },
    headerContainer: {
        width: "100%",
        height: "12%",
        backgroundColor: "#171717",
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        color: "#ECECDF",
        fontSize: 30,
        fontWeight: "bold",
        padding: "5%",
        marginTop: "7%",
    },
    keyboardAvoidingContainer: {
        flex: 1,
        padding: 20,
    },
    chatboxContainer: {
        flex: 32,
    },
    botMessageContainer: {
        alignSelf: "flex-start",
        backgroundColor: "#ECECDF",
        maxWidth: "70%",
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
    },
    userMessageContainer: {
        alignSelf: "flex-end",
        backgroundColor: "#DCF8C6",
        maxWidth: "70%",
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
    },
    inputContainer: {
        flex: 7,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        // justifyContent: "center",
    },
    textInput: {
        width: "85%",
        color: "white",
        fontSize: 16,
        fontWeight: "300",
        marginVertical: 10,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 50,
        padding: 10,
    },
});
