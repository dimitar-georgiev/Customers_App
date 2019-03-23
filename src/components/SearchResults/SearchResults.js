import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import classes from './SearchResults.css';

import InfiniteScroll from 'react-infinite-scroll-component'; 

import SearchResult from './SearchResult/SearchResult';

class SearchResutls extends Component {
    state = {
        items: [],
        data: [],
        counter: 0
    }

    componentDidUpdate(prevProps){
        if (this.props.data !== prevProps.data) {
            
            let items = [];
            let counter = 0;

            items = this.props.data.slice(0, 7);
            counter = 1;
            
            this.setState({data: this.props.data, items, counter});
        }
    }

    fetchMoreData = () => {
            const start = this.state.counter * 7;
            const end = start + 7;
            const nextSlice = this.state.data.slice(start, end);
            const moreData = this.state.items.concat(nextSlice);
            const counter = ++this.state.counter;

            this.setState({items: moreData, counter});
    };

    render() {

        return (
            <div className={classes.SearchResults}>
                <InfiniteScroll
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    scrollThreshold={0.9}
                >
                    {this.state.items.map(item => {
                        return (
                            <Link to={`/customer/${item.id}`} key={item.id}>
                                <SearchResult {...item}  />
                            </Link>
                        );
                    })}
                </InfiniteScroll>
            </div>
        );
    }
}

export default SearchResutls;

// ^[A-z]*\s[A-z]+$ -> Word_Word -> must have two words
// ^[A-z]+$ -> only one word
// ^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$ -> IP Address
// ^-?([1-8]?[0-9]\.{1}\d{1,6}$|90\.{1}0{1,6}$) -> -90.000000 to 90.000000 -> latitude
// ^-?((([1]?[0-7][0-9]|[1-9]?[0-9])\.{1}\d{1,6}$)|[1]?[1-8][0]\.{1}0{1,6}$) -> longitude
// (?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
