import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Container } from '@mui/material';
import FileBase64 from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import Styles from './styles';

const Form = ({ currentId, setCurrentId }) => {
    const classes = Styles();
    const user = JSON.parse(localStorage.getItem('profile'));

    const [postData, setPostData] = useState({title: '', message: '', tags: '', selectedFile: '' });
    const dispatch = useDispatch();
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId,{...postData, name: user?.result.name}));
        } else {
            dispatch(createPost({...postData, name: user?.result.name}));
        }
        clear();
    }
  

    const clear = () => {
        setCurrentId(null);
        setPostData({title: '', message: '', tags: '', selectedFile: '' });
    }
    useEffect(() => {
        if (post)
            setPostData(post);
    }, [post])

    if(!user?.result.name){
        return(<Paper className={classes.paper}>
            <Typography variant="h6" align='center'>
                Please Sign In to create your own memories and like other's memories.
            </Typography>

        </Paper>)
    }

    return (<>
        <Paper className={classes.paper}>
            <form className={classes.form} autoComplete='off' noValidate onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? "Editing" : "Creating"} a Memory</Typography>
                {/* <TextField name='creator' variant='outlined' label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} /> */}
                <TextField name='title' variant='outlined' label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name='message' variant='outlined' label="message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name='tags' variant='outlined' label="tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}>
                    <FileBase64 type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
                <Button className={classes.buttonSubmit} variant="container" size="large" type="submit" fullWidth>Submit</Button>
                <Button className={classes.buttonSubmit} variant="contained" size="small" onClick={clear} fullWidth>Clear</Button>

            </form>
        </Paper>
    </>)
}

export default Form;
