import PropTypes from 'prop-types'
import React, { Component, createRef } from "react";
import themes from "./themes";

class Theme extends Component {
	constructor(props) {
		super(props);
		this.node = createRef();
	}

	componentDidMount() {
		this.updateCSSVariables();
	}

	componentDidUpdate(prevProps) {
		if (this.props.themeName !== prevProps.themeName) {
			this.updateCSSVariables();
		}
	}

	updateCSSVariables() {
		Object.entries(themes[this.props.themeName]).forEach(([prop, value]) => this.node.current.style.setProperty(prop, value));
	}

	render() {
		const { children } = this.props;
		return <div ref={this.node}>{children}</div>;
	}
}

export default Theme;

Theme.propTypes = {
  children: PropTypes.any,
  themeName: PropTypes.oneOf(['defaultTheme', 'darkTheme'])
};

Theme.defaultProps = {
  themeName: "defaultTheme"
};
