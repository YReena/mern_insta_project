import React,{useState, useEffect} from 'react';
import { Grid, Container,Grow , Paper, AppBar, TextField} from '@mui/material';
import Styles from '../Form/styles';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch ,useSelector} from 'react-redux';
import { getPosts } from '../../actions/posts';
import Pagination from '../Posts/pagination';
import { Navigate, useLocation } from 'react-router-dom';
import {ChipInput} from 'material-ui-chip-input';
import style from './styles';

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const Home = ()=>{
    const classes = style();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);
    const [search , setSearch] = useState('');
    const query = useQuery();

    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const handleKeyPress= ()=>{
      if(e.keyCode === 13){
        //search
      }
    }
  
    useEffect(() => {
      dispatch(getPosts())
    }, [currentId ,dispatch])
    return(<>
     <Grow in>
          <Container maxWidth="xl">
            <Grid className={classes.gridContainer} container justify-content="space-between" alignItems='stretch' spacing={3} >
              <Grid item xs={12} sm={6} md={9}>
                <Posts setCurrentId={setCurrentId}/>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position='static' color='inherit' fullWidth value={search} onKeyPress={handleKeyPress} onChange={(e)=>{setSearch(e.target.value)}}>
                <ChipInput style={{margin:'10px 0px'}}
                value={tags}
                onAdd={()=>{}}
                onDelete={()=>{}}
                label="Search Tags"
                variant="outlined"/>
                <TextField name="search" variant='outlined' label="Search Memories"/>
              </AppBar>
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
                <Paper className={classes.pagination} elevation={6}>
                  <Pagination/>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Grow>
    </>)
}

export default Home;