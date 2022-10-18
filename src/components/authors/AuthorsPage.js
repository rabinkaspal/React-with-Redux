import React from "react";
import { connect } from "react-redux";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class AuthorsPage extends React.Component {
	componentDidMount() {
		this.props.actions.loadAuthors().catch(error => {
			alert("Load Author failed " + error);
		});
	}

	render() {
		return (
			<div className="m-4 p-1">
				<h2>Authors</h2>
				{this.props.authors.map(author => (
					<p key={author.name}>{author.name}</p>
				))}
			</div>
		);
	}
}

AuthorsPage.propTypes = {
	authors: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
	return {
		authors: state.authors,
	};
};

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(authorActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
