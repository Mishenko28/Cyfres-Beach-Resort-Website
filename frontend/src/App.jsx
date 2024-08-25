import { Navigate, Route, Routes } from 'react-router-dom'
import { useGlobalContext } from './hooks/useGlobalContext'

import LoginAndSignup from './pages/LoginAndSignup'

import Home from './pages/Home'
import Accommodations from './pages/Accommodations'
import Booking from './pages/Booking'
import Amenities from './pages/Amenities'
import Gallery from './pages/Gallery'
import AboutUs from './pages/AboutUs'
import Settings from './pages/Settings'
import Cart from './pages/Cart'

import PersonalDetails from './pages/settingsPages/PersonalDetails'
import Account from './pages/settingsPages/Account'

import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'

function App() {
    const { state } = useGlobalContext()
    const [cartNum, setCartNum] = useState(0)


    useEffect(() => {
        if (state.user) {
            const fetchAllBook = async () => {
                const response = await fetch(`${state.uri}/book/get?_id=${state.user._id}`, {
                    headers: {
                        'Authorization': `Bearer ${state.user.token}`
                    }
                })

                const json = await response.json()
                setCartNum(json.books.length)
            }
            fetchAllBook()
        }
    }, [state.user])

    return (
        <Routes>
            <Route path='/' element={<Navbar cartNum={cartNum} />}>
                <Route index element={<Home />} />
                <Route path='booking' element={<Booking setCartNum={setCartNum} />} />
                <Route path='accommodations' element={<Accommodations />} />
                <Route path='amenities' element={<Amenities />} />
                <Route path='gallery' element={<Gallery />} />
                <Route path='about-us' element={<AboutUs />} />
                <Route path='cart' element={<Cart setCartNum={setCartNum} />} />
                {state.user &&
                    <Route path='settings' element={<Settings />}>
                        <Route path='personal-details' element={<PersonalDetails />} />
                        <Route path='account' element={<Account />} />
                    </Route>
                }
                {!state.user &&
                    <>
                        <Route path='login' element={<LoginAndSignup type='login' />} />
                        <Route path='signup' element={<LoginAndSignup type='signup' />} />
                    </>
                }
                <Route path='*' element={<Navigate to='/' />} />
            </Route>
        </Routes>
    )
}

export default App