import React from "react";
import PropTypes from "prop-types";

class LanguageFilter extends React.Component {
  componentDidMount() {
    this.props.fetchLanguages();
  }
  onChange = e => {
    this.props.selectLanguage(e.target.value);
  };

  render() {
    const { languages } = this.props;

    return (
      <div className="form-group">
        <select className="form-control" onChange={this.onChange}>
          <option value="">Languages</option>
          {languages.map(language => (
            <option value={language.id} key={language.id}>
              {language.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

LanguageFilter.defaultProps = {
  languages: []
};

LanguageFilter.propTypes = {
  languages: PropTypes.array.isRequired,
  selectLanguage: PropTypes.func.isRequired,
  fetchLanguages: PropTypes.func.isRequired
};
export default LanguageFilter;
