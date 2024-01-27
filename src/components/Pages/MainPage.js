import React from 'react'
import AddMovie from '../AddMovie'
import '../../App.css'

const MainPage = (props) => {
  return (
    <React.Fragment>
    <section>
     <AddMovie onAddMovie={props.onAddMovie} />
    </section>
    <section>
    <button onClick={props.onClick}>Fetch Movies</button>
  </section>
  <section>{props.content}</section>
  </React.Fragment>
  )
}

export default MainPage
