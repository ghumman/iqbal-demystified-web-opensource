import React from 'react';

import ReactDOM from 'react-dom'

import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
// import { Redirect } from 'react-router' 
// import {Router, Route, IndexRoute, hashHistory} from "react-router";


// import logo from './IqbalPic.jpg';
import logo from './assets/allam_iqbal_pic.jpg';
import urduBook1 from './assets/android_app_assets/book_bal_ae_jabreel_urdu_2.jpg';
import urduBook2 from './assets/android_app_assets/book_bang_ae_dara_urdu_1.jpg';
import urduBook3 from './assets/android_app_assets/book_armaghan_ae_hijaz_urdu_4.jpg';
import urduBook4 from './assets/android_app_assets/book_zarb_ae_kaleem_urdu_3.jpg';

import farsi1Book1 from './assets/android_app_assets/book_rumuz_ae_bekhudi_persian_6.jpg';
import farsi1Book2 from './assets/android_app_assets/book_asrar_ae_khudi_persian_5.jpg';
import farsi1Book3 from './assets/android_app_assets/book_payam_ae_hijaz_persian_7.jpg';
import farsi1Book4 from './assets/android_app_assets/book_zabur_ae_ajam_persian_8.jpg';

import farsi2Book1 from './assets/android_app_assets/book_javed_nama_persian_9.jpg';
import farsi2Book2 from './assets/android_app_assets/book_pas_cheh_bayad_kard_persian_10.jpg';
import farsi2Book3 from './assets/android_app_assets/book_armaghan_ae_hijaz_persian_11.jpg';

import './TabView1.css';


// import ListPoemPage from './ListPoemPage';


import Tabs from './Tabs';

import Users from './users'
import Contact from './contact'
/*
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import TabContainer from 'react-bootstrap/TabContainer'
import TabContent from 'react-bootstrap/TabContent'

import Image from 'react-bootstrap/Image'

import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Nav from 'react-bootstrap/Nav'
*/


// function App() {
export default class testTabView1 extends React.Component {
	render() {
	/*
  if (this.state.redirect) {
    return <Redirect push to="/ListPoemPage" />;
  }
  	*/
  return (
    <div className="App">
	  <header className="App-header"> 
	<p>Allama Iqbal</p>
	<img src={logo} className="App-logo" alt="logo" /> 

			<Tabs>
		      <div label="ﺍﺭﺩﻭ">
	  {/*<img src={urduBook1} className="App-logo" onClick={() => imageClick()}  alt="logo"/> */} 
	  {this.props.children}
	  <Link to="ListPoemPage">ListPoemPage</Link>
	  		<img src={urduBook2} className="App-logo" alt="logo"/>
	  		<img src={urduBook3} className="App-logo" alt="logo"/>
	  		<img src={urduBook4} className="App-logo" alt="logo"/>
		      </div>
		      <div label="(ﻑﺍﺮﺳی  (۱">
	  		<img src={farsi1Book1} className="App-logo" alt="logo"/>
	  		<img src={farsi1Book2} className="App-logo" alt="logo"/>
	  		<img src={farsi1Book3} className="App-logo" alt="logo"/>
	  		<img src={farsi1Book4} className="App-logo" alt="logo"/>
		      </div>
		      <div label="(ﻑﺍﺮﺳی  (۲">
	  		<img src={farsi2Book1} className="App-logo" alt="logo"/>
	  		<img src={farsi2Book2} className="App-logo" alt="logo"/>
	  		<img src={farsi2Book3} className="App-logo" alt="logo"/>
		      </div>
		    </Tabs>
	
	  {/*

	  <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
	    <Tab eventKey="home" title="Home">
	  	<p>
		        See ya later, <em>Alligator</em>!
		</p>
	    </Tab>
	    <Tab eventKey="profile" title="Profile">
	  	<p>
		       	If dady does it, I do it! 
		</p>
	    </Tab>
	    <Tab eventKey="contact" title="Contact" disabled>
	  	<p>
		        I am disabled
		</p>
	    </Tab>
	  </Tabs>;
	  */}
	  {/*

<Tab.Container id="left-tabs-example" defaultActiveKey="first">
	    <Row>
	      <Col sm={3}>
	            <Nav variant="pills" className="flex-column">
		            <Nav.Item>
			              <Nav.Link eventKey="first">Tab 1</Nav.Link>
				              </Nav.Item>
					              <Nav.Item>
						                <Nav.Link eventKey="second">Tab 2</Nav.Link>
								        </Nav.Item>
									      </Nav>
									          </Col>
										      <Col sm={9}>
										            <Tab.Content>
											            <Tab.Pane eventKey="first">
													              </Tab.Pane>
														              <Tab.Pane eventKey="second">
																	        </Tab.Pane>
																		      </Tab.Content>
																		          </Col>
																			    </Row>
																			    </Tab.Container>
																			    */}
	{/*
        <p>
          Add Tabs for all books
        </p>
	<p>
	  Add Tabs for logos
	</p>
        <a
          className="App-link"
          href="https://ghummantech.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ghumman Tech
        </a>

	        <li>
	          <Link to="/users">Users</Link>
	        </li>
	        <li>
	          <Link to="/contact">Contact</Link>
	        </li>
	*/}
	  </header>
    </div>
  );
	}
}

// export default App;
