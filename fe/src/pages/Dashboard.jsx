import { useEffect,useState } from 'react';
import MovieCard from '../components/MovieCard';
import styles from './Dashboard.module.css'
import { useOutletContext } from "react-router-dom";
import { useToast } from '@chakra-ui/react'

const Dashboard = () => {

    
    const [isLoggedIn, setIsLoggedIn, movieList, setMovieList] = useOutletContext()

    const toast = useToast()
    useEffect(()=>{
        if (isLoggedIn) toast({
            title: 'Login successful',
            description: "Feel free to search and write reviews",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          
    },[isLoggedIn])
    return ( 
        <div className={styles.mainDiv}>
        <div className={styles.container}>
            {movieList.length>0 && movieList.map(movie =>(

               <MovieCard key={movie.id}{...{movie, isLoggedIn}} />
            )
            )}
        </div>
        </div>
     );
}
 
export default Dashboard;