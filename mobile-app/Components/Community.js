import React, {useState, useEffect} from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; // Using FontAwesome icons
import SQLite from 'react-native-sqlite-storage';
import ImagePicker from 'react-native-image-crop-picker';
import HeaderComponent from './Header';
import BottomNavigation from './bottom_nav';

const App = ({route}) => {
  const {user_profileImage} = route?.params;
  const [posts, setPosts] = useState([]);
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [userId, setUserId] = useState(null);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsImage, setNewsImage] = useState(null);
  const [longDescription, setLongDescription] = useState('');
  const [newsType, setNewsType] = useState(null);
  const [commentInput, setCommentInput] = useState(''); // State for comment input
  const [showComments, setShowComments] = useState({}); // State to toggle comment section for each post
  const [showMenu, setShowMenu] = useState(null); // State to toggle the menu for a specific post

  const getNewPosts = () => {
    axios
      .get('http://192.168.1.116:3001/newsposts')
      .then(response => {
        setPosts(response.data?.reverse());
        console.log(response.data[1], 'like');
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (!isAddingPost) {
      getNewPosts();
    }
  }, [isAddingPost]);

  useEffect(() => {
    // Function to get the user ID from the local SQLite database
    const getUserId = () => {
      const db = SQLite.openDatabase({name: 'mydb.db'});

      db.transaction(tx => {
        tx.executeSql('SELECT * FROM users', [], (tx, results) => {
          if (results.rows.length > 0) {
            const userIdFromDb = results.rows.item(0).user_id;
            setUserId(userIdFromDb); // Set the user ID in state
          }
        });
      });
    };

    // Call the function to get the user ID
    getUserId();
  }, []);

  // Function to handle Like Toggle (Like/Dislike)
  const handleLike = async (postId, url) => {
    console.log(url, 'uurrl');
    const post = posts.find(p => p.news_id === postId);
    const userLiked = post.likes.some(like => like.user_id === userId); // Check if user already liked the post

    const updatedPosts = posts.map(post => {
      if (post.news_id === postId) {
        return {
          ...post,
          likes: userLiked
            ? post.likes.filter(like => like.user_id !== userId)
            : [...post.likes, {user_id: userId, user_name: 'Your Name'}],
        };
      }
      return post;
    });

    setPosts(updatedPosts);

    // Send the like/dislike to the server
    try {
      await axios
        .post(`http://192.168.1.116:3001/${url}`, {
          news_id: postId,
          user_id: userId,
        })
        .then(response => {
          getNewPosts();
          console.log('Like/dislike toggled successfully.');
        });
    } catch (error) {
      console.error('Error toggling like/dislike:', error);
    }
  };

  // Function to handle deleting a post
  const handleDelete = async postId => {
    try {
      await axios
        .delete(`http://192.168.1.116:3001/delete-news/${postId}`)
        .then(response => {
          Alert.alert('Success', 'Post deleted successfully!');
          getNewPosts();
        });
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Function to handle adding a comment
  const handleAddComment = async postId => {
    if (commentInput.trim()) {
      const updatedPosts = posts.map(post => {
        if (post.news_id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                user_id: userId,
                user_name: 'Your Name',
                comment_text: commentInput,
              },
            ],
          };
        }
        return post;
      });

      setPosts(updatedPosts);
      setCommentInput(''); // Clear comment input

      // Send the comment to the server
      try {
        await axios
          .post(`http://192.168.1.116:3001/comment`, {
            news_id: postId,
            user_id: userId,
            comment_text: commentInput,
          })
          .then(response => {
            getNewPosts();
            console.log('Comment added successfully.');
          });
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  // Toggle comment section visibility
  const toggleComments = postId => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId], // Toggle visibility of comments for this post
    }));
  };

  // Toggle menu visibility
  const toggleMenu = postId => {
    setShowMenu(prev => (prev === postId ? null : postId)); // Toggle the menu for the selected post
  };

  // Function to handle saving a new post
  const handleSave = () => {
    setNewsType('2');
    const db = SQLite.openDatabase({name: 'mydb.db', location: 'default'});
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM users', [], (tx, results) => {
        const rows = results.rows;
        for (let i = 0; i < rows.length; i++) {
          const userIds = rows.item(i).user_id;
          setUserId(userIds);
        }
      });
    });

    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('news_title', newsTitle);
    formData.append('long_description', longDescription);
    formData.append('news_type', 'IMAGE');
    if (newsImage) {
      formData.append('news_image', {
        uri: newsImage,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
    }

    axios
      .post('http://192.168.1.116:3001/addnewNews', formData, {
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
    Alert.alert('Select Image', 'Choose an option', [
      {text: 'Camera', onPress: () => openCamera()},
      {text: 'Gallery', onPress: () => openGallery()},
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
    })
      .then(image => {
        setNewsImage(image.path);
      })
      .catch(error => {
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
    })
      .then(image => {
        setNewsImage(image.path);
      })
      .catch(error => {
        console.log('Camera Error: ', error);
      });
  };

  const removeImage = () => {
    setNewsImage(null);
  };

  if (isAddingPost) {
    return (
        <View style={styles.container}>
  <HeaderComponent user_profileImage={user_profileImage} />
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>Community</Text>
  </View>

  {/* ScrollView added with contentContainerStyle to manage inner layout */}
  <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <Text style={styles.addNew}>Add New Post</Text>

    <TextInput
      style={styles.inputTitle}
      placeholder="Post Title"
      value={newsTitle}
      onChangeText={setNewsTitle}
      placeholderTextColor="#888"
    />

    <TextInput
      style={styles.inputDescription}
      placeholder="Write Something... "
      value={longDescription}
      onChangeText={setLongDescription}
      placeholderTextColor="#888"
      multiline={true}
      numberOfLines={4}
    />

    <TouchableOpacity style={styles.imageButton} onPress={handleImagePicker}>
      <Text style={styles.imageButtonText}>
        {newsImage ? 'Image Selected' : 'Select Image'}
      </Text>
    </TouchableOpacity>

    {newsImage && (
      <View style={styles.imageContainer}>
        <Image source={{ uri: newsImage }} style={styles.selectedImage} />
        <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
          <Text style={styles.removeButtonText}>Remove Image</Text>
        </TouchableOpacity>
      </View>
    )}
    {/* Buttons for cancelling and saving the post */}
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.buttonCancel}
        onPress={() => setIsAddingPost(false)}
      >
        <Text style={styles.buttonCancelText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSave} onPress={handleSave}>
        <Text style={styles.buttonSaveText}>Post</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>

  {/* Bottom navigation added */}
  <BottomNavigation />
</View>

      );
  }

  return (
    <View style={styles.container}>
      <HeaderComponent user_profileImage={user_profileImage} />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Community</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {posts?.map((post, index) => (
          <View key={index} style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Image
                source={{uri: 'http://192.168.1.116:3001/' + post.user_img}}
                style={styles.profileImage}
              />
              <View style={styles.userInfo}>
                <Text style={styles.username}>{post.user_names}</Text>
                <Text style={styles.postDate}>{post.time_stamp}</Text>
              </View>

              {/* Three-Dot Menu for Post Deletion */}
              {post.user_id === userId && (
                <TouchableOpacity onPress={() => toggleMenu(post.news_id)}>
                  <Icon name="ellipsis-v" size={24} color="gray" />
                </TouchableOpacity>
              )}

              {/* Show Menu Options if Menu is Toggled */}
              {showMenu === post.news_id && (
                <View style={styles.menuContainer}>
                  <TouchableOpacity
                    style={styles.menuOption}
                    onPress={() => handleDelete(post.news_id)}>
                    <Text style={styles.menuTextRed}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <Text style={styles.posttitle}>{post.news_title}</Text>
            <Text style={styles.postDescription}>{post.long_description}</Text>
            {post.news_image && (
              <Image
                source={{uri: 'http://192.168.1.116:3001/' + post.news_image}}
                style={styles.postImage}
              />
            )}

            {/* Like and Comment Section */}
            <View style={styles.actionsContainer}>
              {/* Like Button and Like Count */}
              <TouchableOpacity
                style={styles.likeButton}
                onPress={() => {
                  post.likes.some(like => like.user_id === userId)
                    ? handleLike(post.news_id, 'dislike')
                    : handleLike(post.news_id, 'like');
                }}>
                <Icon
                  name={
                    post.likes.some(like => like.user_id === userId)
                      ? 'heart'
                      : 'heart-o'
                  }
                  size={24}
                  color={
                    post.likes.some(like => like.user_id === userId)
                      ? 'red'
                      : 'gray'
                  }
                />
                <Text>{post.likes.length} Likes</Text>
              </TouchableOpacity>

              {/* Comment Button */}
              <TouchableOpacity
                style={styles.commentIcon}
                onPress={() => toggleComments(post.news_id)}>
                <Icon name="comment-o" size={24} color="gray" />
                <Text>{post.comments.length} Comments</Text>
              </TouchableOpacity>
            </View>

            {/* Show Comments Section */}
            {showComments[post.news_id] && (
              <View style={styles.commentSection}>
                {post.comments.map((comment, idx) => (
                  <View key={idx} style={styles.commentContainer}>
                    <Text style={styles.commentTextDisplay}>
                      - {comment.comment_text}
                    </Text>
                  </View>
                ))}
                <TextInput
                  style={styles.commentInput}
                  placeholder="Add a comment..."
                  value={commentInput}
                  onChangeText={setCommentInput}
                />
                <TouchableOpacity
                  style={styles.commentButton}
                  onPress={() => handleAddComment(post.news_id)}>
                  <Text style={styles.commentText}>Post Comment</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <BottomNavigation user_profileImage={user_profileImage} />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setIsAddingPost(true)}>
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
  scrollViewContent: {
    paddingBottom: 80, // To ensure padding between content and bottom navigation
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
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentSection: {
    marginTop: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  commentButton: {
    backgroundColor: '#3B9AB2',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  commentText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  commentContainer: {
    paddingVertical: 5,
  },
  commentTextDisplay: {
    color: '#000',
    fontSize: 14,
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
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom:20

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
    marginBottom: 150,
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
  menuContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    right: 0,
    top: 30,
    elevation: 3,
    zIndex: 999,
  },
  menuOption: {
    paddingVertical: 5,
  },
  menuTextRed: {
    color: 'red',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: 20,
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#3B9AB2',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  addNew: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B9AB2',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputTitle: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  inputDescription: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    textAlignVertical: 'top', // For multiline input
  },
  imageButton: {
    backgroundColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  imageButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom:20
  },
  buttonCancel: {
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  buttonCancelText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonSave: {
    backgroundColor: '#3B9AB2',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonSaveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;

