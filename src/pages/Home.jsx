import React from 'react'
import Navbar from '../components/Navbar'
import PokemonList from '../components/PokemonList'

export default function Home() {
  return (
    <React.Fragment>
        <Navbar/>
        <div className='container'>
            <PokemonList/>
        </div>
    </React.Fragment>
  )
}
