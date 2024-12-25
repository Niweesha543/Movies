import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRouter, useGlobalSearchParams } from "expo-router";
import axios from "axios";
import FloatingButton from "@/components/FloatingButton";
import { useClickCount } from "@/contexts/ClickCountContext";

const API_URL = "https://api.themoviedb.org/3/movie";
const API_KEY = "b87e84676d6fb03a9146aaf0b6c71358";

const MovieDetails = () => {
    const router = useRouter();
    const { movieId } = useGlobalSearchParams();
    const [movie, setMovie] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { count } = useClickCount();

    useEffect(() => {
        if (movieId) {
            fetchMovieDetails();
        }
    }, [movieId]);

    const fetchMovieDetails = async () => {
        try {
            const response = await axios.get(`${API_URL}/${movieId}`, {
                params: {
                    api_key: API_KEY,
                    language: "en-US",
                },
            });
            setMovie(response.data);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    if (!movie) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Movie not found!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backButtonText}>❌</Text>
            </TouchableOpacity>

            {/* Movie Details */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w780${movie.poster_path}` }} // Higher resolution image
                    style={styles.image}
                />
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.overview}>{movie.overview}</Text>

                <View style={styles.infoContainer}>
                    <Text style={styles.info}>Release Date: {movie.release_date}</Text>
                    <Text style={styles.info}>Rating: {movie.vote_average} / 10</Text>
                </View>
            </ScrollView>

            {/* Floating Button */}
            <FloatingButton count={count} />
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
    },
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4",
        paddingTop: 40, // Ensure space for the back button at the top
    },
    backButton: {
        position: "absolute",
        top: 20,
        left: 20,
        backgroundColor: "#FFB300",
        padding: 8, // Smaller padding for smaller button
        borderRadius: 20, // Slightly rounded to match smaller button size
        zIndex: 10,
        elevation: 5,
    },
    backButtonText: {
        fontSize: 18, // Smaller font size for the button
        color: "#fff",
        fontWeight: "bold",
    },
    scrollContainer: {
        padding: 20,
    },
    image: {
        width: "100%",
        height: 450,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 8,
        elevation: 6,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 15,
        textAlign: "center",
    },
    overview: {
        fontSize: 18,
        lineHeight: 24,
        marginBottom: 15, // Reduced margin to bring content closer
        textAlign: "justify",
        color: "#555",
    },
    infoContainer: {
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 4,
    },
    info: {
        fontSize: 16,
        color: "#333",
        marginBottom: 8,
    },
    errorText: {
        fontSize: 18,
        color: "red",
        textAlign: "center",
        marginTop: 50,
    },
});

export default MovieDetails;
