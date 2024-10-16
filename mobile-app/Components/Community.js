import React, { useState, useEffect } from 'react';
import { Alert, View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing the icon library
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import SQLite from 'react-native-sqlite-storage';
import HeaderComponent from './Header';
import BottomNavigation from './bottom_nav';

const App = ({route}) => {
    const { user_profileImage } = route?.params;
    const [posts, setPosts] = useState([]);
    const [isAddingPost, setIsAddingPost] = useState(false);
    const [userId, setUserId] = useState(null);
    const [newsTitle, setNewsTitle] = useState('');
    const [newsImage, setNewsImage] = useState(null); // Change to single image state
    const [longDescription, setLongDescription] = useState('');
    const [newsType, setNewsType] = useState(null);
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

    const handleSave = () => {
        //setUserId(2);
        setNewsType("2");
        const db = SQLite.openDatabase({ name: 'mydb.db', location: 'default' });
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM users', [], (tx, results) => {
                const rows = results.rows;
                for (let i = 0; i < rows.length; i++) {
                    userIds=rows.item(i).user_id;
                    console.log("data getting :: "+rows.item(i));
                    setUserId(rows.item(i).user_id);
                }
               
            });
        });
        // Create a FormData object to hold the data
        const formData = new FormData();
        formData.append('user_id', userIds);
        formData.append('news_title', newsTitle);
        formData.append('long_description', longDescription);
        formData.append('news_type', "IMAGE");
        // Append the image file
        if (newsImage) {
            formData.append('news_image', {
                uri: newsImage,
                type: 'image/jpeg', // or the correct type of your image
                name: 'photo.jpg', // provide a name for the image file
            });
        }
        axios.post('http://192.168.1.116:3001/addnewNews', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            Alert.alert('Success', 'Post added successfully!');
            setIsAddingPost(false);
            setLongDescription('');
            setNewsTitle('');
            setNewsImage(null); // Reset image after saving 
        })
        .catch(error => {
            console.error(error);
            Alert.alert('Error', 'Failed to add post.' + error);
            setLongDescription('');
            setNewsTitle('');
            setNewsImage(null); // Reset image on error
        });
    };
    const handleImagePicker = () => {
        Alert.alert(
            'Select Image',
            'Choose an option',
            [
                { text: 'Camera', onPress: () => openCamera() },
                { text: 'Gallery', onPress: () => openGallery() },
                { text: 'Cancel', style: 'cancel' },
            ]
        );
    };
    const openGallery = () => {
        ImagePicker.openPicker({
            mediaType: 'photo',
            cropping: true,
        }).then(image => {
            setNewsImage(image.path); // Set single image
        }).catch(error => {
            if (error.code !== 'E_PICKER_CANCELLED') {
                console.log('ImagePicker Error: ', error);
            }
        });
    };
    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setNewsImage(image.path); // Set single image
        }).catch(error => {
            console.log('Camera Error: ', error);
        });
    };

    // Handle Like Toggle
    const handleLike = (postId) => {
        setLikes((prevLikes) => ({
            ...prevLikes,
            [postId]: !prevLikes[postId], // Toggle like/unlike
        }));
    };

    const removeImage = () => {
        setNewsImage(null); // Reset image on remove
    }

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
                <HeaderComponent user_profileImage={user_profileImage}/>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Community</Text>
                </View>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.buttonCancel}
                            onPress={() => setIsAddingPost(false)}
                        >
                            <Text style={styles.buttonCancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSave}
                        >
                            <Text style={styles.buttonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.addNew}>Add New Post</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Post Title"
                        value={newsTitle}
                        onChangeText={setNewsTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Write Something... "
                        value={longDescription}
                        onChangeText={setLongDescription}
                    />
                    <TouchableOpacity style={styles.imageButton} onPress={handleImagePicker}>
                        <Text style={styles.imageButtonText}>
                            Select Image {newsImage ? ` (1)` : ''}
                        </Text>
                    </TouchableOpacity>
                    {newsImage && (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: newsImage }} style={styles.selectedImage} />
                            <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
                                <Text style={styles.removeButtonText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
                <BottomNavigation />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <HeaderComponent user_profileImage={user_profileImage}/>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Community</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {posts?.map((post, index) => (
                    <View key={index} style={styles.postContainer}>
                        <View style={styles.postHeader}>
                            <Image source={{ uri: 'http://192.168.1.116:3001/' + post.user_img }} style={styles.profileImage} />
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
            <BottomNavigation user_profileImage={user_profileImage} />
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
    buttonContainer: {
        marginTop:30,
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    button: {
        backgroundColor: '#3B9AB2',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 10,
    },
    buttonCancel: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonCancelText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
    addNew: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        margin: 20,
    },
    imageButton: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        margin: 20,
    },
    imageButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
    imageContainer: {
        marginVertical: 20,
        alignItems: 'center',
        marginBottom:150,
    },
    selectedImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    removeButton: {
        marginTop: 10,
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
    },
    removeButtonText: {
        color: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 20,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
});

export default App;
