import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { signIn } = useAuth();

    const handleSignIn = () => {
        if (email && password) {
            const isAuthenticated = signIn(email, password);
            if (!isAuthenticated) {
                alert("Invalid credentials");
                return;
            }
            router.push("/home");
        } else {
            alert("Please fill in all fields");
        }
    };

    return (
        <View style={styles.container}>
            {/* Heading with yellow 'M' and centered text */}
            <Text style={styles.headingTxt}>
                <Text style={styles.yellow}>M</Text><Text>ovies</Text>
            </Text>
            <Text style={styles.title}>Sign In</Text>
            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Sign In" onPress={handleSignIn} color="#FFB300" /> {/* Dark yellow Button */}

            {/* Additional Text for Sign Up */}
            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => router.push("/signup")}>
                    <Text style={styles.signupLink}> Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "white" }, // White background
    title: { fontSize: 24, marginBottom: 20, textAlign: "center", color: "#333" }, // Default color for title
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderColor: "#FFB300", // Dark yellow border
        backgroundColor: "white", // White background for inputs
        color: "#333" // Dark text for inputs
    },
    signupContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
    },
    signupText: { fontSize: 16, color: "#00000" }, // Dark yellow color for Sign Up text
    signupLink: { fontSize: 16, color: "#FFB300", fontWeight: "bold" },
    headingTxt: {
        fontSize: 40,
        fontWeight: "800",
        color: "#333", // Default color for text
        marginTop: 10,
        textAlign: "center"
    },
    yellow: { color: "#FFB300" , fontSize: 50}, // Dark yellow for 'M'
});

export default SignIn;
