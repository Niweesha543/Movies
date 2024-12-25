import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface FloatingButtonProps {
    count: number;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ count }) => {
    const handleFloatingButtonPress = () => {
        alert(`You clicked ${count} times!`);
    };

    return (
        <TouchableOpacity style={styles.floatingButton} onPress={handleFloatingButtonPress}>
            <Text style={styles.buttonText}>{count}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    floatingButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#FFB300",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default FloatingButton;