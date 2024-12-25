import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useClickCount } from "../contexts/ClickCountContext";

const MovieCard = ({ movie }: { movie: any }) => {
  const router = useRouter();
  const { incrementCount } = useClickCount();

  const handlePress = () => {
    incrementCount(); // Increment the click count
    router.push(`/movie/${movie.id}`); // Navigate to the movie details screen
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image
        source={{
          uri: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/200x300.png?text=No+Image",
        }}
        style={styles.image}
        resizeMode="cover" // Maintain aspect ratio while filling the container
      />
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {movie.title || "Unknown Title"}
          </Text>
          <Text style={styles.imdbRating} numberOfLines={1}>
            ⭐{movie.vote_average} / 10
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginBottom: 15,
    marginHorizontal: 10,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#FFB300", // Yellowish shadow color
    shadowOpacity: 0.4,
    shadowOffset: { width: 4, height: 8 },
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: "100%", // Make the image fill the card's width
    height: 400, // Fixed height for the image
    backgroundColor: "#e0e0e0", // Placeholder color while the image loads
  },
  textContainer: {
    padding: 15,
    backgroundColor: "#f9f9f9", // Slightly lighter background for text
  },
  titleContainer: {
    flexDirection: "row", // Align title and IMDB horizontally
    justifyContent: "space-between", // Space out the title and rating
    alignItems: "center", // Vertically center the text
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
    color: "#333",
    flex: 1, // Allow the title to take available space
  },
  imdbRating: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000", // Color to highlight the IMDB rating
  },
});

export default MovieCard;
