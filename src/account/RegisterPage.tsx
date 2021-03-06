/* eslint-disable no-unused-vars */
import React from 'react';

import SigninPage from './SigninPage';
import Header from '../header/Header';

// for formatting
import '../main_page/TopSectionMainPage/TopSectionMainPage.css';
import PropTypes from 'prop-types';

import $ from 'jquery';
declare var window: any;
window.$ = window.jQuery = $;


class Register extends React.Component<any, any> {

	static propTypes = {
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	}

	constructor(props: any) {
		super(props);
		this.state = {

			signinConfirmation: '',
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password1: '',
			password2: '',
			errorMessage: '',
			password: ''
		};

		this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
		this.handleChangeLastName = this.handleChangeLastName.bind(this);
		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangePassword1 = this.handleChangePassword1.bind(this);
		this.handleChangePassword2 = this.handleChangePassword2.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
	}


	// handlechange
	handleChangeFirstName(event: any) {
		this.setState({ firstName: event.target.value });
	}

	handleChangeLastName(event: any) {
		this.setState({ lastName: event.target.value });
	}

	handleChangeUsername(event: any) {
		this.setState({ username: event.target.value });
	}

	handleChangeEmail(event: any) {
		this.setState({ email: event.target.value });
	}

	handleChangePassword1(event: any) {
		this.setState({ password1: event.target.value });
	}

	handleChangePassword2(event: any) {
		this.setState({ password2: event.target.value });
	}

	onSubmitSignin = () => {

		this.props.history.push({
			pathname: 'SigninPage',
			state: { none: 'none' }
		});
	}



	// handleSubmit
	handleSubmit(event: any) {

		if (this.state.password1.trim() === this.state.password2.trim()) {
			this.setState({ password: this.state.password1 });
			try {
				$.ajax({
					url: 'https://www.icanmakemyownapp.com/iqbal/v3/create-account.php',
					type: 'POST',
					dataType: 'text',
					data: { first_name: this.state.firstName, last_name: this.state.lastName, username: this.state.username, password: this.state.password, email: this.state.email },
					success: (data: any) => {	// success funciton starts

						if (data.trim() === 'Your account has been created! Please check your email and activate your account by clicking on a link that we have sent you in the email. Don\'t forget to check in your Junk folder.') {
							alert(data);
							this.setState({ signinConfirmation: 'done' });

							this.props.history.push({
								pathname: '/',
								state: { profileUsername: this.state.username, profilePassword: this.state.password, profileSigninConfirmation: this.state.signinConfirmation }
							});	// this.props.history.push ends
						}	// if data.trim... ends
						// else if account not registered
						else {
							alert('Unable to register your account:' + data);
							this.setState({ errorMessage: 'Unable to register your account:' + data });
						}
					}	// success function ends
				});	// ajax call ends
			}	// try ends
			catch (err) {
				alert('inside catch err');
				alert(err);
				this.setState({ errorMessage: err });
			}	// catch ends
		}	// if both passwords are same end
		else {
			this.setState({ errorMessage: 'Passwords are not same' });
		}
		event.preventDefault();
	}	// handleSubmit(event) ends
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<span>
				<Header {...this.props} />
				<div className="text-center">
					<h1 className="text-center"> REGISTER </h1>
					<form onSubmit={this.handleSubmit}>
						<label>
							First Name:
						<input type="text" value={this.state.firstName} onChange={this.handleChangeFirstName} />
						</label>
						<p></p>

						<label>
							Last Name:
						<input type="text" value={this.state.lastName} onChange={this.handleChangeLastName} />
						</label>
						<p></p>

						<label>
							Username:
						<input type="text" value={this.state.username} onChange={this.handleChangeUsername} />
						</label>
						<p></p>

						<label>
							Email:
						<input type="text" value={this.state.email} onChange={this.handleChangeEmail} />
						</label>
						<p></p>

						<label>
							Password:
						<input type="password" value={this.state.password1} onChange={this.handleChangePassword1} />
						</label>
						<p></p>

						<label>
							Password (again):
						<input type="password" value={this.state.password2} onChange={this.handleChangePassword2} />
						</label>
						<p></p>

						<input type="submit" value="REGISTER" />
					</form>
					<p onClick={() => this.onSubmitSignin()}>

						Already Registered?{'\n'}
					Login Here

				</p>
					{this.state.errorMessage}
				</div>
			</span>
		);	// return ends
	}	// render function ends
}

export default Register;
