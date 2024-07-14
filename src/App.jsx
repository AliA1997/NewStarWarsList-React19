import { useState, Suspense } from 'react';
import UserForm from './UserForm'
import StarWarsList from './StarWarsList';
import './App.css'

function App() {
//In order to prevent performance when dealing with the use hook, hoist your promise via state, and pass it as props
  const [starWarsPromise] = useState(() => fetch('https://swapi.dev/api/people').then(res => res.json()));
  return (
    <>
      <div className="card">
        <UserForm />
      </div>
      <section>
        <Suspense fallback={<h1>Loading...</h1>}>
          <StarWarsList starWarsPromise={starWarsPromise} />
        </Suspense>
      </section>
    </>
  )
}

export default App
