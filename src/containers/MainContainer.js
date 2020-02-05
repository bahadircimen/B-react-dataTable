import React, {Component, Fragment} from 'react';
import Table from "../components/Table";
import styles from "./styles.scss";

class MainContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{ name: 'Wasif', age: 21, email: 'wasif@email.com' },
				{ name: 'Ali', age: 19, email: 'ali@email.com' },
				{ name: 'Saad', age: 16, email: 'saad@email.com' },
				{ name: 'Asad', age: 25, email: 'asad@email.com' },
				{ name: 'alpkan', age: 21, email: 'wasif@email.com' },
				{ name: 'barış', age: 19, email: 'ali@email.com' },
				{ name: 'merve', age: 16, email: 'saad@email.com' },
				{ name: 'bahadır', age: 25, email: 'asad@email.com' },
				{ name: 'kenan', age: 21, email: 'wasif@email.com' },
				{ name: 'tanzer', age: 19, email: 'ali@email.com' },
				{ name: 'ruken', age: 16, email: 'saad@email.com' },
				{ name: 'berk', age: 25, email: 'asad@email.com' },
				{ name: 'serkan', age: 25, email: 'asad@email.com' },

			]
		}
	}
	renderTableHeader=()=> {
		let header = Object.keys(this.state.data[0]);
		 return header.map((key, index) => {
			return <th key={index}>{key.toUpperCase()}</th>
		})
	};

	render() {
		const {data} = this.state;
		return (
			<Fragment>
				<div className={styles.container}>
					<div className={styles.row}>
						<div className={styles.colMd2}/>
						<tr>{this.renderTableHeader()}</tr>
					</div>
						<div className={styles.colMd8}>
							{
								data.map((d,index) => {
									return (
										<div key={index}
											 className={styles.colMd8}>
											<Table
											id={index}
											name={d.name}
											age={d.age}
											email={d.email}
											/>
										</div>
									)
								})
							}
						</div>
				</div>
			</Fragment>
		);
	}
}

export default MainContainer;
