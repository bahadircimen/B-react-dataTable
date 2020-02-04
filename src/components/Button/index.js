import PropTypes from 'prop-types'
import React, {Component} from 'react';
import styles from './index.scss';

class Button extends Component {
	render() {
		let { text, onClick } = this.props;
		return (
				<div onClick={onClick} className={styles.button}>
					{ text }
				</div>
		);
	}
}

export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string
};

Button.defaultProps = {
  onClick: ()=>{},
  text: Button
};
