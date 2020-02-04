import React, {Component, Fragment} from 'react';
import Button from "../components/Button";
import Theme from "../components/theme";
import {getCookie, setCookie, eraseCookie} from '../utils/cookie';
import Login from "../screens/Login";
import authService from "../services/authService";

class MainContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			themeName: "defaultTheme",
			authUser: null,
			appReady: false
		}
	}


	async componentDidMount() {
		let authUser = null;
		const token = getCookie("t_token");
		let res = await authService.verifyToken({token});
		if(res.data.success){
			setCookie("t_token", token, 1);
			authUser = res.data.authUser;
			console.log(`Logged user: ${JSON.stringify(authUser)}`);
		}
		else{
			eraseCookie("t_token");
		}
		this.setState({appReady: true, authUser});
	}


	switchTheme = () => {
		let {themeName} = this.state;
		themeName = (themeName === "defaultTheme" ? "darkTheme" : "defaultTheme");
		this.setState({themeName});
	};

	onLogin = (data) => {
		let {authUser, token} = data;
		delete authUser.success;
		this.setState({authUser});
		setCookie("t_token", token, 1);
		console.log(`Logged user: ${JSON.stringify(authUser)}`);
	};

	render() {
		let {themeName, authUser, appReady} = this.state;
		let names = ["barış", "kenan", "alpkan", "tanzer", "serkan"];
		return (
			<Fragment>
				<Theme themeName={themeName} r-if={appReady&&authUser}>
					<div r-for={(name,idx) in names} key={"name_"+idx}>
						<div r-if={name==='barış'}>
							{name.toUpperCase()}
						</div>
						<div r-else>
							{name}
						</div>
					</div>
					<p style={{cursor: "pointer"}} onClick={this.switchTheme}>Switch Theme</p>
					<Button text={"TESODEV"} onClick={()=>{
						console.log("clicked");
					}}/>
				</Theme>
				<Login r-else-if={appReady} onLogin={this.onLogin}/>
			</Fragment>
		);
	}
}

export default MainContainer;
