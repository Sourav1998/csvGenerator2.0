const express = require('express');
const app = express();
const axios = require('axios'); //for making HTTP requests
const fs = require('fs'); //for file handling
const path = require('path'); //for managing file path
const { Parser } = require('json2csv'); //for converting JSON data to CSV
const { log } = require('console');
const PORT = 8080;

const API_USERS = 'https://jsonplaceholder.typicode.com/users';
const API_POSTS = 'https://jsonplaceholder.typicode.com/posts';
const API_COMMENTS = 'https://jsonplaceholder.typicode.com/comments';

app.get('/generate-csv', async (req, res) => {
    try {
        // Fetch data from APIs in parallel
        const [usersRes, postsRes, commentsRes] = await Promise.all([
            axios.get(API_USERS).catch(err => { throw new Error('Failed to fetch users data'); }),
                        axios.get(API_POSTS).catch(err => { throw new Error('Failed to fetch posts data'); }),
                        axios.get(API_COMMENTS).catch(err => { throw new Error('Failed to fetch comments data'); })
                    ]);
            
                    const users = usersRes?.data || [];
                    const posts = postsRes?.data || [];
                    const comments = commentsRes?.data || [];
        
        //console.log("User:-",users[0]);
        //console.log("Post:-",posts[0]);
        //console.log("Comment:-",comments[0]);
        
        

         // Create mapping for users and posts
         const userMap = users.reduce((acc, user) => {
            acc[user.id] = user.name; // Store user name by ID
            return acc;
        }, {});
        //console.log(userMap);
        
        const postMap = posts.reduce((acc, post) => {
            acc[post.id] = { title: post.title, userId: post.userId }; // Store post details by ID
            return acc;
        }, {});
        //console.log(postMap);
        
        // Merge data based on relationships
        const mergedData = comments.map(comment => {
            const post = postMap[comment.postId];
            if (post) {
                return {
                    name: userMap[post.userId] || 'Unknown',
                    title: post.title,
                    body: comment.body
                };
            }
        }).filter(Boolean); // Remove undefined entries
        //console.log(mergedData[20]);
        //for (let i = 0; i < 20; i++) {
            //console.log(`Element ${i + 1}:`, mergedData[i]);
        //}

        // Convert data to CSV format
        const csvData = Object.values(mergedData);
        //console.log(csvData[0]);
        const parser = new Parser({ fields: ['name', 'title', 'body'] });
        const csv = parser.parse(csvData);
        //console.log(csv);
        
        const timestamp = new Date().toISOString().replace(/[-T:]/g, '_').split('.')[0]; // To create unique csv file name based on current time stamp(Timestamp will be in GMT -- YYYY_MM_DD_HH_MM_SS) 
        //console.log(timestamp);
        const fileName = `output_${timestamp}.csv`;
        const filePath = path.join(__dirname, fileName);

        fs.writeFileSync(filePath, csv);

                console.log(filePath);
                //res.json({ filePath });
                res.send(`CSV file generated: <b>${fileName}</b><br>File Path: <code>${filePath}</code>`);

    }   catch (error) {
        console.error('Error generating CSV:', error.message);
        res.status(500).send(`
            <h3>Failed to generate CSV</h3>
            <p><b>Error:</b> ${error.message}</p>
        `);
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});