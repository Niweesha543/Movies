// screens/Home.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import MovieCard from "../components/MovieCard";
import FloatingButton from "../components/FloatingButton";
import axios from "axios";
import { useClickCount } from "@/contexts/ClickCountContext";
import { useUser } from "@/contexts/UserContext"; // Import the User context

const API_URL = "https://api.themoviedb.org/3/movie/popular";
const API_KEY = "b87e84676d6fb03a9146aaf0b6c71358";

const Home = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { count, incrementCount } = useClickCount();
  const { name } = useUser(); // Get name from context

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const fetchMovies = async () => {
    setLoading(page === 1 && !refreshing);
    setLoadingMore(page > 1);
    try {
      const response = await axios.get(API_URL, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page,
        },
      });
      setMovies((prevMovies) => {
        const newMovies =
          page === 1
            ? response.data.results
            : [...prevMovies, ...response.data.results];

        return newMovies;
      });
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (!loadingMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleMovieClick = () => {
    incrementCount();
  };

  const renderMovieCard = ({ item }: { item: any }) => <MovieCard movie={item} />;

  const renderFooter = () => {
    if (!loadingMore) return null;
    return <ActivityIndicator style={styles.loadingMoreIndicator} size="large" color="#FFB300" />;
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.appName}>
          <Text style={styles.yellow}>M</Text>
          <Text>ovies</Text>
        </Text>
      </View>

      {/* Display User's Name */}
      <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeText}>Hello {name} 👋🏻</Text>
      </View>

      <Text style={styles.title}>Trending 🔥</Text>
      {loading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="#FFB300" />
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovieCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={0}
          contentContainerStyle={styles.list}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}

      {/* Floating Button (Count Circle) */}
      <FloatingButton count={count} onPress={handleMovieClick} style={styles.floatingButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  topBar: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3f3f3f",
    paddingVertical: 20,
    borderRadius: 20,
    marginBottom: 15,
  },
  appName: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "800",
  },
  yellow: { color: "#FFB300", fontSize: 35 },
  title: {
    fontSize: 24,
    marginVertical: 20,
    textAlign: "left",
    color: "#333",
    fontWeight: "500",
    marginLeft: 16,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  loadingMoreIndicator: {
    marginVertical: 10,
  },
  list: {
    paddingHorizontal: 10,
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#0000",
    borderRadius: 50,
    padding: 15,
  },
  welcomeText: {
    fontSize: 20,
    marginTop: 0,
    textAlign: "center",
    color: "#333",

  },
  welcomeContainer:{
      justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFB300",
          paddingVertical: 5,
          borderRadius: 0,
          marginBottom: 1,
  }
});

export default Home;
