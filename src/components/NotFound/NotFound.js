import React from 'react'
import { Link } from 'react-router-dom'
import banner from '../../assets/img/png/404.png'
export default function NotFound() {
  return (
    <section className="page--not--found d-flex justify-content-center flex-column align-items-center">
      <div className="d-flex align-items-center flex-column">
        <h4>
          <span>Oops! page not found.</span>
        </h4>
        <p>
          <small>We couldn't find that page</small>
        </p>
        <Link to="" className="btn--link">
          Back to Home
        </Link>
      </div>
      <div className="banner mt-auto">
        <img src={banner} alt="404-page" />
      </div>
    </section>
  )
}
