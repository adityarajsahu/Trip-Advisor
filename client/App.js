import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    Platform,
    FlatList,
} from "react-native";

export default function App() {
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
                <View style={styles.botMessageContainer}>
                    <Text>Bot Message</Text>
                </View>
                <View style={styles.userMessageContainer}>
                    <Text>User Message</Text>
                </View>
                <View style={styles.userMessageContainer}>
                    <Text>This setup ensures that messages are properly aligned on the left and right sides of the screen, creating a typical chat interface layout.</Text>
                </View>
                <View style={styles.botMessageContainer}>
                    <Text>This setup ensures that messages are properly aligned on the left and right sides of the screen, creating a typical chat interface layout.</Text>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#212121",
        // alignItems: "center",
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
        padding: 20,
        flexDirection: "column",
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
});
