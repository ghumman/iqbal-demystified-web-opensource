import React from 'react';
import StaticContentService from '../misc/StaticContentServiceYaml';

import PropTypes from 'prop-types';
import Header from '../header/Header';

import YAML from 'yaml';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = (theme) => ({
	cardBackground: {
		display: "block",
		margin: "10px",
		textAlign: "center" as "center",
		borderStyle: "solid",
		borderRadius: "25px",
		background: "#FFFAFA",
	},

	poetryBookTitle: {
		margin: "10px",
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

class PoemPage extends React.Component<any, any> {

	static propTypes = {
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	}

	constructor(props: any) {
		super(props);
		this.state = {
			username: '',
			password: '',
			signinConfirmation: '',

			listId: 'List_001',
			poemList: [],
			poemNameUrdu: '',
			poemNameEnglish: '',
			poemText: [],
			poemTextNew: [],
			poemObjects: []
		};
	}

	onSubmit = (sherNumber: any) => {
		this.props.history.push({
			pathname: '/SherPage',
			state: { detailSher: sherNumber, profileSigninConfirmation: this.state.signinConfirmation, profileUsername: this.state.username, profilePassword: this.state.password }
		});
	}

	getPoem(listId: any) {
		var response = StaticContentService.getPoem(listId);


		var yamlObject = YAML.parse(response);

		let newArr = [yamlObject.sher];

		yamlObject.sher.map((el: any) => {
			try {
				el.sherContent[0].text = el.sherContent[0].text.split('|');
			} catch (err) {
				// TODO 
			}
			try {
				el.sherContent[1].text = el.sherContent[1].text.split('|');
			} catch (err) {
				el.sherContent.push({ 'text': ['#translation missing', '#translation missing'] });
			}
			try {
				el.sherContent[2].text = el.sherContent[2].text.split('|');
			} catch (err) {
				el.sherContent.push({ 'text': ['#translation missing', '#translation missing'] });
			}
			return el.sherContent;
		});

		this.setState({
			poemTextNew: newArr[0]
		});
		this.setState({ poemNameUrdu: yamlObject.heading[0].text });
		this.setState({ poemNameEnglish: yamlObject.heading[1].text });

	}

	componentDidMount() {
		window.scrollTo(0, 0);
		// retrive the data
		try {

			this.setState({ signinConfirmation: this.props.location.state.profileSigninConfirmation });
			this.setState({ username: this.props.location.state.profileUsername });
			this.setState({ password: this.props.location.state.profilePassword });

			let poemName = this.props.location.state.detailPoem;
			this.getPoem(poemName);
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
		var item3 = this.state.poemTextNew.map((item: any) =>
			<div>

				<Card className={classes.cardBackground}>
					<CardContent>
						<p className={classes.poetryPoemsList} key={item.index} onClick={() => this.onSubmit(item.id)}>
							{item.sherContent[0].text[0]}
							<br />
							{item.sherContent[0].text[1]}
							<br />
							{item.sherContent[1].text[0]}
							<br />
							{item.sherContent[1].text[1]}
						</p>
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
				<Header {...this.props} />

				<div className={classes.poetryBookTitle}>
					<p>
						{this.state.poemNameUrdu}
					</p>
					<p>
						{this.state.poemNameEnglish}
					</p>
				</div>
				<div>
					{item3}
				</div>
			</div>
		);
	}	// render function ends

}	// class ends
export default withStyles(useStyles)(PoemPage);
