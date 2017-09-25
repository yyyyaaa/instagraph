import React, { Component } from 'react';
import SearchBox from '../../containers/SearchBox';

const SearchIcon = () => (
  <span className="icon search-icon">
    <i className="fa fa-search"></i>
  </span>
);

const CloseIcon = ({ onClick }) => (
  <span className="icon cross-icon">
    <i className="fa fa-times-circle" 
      onClick={onClick}>
    </i>
  </span>
);

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      focused: false,
    };
  }

  handleInput = (event) => {
    this.setState({
      searchQuery: event.target.value,
    });
  }

  clearInput = () => {
    this.setState({ searchQuery: "" });
  }

  unfocus = () => {
    this.setState({ focused: false });
  }

  render() {
    const searchClass = this.state.focused ? "searchbox focused" : "searchbox";
    
    return (
      <div className="searchbox-container">
        <div 
          className={searchClass} 
          onBlur={() => this.setState({ focused: false })}
          onFocus={() => this.setState({ focused: true })}
          tabIndex="-1"
          >

          <SearchIcon />
          <SearchBox 
            searchQuery={this.state.searchQuery} 
            focused={this.state.focused}
            onChange={(event) => this.handleInput(event)}
          />
          <CloseIcon onClick={() => {this.clearInput(); this.unfocus()}} />
        </div>
        
        
      </div>
    );
  }
}

export default Search;