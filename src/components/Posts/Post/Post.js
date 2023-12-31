import React, { useEffect } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@mui/material';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import Style from './styles'
import { ThumbUpAltOutlined } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
const Post = ({ post, setCurrentId }) => {
    const navigate = useNavigate();
    const classes = Style();
    const dispatch = useDispatch();
    console.log(post);
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (<> <ThumbUpAltIcon fontSize="small" /> {post.likes.length === 2 ? ` you and ${post.likes.length - 1}` : `${post.likes.length} like ${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" /> {post.likes.length === 1 ? 'Like' : 'Likes'}</>);
        }
        return <> <ThumbUpAltOutlined fontSize="small" /> Like </>;
    }

    const openPost = ()=>{
      navigate(`/posts/${post._id}`);
    }
    return (<>
        <Card className={classes.card} raised elevation={6}>
            {/* <ButtonBase className={classes.cardAction} onClick={openPost}> */}
            <CardMedia className={classes.media}
                image={post.selectedFile} title={post.title}
                alt="GFG Logo" />
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.name}</Typography>
                <Typography variant='body2'>{moment(post.CreatedAt).fromNow()}</Typography>
            </div>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <div className={classes.overlay2}>
                <Button style={{ color: "white" }} size="small" onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="default" color='black' />
                </Button>
            </div>)}
            <div className={classes.details}>
                <Typography variant='body2' color="textSecondary">{post.tags.map((tag) => `#${tag}`)}</Typography>
            </div>
            <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography className={classes.title} variant='body2' component="p">{post.message}</Typography>
            </CardContent>
            {/* </ButtonBase> */}
            <CardActions className={classes.cardActions}>
                <Button size="small" color='primary' disabled={!user?.result}
                    onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
                    (<Button size="small" color='primary' onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                    )}


            </CardActions>

        </Card>
    </>)
}

export default Post;
