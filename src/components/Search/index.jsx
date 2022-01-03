import React, { useState } from 'react';
import './index.css';

const Search = ({ data }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    // Filter data
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };
    
    const handleSearch = (searchValue) => {
        console.log("Do search and display", searchValue);
    }

    const handleSumbit = (event) => {
        event.preventDefault();
        handleSearch(wordEntered);
        clearInput();
    };

    const handleDataResult = (event) => {
        const dataResultSelect = event.target.value;
        handleSearch(dataResultSelect);
        clearInput();
    };

    // console.log("check", wordEntered);
    return (
        <div className="search">
            <form onSubmit={handleSumbit}>
                <div className="searchInputs">
                    <input
                        type="text"
                        placeholder="Search a blog ..."
                        value={wordEntered}
                        onChange={handleFilter}
                    ></input>
                    <div id="clear-button" onClick={clearInput}>
                        {wordEntered.length !== 0 && <i className="nav-SearchIcon fas fa-times" />}
                    </div>
                    <button type="submit" id="search-button">
                        <i className="nav-SearchIcon fas fa-search" />
                    </button>            
                </div>
            </form>
            <div className="dataResult">
                {filteredData.slice(0, 6).map((item, index) => (
                    <button
                        className="dataResultButton"
                        key={index} 
                        value={item.title} 
                        onClick={handleDataResult} 
                    >
                        {item.title.slice(0, 20)}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Search;
