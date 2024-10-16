// server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.use(cors()); // This allows all origins by default

app.use(cors({
    origin: '*' // Adjust this to your needs
  }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

//cors 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
       res.sendStatus(200);
     }
     else {
       next();
     }});

     //code related to image uploads starts here
// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// CRUD Operations for Users

// Create a new user    
app.post('/users', async (req, res) => {
    const { user_name , user_email , user_password} = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)',
            [ user_name, user_email, user_password]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User Login
app.post('/login', async (req, res) => {
    const {user_email, user_password} = req.body;
    try {
        const [result] = await db.execute(
            'SELECT user_id , user_name , user_profile_pic, user_emergency_contact_number  FROM users WHERE user_email = ? AND user_password = ?',
            [ user_email, user_password]
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get specific user
app.get('/user-info', async (req, res) => {
    const { user_id } = req.query; // Extract user_id from query string
    try {
        const [result] = await db.execute(
            'SELECT user_profile_pic, user_emergency_contact_number FROM users WHERE user_id = ?',
            [user_id]
        );

        if (result.length > 0) {
            res.status(200).json(result[0]); // Return the first result
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read all users
app.get('/users', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM users');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Read user Profile By User_id
app.get('/profilebyid/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM users  WHERE user_id = ?', [user_id]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a user Profile by user_id
app.put('/updateusersprofile', async (req, res) => {
    const {user_id , user_university_name, user_student_id,user_profile_pic, user_mobile_number, user_academic_program } = req.body;
    try {
        await db.execute(
            'UPDATE users SET user_university_name = ?, user_student_id = ?,user_profile_pic = ? , user_mobile_number = ?, user_academic_program = ?  WHERE user_id = ?',
            [user_university_name, user_student_id,user_profile_pic , user_mobile_number, user_academic_program , user_id]
        );
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a user Profile Emergency Contact Details by user_id
app.put('/updateusersprofileemergencycontact', async (req, res) => {
    const {user_id , user_emergency_contact_name, user_emergency_contact_relationship, user_emergency_contact_number } = req.body;
    try {
        await db.execute(
            'UPDATE users SET user_emergency_contact_name = ?, user_emergency_contact_relationship = ?, user_emergency_contact_number = ? WHERE user_id = ?',
            [user_emergency_contact_name, user_emergency_contact_relationship, user_emergency_contact_number, user_id]
        );
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a user Profile Medical Details by user_id
app.put('/updateusersprofilemedicaldetails', async (req, res) => {
    const {user_id , user_blood_group, user_medical_condition, user_special_requirement } = req.body;
    try {
        await db.execute(
            'UPDATE users SET user_blood_group = ?, user_medical_condition = ?, user_special_requirement = ? WHERE user_id = ?',
            [user_blood_group, user_medical_condition, user_special_requirement, user_id]
        );
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Alerts
// Create a new SOS and Medical Emergency alert
app.post('/newsosalert', async (req, res) => {
    const { user_id, incident_mode, description, latitude ,longitude } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO securityalerts (user_id, incident_mode, description, latitude ,longitude) VALUES ( ?, ?, ?, ? ,?)',
            [user_id, incident_mode, description, latitude ,longitude]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new Report Incident alert
app.post('/newreportincidentalert', upload.array('images'), async (req, res) => {
    const { user_id, incident_mode, description, lattitude ,longitude ,alert_date_time } = req.body;
    const user_img = req.file ?  req.file.path : null;
    try {
        const [result] = await db.execute(
            'INSERT INTO securityalerts (user_id, incident_mode, description, latitude ,longitude ,alert_date_time ) VALUES (?, ?, ? ,?,? ,? )',
            [user_id, incident_mode, description, lattitude ,longitude ,alert_date_time]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read  security alerts By User Id/


app.get('/MyIncidents/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const [rows] = await db.execute('SELECT securityalerts.* , users.user_id , users.user_name FROM securityalerts  INNER JOIN users ON securityalerts.user_id = users.user_id WHERE securityalerts.user_id = ?', [user_id]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Safe Zones
app.get('/safe-zones', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM safe_zones');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//News or Community Post
// app.get('/newsposts', async (req, res) => {
//     try {
//         const [rows] = await db.execute('SELECT * FROM news ');
//         res.status(200).json(rows);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
app.get('/newsposts', async (req, res) => {
    try {
        // Modified query to join news and users tables
        const [rows] = await db.execute(`
           SELECT news.*, users.user_name AS user_names, users.user_profile_pic AS user_img FROM news INNER JOIN users ON news.user_id = users.user_id;
        `);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Create a new News Post
app.post('/addnewNews',upload.single('news_image'), async (req, res) => {
    const { user_id, news_title, news_image,long_description,news_type } = req.body;
    const user_img = req.file ?  req.file.path : null;

    try {
        const [result] = await db.execute(
            'INSERT INTO  news( user_id ,news_title, news_image, long_description ,news_type) VALUES (?,?,?,?,?)',[user_id,news_title,user_img,long_description ,news_type]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 


// students alerts by id


app.get('/students/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM `users` INNER JOIN securityalerts ON users.user_id=securityalerts.user_id LEFT JOIN admin_users ON securityalerts.assigned_to=admin_users.user_id WHERE users.user_id=?;', [user_id]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




//Add new updateimage user
app.post('/updatedatabyimage', upload.single('user_profile_pic'), async (req, res) => {
    const { user_university_name, user_student_id, user_mobile_number, user_academic_program ,user_id}= req.body;
    const user_img = req.file ? req.file.path : null;
    console.log('Request Body:', req.body);  // Log the request body
    console.log('Uploaded File:', req.file);  // Log the file information
    try {
        const [result] = await db.execute(
'UPDATE users SET user_university_name = ?, user_student_id = ?,user_profile_pic = ? , user_mobile_number = ?, user_academic_program = ?  WHERE user_id = ?;',
            [user_university_name, user_student_id,user_img , user_mobile_number, user_academic_program , user_id]        );
        res.status(201).json({ id: result.insertId, message: 'Safe zone added successfully!' });
        console.log('Insert Result:', result); 
    } catch (error) {
        console.error('Error:', error.message);  // Log the error message
        res.status(500).json({ error: error.message });
    }
});





//#########################################################################################################################################

//Admin users related apis starts from here

//Security registration updating resgistration fields.
app.post('/registersecurityusers', async (req, res) => {
    const { first_name, last_name, user_role, user_email_id, user_password_hashcode } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO admin_users (first_name,last_name, user_role, user_email_id, user_password_hashcode) VALUES ( ?, ? ,? , ?, ?)',
            [first_name, last_name, user_role, user_email_id, user_password_hashcode]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin User Login
app.post('/admin-login', async (req, res) => {
    const { user_email_id, user_password_hashcode } = req.body;
    try {
        const [result] = await db.execute(
            'SELECT user_id , user_name FROM admin_users WHERE user_email_id = ? AND user_password_hashcode = ?',
            [user_email_id, user_password_hashcode]
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read all admin users
app.get('/admin-users', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM admin_users');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a admin User Details By user ID
app.put('/admin-users/profile-details/:id', async (req, res) => {
    const { id } = req.params;
    const {first_name,last_name, user_contact_number, user_email_id,  user_university_name ,employ_id} = req.body;
    try {
        await db.execute('UPDATE admin_users SET first_name=? , last_name=? ,user_contact_number = ? ,user_email_id=?,  user_university_name=?, employ_id=? WHERE user_id= ?', 
           [first_name, last_name,user_contact_number, user_email_id,  user_university_name, employ_id,id]
        );
        res.status(200).json({ message: 'update success'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Read a single admin user by ID
app.get('/admin-users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM admin_users WHERE user_id = ?', [id]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(200).json(rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//...............News ...............................................................

// Create a new News Post
app.post('/add-news',  upload.single('news_image'),async (req, res) => {
    const { user_id, news_title, short_description, long_description, user_name } = req.body;
    const news_image = req.file ?  req.file.path : null;
    try {
        const [result] = await db.execute(
            'INSERT INTO  news( user_id,user_name, news_image, news_title, short_description,long_description) VALUES (?,?,?,?,?,?)', [user_id, user_name, news_image, news_title, short_description, long_description]

        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Create a new News poll
app.post('/add-news-poll', async (req, res) => {
    const { user_id, news_title, news_image, short_description, long_description, user_name, news_type, poll_data } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO  news( user_id,news_type,poll_data,user_name, news_image, news_title, short_description,long_description) VALUES (?,?,?,?,?,?,?,?)', [user_id, news_type, poll_data, user_name, news_image, news_title, short_description, long_description]

        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read all News-posts
// app.get('/news', async (req, res) => {
//     try {
//         const [rows] = await db.execute(`
//            SELECT news.*, users.user_name AS user_names, users.user_profile_pic AS user_img FROM news INNER JOIN users ON news.user_id = users.user_id;
//         `);
//         res.status(200).json(rows);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// Add likes and comments to news
function formatDateTime(dateString) {
    const options = { 
        day: 'numeric', 
        month: 'long', 
        year: '2-digit', 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true 
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

app.get('/news', async (req, res) => {
    try {
        const [news] = await db.execute(`
            SELECT news.*, users.user_name AS user_names, users.user_profile_pic AS user_img 
            FROM news 
            INNER JOIN users ON news.user_id = users.user_id
        `);

        // Fetch likes and comments details separately
        const [likes] = await db.execute(`
            SELECT l.news_id, l.user_id, u.user_name, u.user_profile_pic AS user_img, l.liked_at 
            FROM likes l 
            INNER JOIN users u ON l.user_id = u.user_id
        `);

        const [comments] = await db.execute(`
            SELECT c.news_id, c.user_id, c.comment_id, u.user_name, u.user_profile_pic AS user_img, c.comment_text, c.commented_at 
            FROM comments c 
            INNER JOIN users u ON c.user_id = u.user_id
            ORDER BY c.commented_at DESC
        `);

        // Map the likes and comments to each news item
        const newsWithEngagement = news.map(newsItem => {
            const newsLikes = likes
                .filter(like => like.news_id === newsItem.news_id)
                .map(like => ({
                    user_id: like.user_id,
                    user_name: like.user_name,
                    user_img: like.user_img,
                    time: formatDateTime(like.liked_at) // Format the like time
                }));

            const newsComments = comments
                .filter(comment => comment.news_id === newsItem.news_id)
                .map(comment => ({
                    user_id: comment.user_id,
                    user_name: comment.user_name,
                    user_img: comment.user_img,
                    comment_text: comment.comment_text,
                    time: formatDateTime(comment.commented_at) // Format the comment time
                }));

            return {
                ...newsItem,
                likes: newsLikes,
                comments: newsComments
            };
        });

        res.status(200).json(newsWithEngagement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Like a news post
app.post('/like', async (req, res) => {
    const { user_id, news_id } = req.body;
    try {
        const [rows] = await db.execute(
            'SELECT * FROM likes WHERE user_id = ? AND news_id = ?',
            [user_id, news_id]
        );

        if (rows.length > 0) {
            return res.status(400).json({ message: 'User has already liked this post.' });
        }

        // Insert like into the table
        await db.execute('INSERT INTO likes (user_id, news_id) VALUES (?, ?)', [user_id, news_id]);
        res.json({ message: 'News post liked successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Dislike (unlike) a news post
app.post('/dislike', async (req, res) => {
    const { user_id, news_id } = req.body;
    console.log("I am here >>>>>>>",  {user_id, news_id});
    try {
        // Check if the like exists
        const [rows] = await db.execute(
            'SELECT * FROM likes WHERE user_id = ? AND news_id = ?',
            [user_id, news_id]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: 'User has not liked this post.' });
        }

        // Delete the like from the table
        await db.execute('DELETE FROM likes WHERE user_id = ? AND news_id = ?', [user_id, news_id]);
        res.json({ message: 'News post unliked successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add a comment to a news post
app.post('/comment', async (req, res) => {
    const { user_id, news_id, comment_text } = req.body;

    // Ensure all required fields are present
    if (!user_id || !news_id || !comment_text) {
        return res.status(400).json({ message: 'user_id, news_id, and comment_text are required.' });
    }

    try {
        // Insert the comment into the table
        const query = `INSERT INTO comments (user_id, news_id, comment_text, commented_at)
                       VALUES (?, ?, ?, CURRENT_TIMESTAMP)`;
        await db.execute(query, [user_id, news_id, comment_text]);

        res.json({ message: 'Comment added successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Read News by user id
app.get('/profile/news/:userid', async (req, res) => {
    const { userid } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM news WHERE user_id = ?', [userid]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'News Data not found' });
        } else {
            res.status(200).json(rows);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read a single News by ID
app.get('/news/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM news WHERE news_id  = ?', [id]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'Security alert not found' });
        } else {
            res.status(200).json(rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read a single News by ID
app.get('/newscheck/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute(`SELECT * FROM news WHERE news_id  = ${id}`);
        if (rows.length === 0) {
            res.status(404).json({ error: 'Security alert not found' });
        } else {
            res.status(200).json(rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a News Post by ID
app.put('/news/:id', async (req, res) => {
    const { id } = req.params;
    const { user_id, news_title, news_image, news_description } = req.body;
    try {
        await db.execute(
            'UPDATE news SET  news_image = ?, news_title = ?, news_description = ?, WHERE news_id = ? and user_id=?',
            [news_image, news_title, news_description, id, user_id]
        );
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Update a News Polling Post by ID
app.put('/news-poll/:id', async (req, res) => {
    const { id } = req.params;
    const { news_type, poll_data, users_engaged } = req.body;
    try {
        await db.execute(
            'UPDATE news SET poll_data=?, users_engaged=? WHERE news_id = ? and news_type=?',
            [poll_data, users_engaged, id, news_type]
        );
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a News by ID
app.delete('/delete-news/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM news WHERE news_id = ?', [id]);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




//.............SAFE ZONES..........................

//Add new safe-Zone
app.post('/add-newsafezone', upload.single('zone_img'), async (req, res) => {
    const { zone_name, number_of_incidents, note, safe_times, danger_time } = req.body;
    const zone_img = req.file ? req.file.path : null;
    console.log('Request Body:', req.body);  // Log the request body
    console.log('Uploaded File:', req.file);  // Log the file information
    try {
        const [result] = await db.execute(
            'INSERT INTO safe_zones (zone_name, zone_img, number_of_incidents, note, safe_times, danger_time, last_updated) VALUES (?, ?, ?, ?, ?, ?, NOW())',
            [zone_name, zone_img, number_of_incidents, note, safe_times, danger_time]
        );
        res.status(201).json({ id: result.insertId, message: 'Safe zone added successfully!' });
        console.log('Insert Result:', result); 
    } catch (error) {
        console.error('Error:', error.message);  // Log the error message
        res.status(500).json({ error: error.message });
    }
});

//get safe zone details by safezobe id
app.get('/safe-zones/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM safe_zones WHERE zone_id=?', [id]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//zone delete
app.delete('/safe-zones/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM safe_zones WHERE zone_id = ?', [id]);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//update safe zones
app.put('/safe-zones/:id', upload.single('zone_img'), async (req, res) => {
    const { id } = req.params;
    const { zone_name, number_of_incidents, note, safe_times, danger_time,zone_img } = req.body;
    const zone_img1 = req.file ? req.file.path : zone_img;

    try {
        await db.execute(
            'UPDATE safe_zones SET zone_name = ?, zone_img = ?, number_of_incidents = ?, note = ?, safe_times = ?, danger_time = ? WHERE zone_id = ?',
            [zone_name, zone_img1, number_of_incidents, note, safe_times, danger_time, id]
        );
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//..............................Security alerts.................................


// Read all security alerts
app.get('/security-alerts', async (req, res) => {
    try {
       // const [rows] = await db.execute('SELECT sa.*, u1.*, u2.user_name AS assigned_name,u2.employ_id As assigned_employ_id , u2.user_contact_number AS assigned_contact , u2.user_university_name AS assigned_univercity FROM securityalerts sa INNER JOIN users u1 ON sa.user_id = u1.user_id  LEFT JOIN admin_users u2 ON sa.assigned_to = u2.user_id');
        //const [rows] = await db.execute('SELECT * FROM securityalerts');
          const [rows] = await db.execute('SELECT sa.*, u1.*, u2.user_name AS assigned_name, u2.first_name AS assigned_first_name,u2.last_name AS assigned_last_name,u2.employ_id As assigned_employ_id , u2.user_contact_number AS assigned_contact , u2.user_university_name AS assigned_univercity FROM securityalerts sa INNER JOIN users u1 ON sa.user_id = u1.user_id  LEFT JOIN admin_users u2 ON sa.assigned_to = u2.user_id');

     res.status(200).json(rows);
    } catch (error) {
      console.log( res.status(500).json({ error: error.message }))  
    }
});

// Read  security alerts By User id
app.get('/profile/security-alerts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT sa.*, u1.*, u2.user_name AS assigned_name ,u2.first_name AS assigned_first_name,u2.last_name AS assigned_last_name, u2.employ_id As assigned_employ_id , u2.user_contact_number AS assigned_contact , u2.user_university_name AS assigned_univercity FROM securityalerts sa INNER JOIN users u1 ON sa.user_id = u1.user_id  LEFT JOIN admin_users u2 ON sa.assigned_to = u2.user_id WHERE sa.user_id = ?', [id]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read a single security alert by ID
app.get('/security-alerts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT sa.*, u1.*, u2.user_name AS assigned_name, u2.first_name AS assigned_first_name,u2.last_name AS assigned_last_name,u2.employ_id As assigned_employ_id , u2.user_contact_number AS assigned_contact , u2.user_university_name AS assigned_univercity FROM securityalerts sa INNER JOIN users u1 ON sa.user_id = u1.user_id  LEFT JOIN admin_users u2 ON sa.assigned_to = u2.user_id  WHERE sa.alert_id = ?', [id]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'Security alert not found' });
        } else {
            res.status(200).json(rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a security alert by ID
app.put('/security-alerts/:id', async (req, res) => {
    const { id } = req.params;
    const { user_id, alert_type, description, location, status } = req.body;
    try {
        await db.execute(
            'UPDATE SecurityAlerts SET user_id = ?, alert_type = ?, description = ?, location = ?, status = ? WHERE alert_id = ?',
            [user_id, alert_type, description, location, status, id]
        );
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read security alerts by assigned ID
app.get('/security-alerts/assigned-to-me/:id', async (req, res) => {
    const {id} = req.params
    try {
        const [rows] = await db.execute('SELECT sa.*, u1.*, u2.user_name AS assigned_name,u2.first_name AS assigned_first_name,u2.last_name AS assigned_last_name,u2.employ_id As assigned_employ_id , u2.user_contact_number AS assigned_contact , u2.user_university_name AS assigned_univercity FROM securityalerts sa INNER JOIN users u1 ON sa.user_id = u1.user_id  LEFT JOIN admin_users u2 ON sa.assigned_to = u2.user_id where sa.assigned_to = ?',[id]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Accept  a security alert by ID
app.put('/accept-security-alerts/:id', async (req, res) => {
    const { id } = req.params;
    const { assigned_to, status } = req.body;
    try {
        await db.execute(
            'UPDATE SecurityAlerts SET assigned_to = ?, status = ? WHERE alert_id = ?',
            [assigned_to, status, id]
        );
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a security alert by ID
app.delete('/security-alerts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM SecurityAlerts WHERE alert_id = ?', [id]);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
