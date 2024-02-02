import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div>
        <main>
    <section class="hero">
      <div class="hero-content">
        <h1>
          <span id="text-animation">Welcome to the <span>Tasks Management System</span></span>
        </h1>
        <h5>Efficiently manage your Student Projects</h5><br/>
        <Link to="/login" className='btn-pri'>Get Started</Link>
      </div>
    </section>
    
  </main>  
  <footer>
    <p>&copy; 2023 Projects Management System. All rights reserved.</p>
  </footer>
    </div>
  );
};


export default Home
