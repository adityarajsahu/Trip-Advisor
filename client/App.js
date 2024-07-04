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
                <FlatList />
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#212121",
        alignItems: "center",
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
    },
});
