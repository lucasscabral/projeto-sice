import { useState } from 'react'
import IndexHeader from './components/header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import IndexStock from './components/stock/indexStock'
import Notiflix from 'notiflix'
import IndexBox from './components/box/indexBox'
import IndexSingIn from './components/auth/singin/indexSingIn'
import IndexAuth from './components/auth/indexAuth'
import IndexSingnUp from './components/auth/singup/indexSingUp'
import IndexHome from './components/home/indexHome'


function App() {

  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<IndexAuth> <IndexSingIn /></IndexAuth>} />
          <Route path='/singnUp' element={<IndexAuth><IndexSingnUp /></IndexAuth>} />
          <Route path='/home' element={<IndexHeader><IndexHome /></IndexHeader>} />
          <Route path='/caixa' element={<IndexHeader> <IndexBox /></IndexHeader>} />
          <Route path='/estoque' element={<IndexHeader><IndexStock /></IndexHeader>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

Notiflix.Notify.init({
  width: '280px',
  position: 'right-bottom',
  distance: '10px',
  opacity: 1,
  borderRadius: '5px',
  rtl: false,
  timeout: 3000,
  messageMaxLength: 110,
  backOverlay: false,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  plainText: true,
  showOnlyTheLastOne: false,
  clickToClose: false,
  pauseOnHover: true,
  ID: 'NotiflixNotify',
  className: 'notiflix-notify',
  zindex: 4001,
  fontFamily: 'Quicksand',
  fontSize: '13px',
  cssAnimation: true,
  cssAnimationDuration: 400,
  cssAnimationStyle: 'fade',
  closeButton: false,
  useIcon: true,
  useFontAwesome: false,
  fontAwesomeIconStyle: 'basic',
  fontAwesomeIconSize: '34px',
  success: {
    background: '#32c682',
    textColor: '#fff',
    childClassName: 'notiflix-notify-success',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-check-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(50,198,130,0.2)',
  },
  failure: {
    background: '#ff5549',
    textColor: '#fff',
    childClassName: 'notiflix-notify-failure',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-times-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(255,85,73,0.2)',
  }
});


export default App
