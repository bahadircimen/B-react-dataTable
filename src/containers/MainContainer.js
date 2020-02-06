import React, {Component, Fragment} from 'react';
import Table from "../components/Table";
import styles from "./styles.scss";

class MainContainer extends Component {
	render() {
		return (
			<Fragment>
				<div className={styles.container}>
					<div className={styles.row}>
						<div className={styles.colMd9}>
							<Table/>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default MainContainer;
