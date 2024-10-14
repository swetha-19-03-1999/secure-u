import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing the icon library
import axios from 'axios';
import HeaderComponent from './Header';
import BottomNavigation from './bottom_nav';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [isAddingPost, setIsAddingPost] = useState(false);
    const [likes, setLikes] = useState({}); // State to track likes (toggling like/unlike)
    const [comments, setComments] = useState({}); // State to track comments
    const [commentInput, setCommentInput] = useState(''); // State for comment input

    useEffect(() => {
        if (!isAddingPost) {
            axios.get('http://192.168.1.116:3001/newsposts')
                .then(response => {
                    setPosts(response.data?.reverse());
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [isAddingPost]);

    // Handle Like Toggle
    const handleLike = (postId) => {
        setLikes((prevLikes) => ({
            ...prevLikes,
            [postId]: !prevLikes[postId], // Toggle like/unlike
        }));
    };

    // Handle Add Comment
    const handleAddComment = (postId) => {
        if (commentInput.trim()) {
            setComments((prevComments) => ({
                ...prevComments,
                [postId]: [...(prevComments[postId] || []), commentInput], // Add new comment to the post
            }));
            setCommentInput(''); // Clear the input after submitting
        }
    };

    if (isAddingPost) {
        return (
            <View style={styles.container}>
                <HeaderComponent />
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Community</Text>
                </View>
                {/* Add Post Logic */}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <HeaderComponent />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Community</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {posts?.map((post, index) => (
                    <View key={index} style={styles.postContainer}>
                        <View style={styles.postHeader}>
                            <Image source={{ uri: 'http://192.168.1.116:3001/uploads/1727282274054.jpg' }} style={styles.profileImage} />
                            <View style={styles.userInfo}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.username}>{post.user_names}</Text>
                                    <Text style={styles.user_name_tag}> @{post.user_names}</Text>
                                </View>
                                <Text style={styles.postDate}>{post.time_stamp}</Text>
                            </View>
                        </View>
                        <Text style={styles.posttitle}>{post.news_title}</Text>
                        <Text style={styles.postDescription}>{post.long_description}</Text>
                        <Image key={index} source={{ uri: "http://192.168.1.116:3001/" + post.news_image }} style={styles.postImage} />

                        {/* Like and Comment Buttons */}
                        <View style={styles.actionsContainer}>
                            <TouchableOpacity
                                style={styles.likeButton}
                                onPress={() => handleLike(post.id)} // Toggle like/unlike
                            >
                                <Icon
                                    name={'heart'} // 'heart' for liked, 'heart-o' for unliked
                                    size={30}
                                    color={likes[post.id] ? 'red' : 'gray'} // Red if liked, gray if not liked
                                />
                            </TouchableOpacity>

                            {/* Comment Text Input */}
                            <TextInput
                                style={styles.commentInput}
                                placeholder="Add a comment..."
                                value={commentInput}
                                onChangeText={setCommentInput}
                            />

                            <TouchableOpacity
                                style={styles.commentButton}
                                onPress={() => handleAddComment(post.id)}
                            >
                                <Text style={styles.commentText}>Comment</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Display Comments */}
                        {comments[post.id]?.map((comment, idx) => (
                            <Text key={idx} style={styles.commentTextDisplay}>- {comment}</Text>
                        ))}
                    </View>
                ))}
            </ScrollView>
            <BottomNavigation />
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => setIsAddingPost(true)}
            >
                <Text style={styles.floatingButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    headerContainer: {
        padding: 10,
        backgroundColor: '#3B9AB2',
    },
    headerText: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
    },
    postContainer: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 2,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userInfo: {
        flex: 1,
    },
    username: {
        fontWeight: 'bold',
    },
    user_name_tag: {
        marginLeft: 5,
        color: 'gray',
    },
    postDate: {
        fontSize: 12,
        color: 'gray',
    },
    posttitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    postDescription: {
        fontSize: 14,
        color: '#333',
        marginVertical: 5,
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 5,
        marginVertical: 5,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 120,
        right: 20,
        backgroundColor: '#3B9AB2',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingButtonText: {
        color: '#fff',
        fontSize: 30,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    likeButton: {
        padding: 10,
    },
    commentInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        flex: 1,
        marginHorizontal: 10,
    },
    commentButton: {
        backgroundColor: '#3B9AB2',
        padding: 10,
        borderRadius: 5,
    },
    commentText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    commentTextDisplay: {
        color: '#000',
        marginVertical: 5,
    },
});

export default App;
