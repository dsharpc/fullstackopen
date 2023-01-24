
const SearchBox = ({handleSearchInput, newSearch}) => {
    return (
    <div>
    filter shown with: <input onChange={handleSearchInput} value={newSearch} />
    </div>
    )
}

export default SearchBox