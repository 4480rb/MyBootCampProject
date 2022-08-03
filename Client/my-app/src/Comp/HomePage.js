import { Routes, Route } from 'react-router-dom'
import LogInComp from './LogIn'
import MenuComp from './Menu'
import MoviesPageComp from './MoviesPage'
import AllMoviesComp from './AllMovies'
import AddMovieComp from './AddMovie'
import SubscriptionsComp from './SubscriptionsPage'
import AllMembersComp from './AllMembers'
import AddMemberComp from './AddMembers'
export default function HomePageComp() {
   return <div>
        <h1>Movies-Subscriptions Web-Site</h1>
        <Routes>
            <Route path='/menu' element={<MenuComp />} >
                <Route path='moviepage' element={<MoviesPageComp />} >
                    <Route path='allmovies' element={<AllMoviesComp />} />
                    <Route path='addmovie' element={<AddMovieComp />} />
                </Route>
                <Route path='subscriptionpage' element={<SubscriptionsComp />} >
                    <Route path='allmembers' element={<AllMembersComp />} />
                    <Route path='addmembers' element={<AddMemberComp />} />
                </Route>
            </Route>
            <Route path='/' element={<LogInComp />} />

        </Routes>

    </div>
}