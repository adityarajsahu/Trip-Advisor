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
import * as Crypto from "expo-crypto";

export default function App() {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [sendButtonDisabled, setSendButtonDisabled] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch("https://92ad-2401-4900-8829-405e-ad33-477b-e4d2-eec5.ngrok-free.app"); // Ngrok Tunneling
                if(!response.ok) {
                    throw new Error("Network response was not OK");
                }
                const data = await response.json();
                // console.log(data);
                let id = Crypto.randomUUID();
                console.log(id);
                setMessages([...messages, { id: id, text: data["message"], type: "bot" }]);
                // console.log(messages);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        getData();
    }, []);

    const handleSend = async () => {
        let user_query = text.trim();
        setText("");
        if(user_query) {
            setSendButtonDisabled(true);
            let id = Crypto.randomUUID();
            console.log(id);
            setMessages([...messages, { id: id, text: user_query, type: "user" }]);

            try {
                const response = await fetch("https://92ad-2401-4900-8829-405e-ad33-477b-e4d2-eec5.ngrok-free.app", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ "user_query": user_query }),
                });

                if(!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                id = Crypto.randomUUID();
                const botMessage = { id: id, text: data["message"], type: "bot" };
                setMessages(prevMessages => [...prevMessages, botMessage]);
            } catch (error) {
                console.error("Data Fetch Error: ", error);
            }

            setSendButtonDisabled(false);
        }

        console.log(messages);
    };

    const renderItem = ({ item }) => {
        return (
            <View style={item.type === "bot" ? styles.botMessageContainer : styles.userMessageContainer}>
                <Text>{item.text}</Text>
            </View>
        );
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
                    <FlatList data={messages} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={text}
                        onChangeText={(newText) => setText(newText)}
                        placeholder="Type a message"
                    />
                    <Pressable onPress={handleSend} disabled={sendButtonDisabled}>
                        { sendButtonDisabled ? <Ionicons name="stop-circle-outline" size={36} color="gray" /> : <Ionicons name="send" size={36} color="gray" /> }
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
