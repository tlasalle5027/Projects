import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match',
        };

        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

        this.sortByOptions = {
            "Best Options": 'best_match',
            "Highest Rated": 'rating',
            "Most Reviewed": 'review_count',
        };
    }

    getSortByClass(sortByOption){
        if(this.state.sortBy === sortByOption){
            return 'active';
        } else {
            return '';
        }

    }

    handleSortByChange(sortByOption){
        if(this.state.term && this.state.location){
            this.setState({
                sortBy: sortByOption,
            }, () => {
                this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
              });
        } else {
            this.setState({ sortBy: sortByOption });
        }

    }

    handleTermChange(event){
        this.setState({
            term: event.target.value
        });

    }

    handleLocationChange(event){
        this.setState({
            location: event.target.value
        });
    }

    handleSearch(event){
        this.props.searchYelp(this.state.term, 
            this.state.location, this.state.sortBy);
        event.preventDefault();
    }

    handleKeyPress(event){
        if (event.keyCode === 13 && this.state.term && this.state.location) {

            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);

            event.preventDefault();
        }
    }

    renderSortByOptions(){
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return (<li key={sortByOptionValue} 
                        className={this.getSortByClass(sortByOptionValue)}
                        onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
                        {sortByOption}
                    </li>)
        });
    }

    render(){
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input placeholder="Search Businesses" 
                           onChange={this.handleTermChange} 
                           onKeyUp={this.handleKeyPress} />
                    <input placeholder="Where?" 
                           onChange={this.handleLocationChange}
                           onKeyUp={this.handleKeyPress} />
                </div>
                <div class="SearchBar-submit">
                    <a onClick = {this.handleSearch}>Let's Go</a>
                </div>
            </div>
        );
    }
}

export default SearchBar;
