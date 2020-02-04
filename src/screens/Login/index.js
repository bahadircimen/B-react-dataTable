import React, {Component} from 'react';
import authService from "../../services/authService";
import styles from './styles.scss';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state={invalidCredentials: false};
		this.username = React.createRef();
		this.password = React.createRef();
	}

	onLogin = async () => {
		let payload = {
			username: this.username.current.value,
			password: this.password.current.value,
		};
		this.setState({invalidCredentials: false});

		let res = await authService.login({payload});
		if(res.data.success){
			this.props.onLogin(res.data);
		}
		else{
			this.setState({invalidCredentials: true});
			console.error("invalid credentials for login");
		}
	};
	render() {
		let {invalidCredentials} = this.state;
		return (
			<div className={styles.loginContainer}>
				<div r-if={invalidCredentials} className={styles.invalidCredentials}>Invalid Credentials</div>
				<input type="text" name="username" ref={this.username}/>
				<input type="password" name="password" ref={this.password}/>
				<button onClick={this.onLogin}>Giriş Yap</button>
			</div>
		);
	}
}

export default Login;
