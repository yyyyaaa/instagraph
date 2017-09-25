import React, { Component } from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';
import SearchInput from '../../components/SearchInput';
import DropList from '../../components/DropList';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cursor: 0,
    };
  }

  // Mutate the cursor of searchbox component and reflect that to Droplist
  navigateDropList = (event) => {
    switch(event.key) {
      case 'ArrowUp':
        this.mutateCursor('UP');
        break;
      case 'ArrowDown':
        this.mutateCursor('DOWN');
        break;
      default:
        break;
    }
  }

  mutateCursor = (action) => {
    const users = this.props.data.searchUsers;
    const current = this.state.cursor;

    if (!users) {
      return null;
    }

    switch(action) {
      case 'UP':
        if (current > 0) { 
          this.setState({ cursor: current - 1});
        } 
        break;
      case 'DOWN':
        if (current < users.length - 1) {
          this.setState({ cursor: current + 1});
        }
        break;
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        <SearchInput 
          searchQuery={this.props.searchQuery}
          navigateDropList={(event) => this.navigateDropList(event)}
          onChange={this.props.onChange}
        />

        { this.props.searchQuery !== "" &&
          this.props.focused &&
          <DropList 
            users={this.props.data.searchUsers} 
            cursor={this.state.cursor}
          />
        }
      </div>
    );
  }
}

const SearchUsersQuery = gql`
query SearchUsersQuery($query: String!) {
  searchUsers(query: $query) {
    id
    username
    email
  }
}
`;

export default graphql(SearchUsersQuery, {
  options: ({ searchQuery }) => ({
    variables: { query: searchQuery }
  })
})(SearchBox);