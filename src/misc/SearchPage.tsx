/* eslint-disable no-unused-vars */
import React from 'react';
import StaticContentService from './StaticContentServiceYaml';

// for formatting
import '../main_page/TopSectionMainPage/TopSectionMainPage.css';
import PropTypes from 'prop-types';
import Header from '../header/Header';
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


class SearchPage extends React.Component<any, any> {

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

			searchText: '',
			selectedOption: 'title',

			inputBoxClicked: false,

			pictures: [],
			listId: 'List_001',
			poemList: [],
			sherList: [],
			poemListName: [],
			bookName: [],
			bookNameUrdu: '',
			bookNameEnglish: '',
			bookSections: [],
			onePoem: '',
			poemText: [],
			poemObjects: []

		};
		this.handleSearchText = this.handleSearchText.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);

		this.handleOptionChange = this.handleOptionChange.bind(this);

	}

	handleAlphabet(alphabetValue: any) {
		if (alphabetValue !== 'Back')
			this.setState({ searchText: this.state.searchText + alphabetValue });
		else

			this.setState({ searchText: this.state.searchText.substr(0, this.state.searchText.length - 1) });

	}

	handleInputClicked() {
		this.setState({ inputBoxClicked: true });
	}

	handleOptionChange(changeEvent: any) {
		this.setState({ selectedOption: changeEvent.target.value });
	}

	handleSearchText(event: any) {
		this.setState({ searchText: event.target.value });
	}

	// handleSubmit
	handleSubmit(event: any) {

		this.setState({ inputBoxClicked: false });

		event.preventDefault();

		if (this.state.searchText.trim() !== '') {
			if (this.state.selectedOption === 'title') {

				this.getPoemListSearch(this.state.searchText.trim());
			}
			else if (this.state.selectedOption === 'text') {

				this.getPoemSearch(this.state.searchText.trim());
			}
		}

		else {
			alert('Search Field can not be empty');
		}
	}


	getPoemListSearch(listId: any) {


		var response = StaticContentService.getPoemListSearch(listId);

		this.setState({ poemList: response.poems });

	}


	getPoemSearch(poemId: any) {

		var response = StaticContentService.getPoemSearch(poemId);
		response.sher.map((el: any) => {
			el.sherContent[0].text = el.sherContent[0].text.split('|');
			try {
				el.sherContent[1].text = el.sherContent[1].text.split('|');
			}
			catch (err) {
				el.sherContent.push({ 'text': ['#translation missing', '#translation missing'] });
			}
			try {
				el.sherContent[2].text = el.sherContent[2].text.split('|');
			}
			catch (err) {
				el.sherContent.push({ 'text': ['#translation missing', '#translation missing'] });
			}
			return el.sherContent;
		});

		this.setState({ sherList: response.sher });
	}

	onSubmitPoem = (poemNumber: any) => {
		this.props.history.push({
			pathname: '/PoemPage',
			state: { detailPoem: poemNumber, profileSigninConfirmation: this.state.signinConfirmation, profileUsername: this.state.username, profilePassword: this.state.password }
		});
	}

	onSubmitSher = (sherNumber: any) => {
		this.props.history.push({
			pathname: '/SherPage',
			state: { detailSher: sherNumber, profileSigninConfirmation: this.state.signinConfirmation, profileUsername: this.state.username, profilePassword: this.state.password }
		});
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		// retrive the data
		try {
			this.setState({ signinConfirmation: this.props.location.state.profileSigninConfirmation });
			this.setState({ username: this.props.location.state.profileUsername });
			this.setState({ password: this.props.location.state.profilePassword });
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
		var items = this.state.bookSections.map((item: any) =>
			<li key={item.sectionName}>{item.sectionName}</li>
		);


		var itemsPoemOrSher: any = [];
		if (this.state.selectedOption === 'title') {
			if (this.state.poemList.length !== 0) {

				itemsPoemOrSher = this.state.poemList.map((item: any) =>

					<div>

						<Card className={classes.cardBackground}>
							<CardContent>
								<div className={classes.poetryPoemsList} key={item.index} onClick={() => this.onSubmitPoem(item.id)}>
									<div>
										{item.poemName[0].text}
									</div>
									<div>
										{item.poemName[1].text}
									</div>
								</div>

							</CardContent>
						</Card>
						<div></div>
					</div>

				);
			}
			else {
				itemsPoemOrSher = <p>No Results Found</p>;
			}

		}
		else {
			if (this.state.sherList.length !== 0) {
				itemsPoemOrSher = this.state.sherList.map((item: any) =>
					<div>

						<Card className={classes.cardBackground}>
							<CardContent>
								<p className={classes.poetryPoemsList} key={item.index} onClick={() => this.onSubmitSher(item.id)}>
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
			}
			else {
				itemsPoemOrSher = <p>No Results Found</p>;
			}
		}

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

		let keyboardTag;
		if (this.state.inputBoxClicked === true) {
			keyboardTag = <p>
				<div className="btn-group" role="group">
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('Back')}>{'->'}</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('خ')}>خ</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ح')}>ح</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('چ')}>چ</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ج')}>ج</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ث')}>ث</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ٹ')}>ٹ</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ت')}>ت</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('پ')}>پ</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ب')}>ب</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ا')}>ا</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('آ')}>آ</button>
				</div>
				<p></p>
				<div className="btn-group" role="group">
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ض')} >ض</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ص')}>ص</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ش')}>ش</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('س')}>س</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ژ')}>ژ</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ز')}>ز</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ڑ')}>ڑ</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ر')}>ر</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ذ')}>ذ</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ڈ')}>ڈ</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('د')}>د</button>
				</div>
				<p></p>
				<div className="btn-group" role="group">
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ں')} >ں</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ن')}>ن</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('م')}>م</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ل')}>ل</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('گ')}>گ</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ک')}>ک</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ق')}>ق</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ف')}>ف</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('غ')}>غ</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ع')}>ع</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ظ')}>ظ</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ط')}>ط</button>
				</div>
				<p></p>
				<div className="btn-group" role="group">
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet(' ')} >Space</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ے')}>ے</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ي')}>ي</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ء')}>ء</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ھ')}>ھ</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('ہ')}>ہ</button>
					<button type="button" className="btn btn-primary" onClick={() => this.handleAlphabet('و')}>و</button>
				</div>

			</p>;
		}
		else {
			signinMessageLocal = 'Sign In';
			keyboardTag = <p className="text-center"></p>;
		}
		return (
			<div>
				<Header {...this.props} />

				<div className="text-center">
					<div className="tab2Text">
						<p className={classes.poetryBookTitle}>Allama Iqbal Search Engine</p>
						<form onSubmit={this.handleSubmit}>
							<div >
								<label>
									<input type="radio" value="title"
										checked={this.state.selectedOption === 'title'}
										onChange={this.handleOptionChange} />
									Title
								</label>
							</div>

							<div className="radio">
								<label>
									<input type="radio" value="text"
										checked={this.state.selectedOption === 'text'}
										onChange={this.handleOptionChange} />
									Text
								</label>
							</div>


							<label>
								Search Text:
								<input type="text" className="sherPageText" value={this.state.searchText} onChange={this.handleSearchText} onClick={() => this.handleInputClicked()} />
							</label>
							<p></p>
							<input type="submit" value="SEARCH" />
						</form>
					</div>
					<div className="sherPageText text-center">

						{keyboardTag}
					</div>
					<p className="tab2Text">Search Results</p>
					<div>

						{itemsPoemOrSher}
					</div>
				</div>

			</div>
		);	// return ends
	}	// render function ends
}	// class ends

export default withStyles(useStyles)(SearchPage);
