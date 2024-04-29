import React from 'react'
import { NavLink } from 'react-router-dom'
import { FilterList } from '@mui/icons-material';
import './Header2.css';


 function Header2() {
  return (
    <div className="main" style={{ marginTop: '70px', width: "auto" }}>
  <div className="main-container">
    <div className="main-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ margin: '0', marginRight: 'auto' }}>All Questions</h2>
      <NavLink to="/editor">
      <button className="btn btn-primary custom-btn "style={{marginRight:"20px"}}>Get Started</button>
      </NavLink>
    </div>
    <div className="main-desc">
  <p>Questions</p>
  <div className="main-filter">
    <div className="main-tabs">
      <NavLink to="/answered" className="main-tab" activeClassName="active-tab">
        Answered
      </NavLink>
      <NavLink to="/votes" className="main-tab" activeClassName="active-tab">
        Votes
      </NavLink>
      <NavLink to="/unanswered" className="main-tab" activeClassName="active-tab">
        Unanswered
      </NavLink>
    </div>
  </div>
</div>

  </div>
</div>

  )
}
export default Header2;