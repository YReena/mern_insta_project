import React, { useState, useEffect } from 'react';
import { Grid, Container, Grow, Paper, AppBar, TextField, Button } from '@mui/material';
import Styles from '../Form/styles';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Pagination from '../Posts/pagination';
import { useNavigation, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import style from './styles';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const navigate = useNavigation
  const classes = style();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState('');
  const query = useQuery();

  const page = query.get('page');
  const searchQuery = query.get('searchQuery');

  const handleKeyPress = (e) => {
    // if(e.keyCode === 13){
    //    searchPost();
    // }
  }
  // const handleAdd = () => {
  //   // e.preventDefault();
  //   console.log("chioppp");
  //   //  setTags([...tags,e.target.value]);
  // }
  const handleDelete = (tagTodelete) => {
    setTags(tags.filter((tag) => tag !== tagTodelete));
  }

  const searchPost = () => {
    console.log("reeba");
    console.log(tags);
    if (search.trim() || tags) {
      console.log({ search, tags: tags.join(',') });
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
    }
    else {
      navigate("/");
    }

  }
  useEffect(() => {
    dispatch(getPosts())
  }, [currentId, dispatch])
  return (<>
    <Grow in>
      <Container maxWidth="xl">
        <Grid className={classes.gridContainer} container justify-content="space-between" alignItems='stretch' spacing={3} >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position='static' color='inherit' >
              <TextField name="search" variant='outlined' label="Search Memories" fullWidth value={search} onKeyPress={handleKeyPress} onChange={(e) => { setSearch(e.target.value) }} />
              {/* <ChipInput style={{margin:'10px 0px'}}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"/> */}
              <ChipInput
                style={{ margin: '10px 0px' }}
                value={tags}
                onAdd={(tag) => {
                  setTags([...tags, tag])
                }}
                onDelete={(tagTodelete) => {
                  setTags(tags.filter((tag) => tag !== tagTodelete))
                }}
                label="Search Tags"
              />
              <Button onClick={searchPost} className={classes.searchButton} color="primary" variant='contained'> Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}

          </Grid>
        </Grid>
      </Container>
    </Grow>
  </>)
}

export default Home;