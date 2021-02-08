import React from 'react';
import StaticContentService from '../misc/StaticContentServiceYaml';

// for formatting
// import './Poetry.css'

import Divider from '@material-ui/core/Divider';

// eslint-disable-next-line no-unused-vars
import PoemPage from './PoemPage';
import PropTypes from 'prop-types';
import Header from '../header/Header';

import YAML from 'yaml';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = (theme) => ({
	root: {
		display: "block",
		margin: "10px",
		textAlign: "center" as "center",
		borderStyle: "solid",
		borderRadius: "25px",
		background: "#FFFAFA",
	  },

	poetryBookTitle: {
		textAlign: "center" as "center",
		fontFamily: "Jameel",
		color: "red",
		fontSize: "40px",
		fontWeight: "bold" as "bold",
		fontStyle: "bold",
	  },
	
	  poetryPoemsList: {
		fontFamily: "Jameel",
		color: "black",
		fontSize: "30px",
		textAlign: "center" as "center",
		cursor: "pointer",
	  },

	  poetryPoemsSectionsList: {
		fontFamily: "Jameel",
		color: "red",
		fontSize: "30px",
		textAlign: "center" as "center",
	  }

});

class ListPoemPage extends React.Component<any, any> {

	static propTypes = {
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	}

	constructor(props: any) {
		super(props);
		this.state = {

			// following three are normally passed to every page
			username: '',
			password: '',
			signinConfirmation: '',

			pictures: [],
			listId: 'List_001',
			poemList: [],
			poemListName: [],
			bookName: [],
			bookNameUrdu: '',
			bookNameEnglish: '',
			bookSections: [],
			onePoem: '',
			poemText: [],
			poemObjects: []
		};	// this.state ends
	}	// constructor ends

	onSubmit = (poemNumber: any) => {

		if (poemNumber !== 0) {
			this.props.history.push({
				pathname: '/PoemPage',
				state: { detailPoem: poemNumber, profileSigninConfirmation: this.state.signinConfirmation, profileUsername: this.state.username, profilePassword: this.state.password }
			});
		}
	}

	getPoemList(listId: any) {

		var response = StaticContentService.getPoemList(listId);

		var yamlObject = YAML.parse(response);

		this.setState({ poemList: yamlObject.sections });

		this.setState({ poemListName: this.state.poemList.poems });

		for (var i = 0; i < yamlObject.sections.length; i++) {
			try {
				if (yamlObject.sections[i].sectionName[0]) {
					// for (var j = 0; j < yamlObject.sections[i].sectionName.length; j++) {
						// console.log("value of yamlObject.sections[i].sectionName[j].text: i: j:");
						// console.log(yamlObject.sections[i].sectionName[j].text);
						// console.log(i);
						// console.log(j);
						this.state.poemText.push({ 'textUrdu': yamlObject.sections[i].sectionName[0].text, 'textEnglish': yamlObject.sections[i].sectionName[1].text, 'id': '0' });
					// }
				}
			}
			catch (e) {
				if (yamlObject.sections[i].poems[0].poemName[0]) {
					for (var jj = 0; jj < yamlObject.sections[i].poems.length; jj++) {
						// for (var k = 0; k < yamlObject.sections[i].poems[jj].poemName.length; k++) {
							// console.log("value of yamlObject.sections[i].poems[jj].poemName.length: ");
							// console.log(yamlObject.sections[i].poems[jj].poemName.length);
							this.state.poemText.push({ 'textUrdu': yamlObject.sections[i].poems[jj].poemName[0].text, 'textEnglish': yamlObject.sections[i].poems[jj].poemName[1].text, 'id': yamlObject.sections[i].poems[jj].id });
						// }
						this.setState({ poemObject: yamlObject.sections[i].poems[jj] });
					}
				}	// if yamlObject.... ends
			}	// catch ends
		}	// for ends

		try {
			this.setState({
				bookName: yamlObject.sections[0].sectionName.map((item: any) =>
					<li key={item.text}>{item.text}</li>)
			});
		}
		catch (e) {
			// TODO 
		}
		this.setState({ bookNameUrdu: yamlObject.name[0].text });
		this.setState({ bookNameEnglish: yamlObject.name[1].text });

		this.setState({ bookSections: yamlObject.sections });

		this.setState({ onePoem: yamlObject.sections[1].poems[0].poemName[0].text });
	}	// getPoemList ends

	componentDidMount() {
		window.scrollTo(0, 0);
		// retrive the data
		try {
			this.setState({ signinConfirmation: this.props.location.state.profileSigninConfirmation });
			this.setState({ username: this.props.location.state.profileUsername });
			this.setState({ password: this.props.location.state.profilePassword });
			let bookName = this.props.location.state.detailBook;
			this.getPoemList(bookName);
		}
		catch (e) {
			// TODO 
		}
	}

	signMeIn = () => {
		if (this.state.username === '') {
			this.props.history.push({
				pathname: '/RegisterPage',
				state: { profileSigninConfirmation: this.state.signinConfirmation, profileUsername: this.state.username, profilePassword: this.state.password }
			});
		}
	}

	render() {

		const { classes } = this.props;
		var item3 = this.state.poemText.map((item: any) =>
		<div>

		<Card className={classes.root}>
			<CardContent>
				{item.id == '0' ? (
					<div className={classes.poetryPoemsSectionsList} key={item.index} > 
						<div>
							{item.textUrdu}
						</div>
						<div>
							{item.textEnglish}
						</div>
					</div>
				 ) : (
					<div className={classes.poetryPoemsList} key={item.index} onClick={() => this.onSubmit(item.id)}> 
						<div>
							{item.textUrdu}
						</div>
						<div>
							{item.textEnglish}
						</div>
					</div>
				 )}
				
			</CardContent>
		</Card>
		<div></div>
		</div>
		);

		let signinTag;
		var signinMessageLocal = '';
		if (this.state.signinConfirmation === 'done') {
			signinMessageLocal = this.state.username.charAt(0).toUpperCase();
			signinTag = <button type="button" className="btn btn-success btn-circle btn-lg"> {signinMessageLocal} </button>;
		}
		else {
			signinMessageLocal = 'Sign In';
			signinTag = <button type="button" className="btn btn-primary" onClick={() => this.signMeIn()}> {signinMessageLocal} </button>;
		}

		return (
			<div>
				<Header {...this.props}/>
				{/* <div className="text-right">
					{signinTag}
				</div> */}
				<div className={classes.poetryBookTitle}>
					<p>
						{this.state.bookNameUrdu}
					</p>
					<p>
						{this.state.bookNameEnglish}
					</p>
				</div>
				<div>
					{item3}
				</div>
			</div>

		);
	}
}
export default withStyles(useStyles)(ListPoemPage);
