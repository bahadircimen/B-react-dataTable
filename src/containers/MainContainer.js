import React, {Component, Fragment} from 'react';
import Table from "../components/Table";
import styles from "./styles.scss";

class MainContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{key: "name", sortable: true, searchable: true},
				{key: "age", sortable: true, searchable: true},
				{key: "email", sortable: false, searchable: true}
			],
			data: [
				{name: 'Wasif', age: 21, email: 'wasif@email.com'},
				{name: 'Ali', age: 19, email: 'ali@email.com'},
				{age: 11, name: "Saad", email: 'saad@email.com'},
				{name: 'Asad', age: 25, email: 'asad@email.com'},
				{name: 'alpkan', age: 21, email: 'wasif@email.com'},
				{name: 'barış', age: 19, email: 'ali@email.com'},
				{name: 'merve', age: 16, email: 'saad@email.com'},
				{name: 'bahadır', age: 25, email: 'asad@email.com'},
				{name: 'kenan', age: 21, email: 'wasif@email.com'},
				{name: 'tanzer', age: 19, email: 'ali@email.com'},
				{name: 'ruken', age: 16, email: 'saad@email.com'},
				{name: 'berk', age: 25, email: 'asad@email.com'},
				{name: 'serkan', age: 25, email: 'asad@email.com'},

			],
		}
	}

	render() {
		return (
			<Fragment>
				<div className={styles.container}>
					<div className={styles.row}>
										<div className={styles.colMd9}>
											<Table
												data={this.state.data}
												columns={this.state.columns}
											/>
										</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default MainContainer;
