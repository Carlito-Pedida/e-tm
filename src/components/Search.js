import React, { useState, useEffect } from "react";
import { useSearch } from "../contexts/SearchContext";
import debounce from "lodash.debounce";
import Modal from "react-bootstrap/Modal";
import "../styles/Search.css";
import { useNavigate } from "react-router-dom";

const Search = ({ show, handleClose }) => {
  // State and context variables
  const { query, setQuery } = useSearch();
  const navigate = useNavigate();

  // Local state variables
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [localResults, setLocalResults] = useState({
    users: [],
    qaks: [],
    articles: [],
  });
  const [showingResults, setShowingResults] = useState(false);
  const [noResults, setNoResults] = useState(false);

  // Fetch search results when query or category changes
  useEffect(() => {
    const fetchResults = async () => {
      try {
        let categoryParam = "";
        if (selectedCategory !== "All") {
          categoryParam = `&category=${selectedCategory.toLowerCase()}`;
        }

        const response = await fetch(
          `http://localhost:3000/search?q=${query}${categoryParam}`
        );
        const data = await response.json();

        // Initialize newLocalResults based on selected category
        const newLocalResults = {
          users: [],
          qaks: [],
          articles: [],
        };

        if (selectedCategory === "Users") {
          newLocalResults.users = data.users || [];
        } else if (selectedCategory === "Qaks") {
          newLocalResults.qaks = data.qaks || [];
        } else if (selectedCategory === "Articles") {
          newLocalResults.articles = data.rssArticles || [];
        } else if (selectedCategory === "All") {
          newLocalResults.users = data.users || [];
          newLocalResults.qaks = data.qaks || [];
          newLocalResults.articles = data.rssArticles || [];
        }

        // Update local state with new results
        setLocalResults(newLocalResults);
        setShowingResults(true);

        // Check if there are no results in any category
        const hasNoResults = Object.values(newLocalResults).every(
          (categoryResults) => categoryResults.length === 0
        );

        setNoResults(hasNoResults);
      } catch (error) {
        console.error("Error fetching search results:", error.message);
        console.error(error);

        // Handle errors by setting showingResults to true
        setShowingResults(true);
      }
    };

    // Check if there's a query, then fetch results
    if (query) {
      fetchResults();
    } else {
      // Reset local results and hide results if there's no query
      setLocalResults({ users: [], qaks: [], articles: [] });
      setShowingResults(false);
    }
  }, [query, selectedCategory]);

  // Handle clicking on a search result
  const displayDetailedResults = (item) => {
    switch (selectedCategory) {
      case "Users":
        navigate(`/noprofile/${item.user_id}`);
        break;
      case "Qaks":
        window.open(item.qak_link, "_blank");
        break;
      case "Articles":
      case "All":
        if (item.link) {
          window.open(item.link, "_blank");
        } else if (item.user_id) {
          navigate(`/noprofile/${item.user_id}`);
        } else {
          console.error("No link or user_id available for this item:", item);
        }
        break;
      default:
        console.error("Unknown category:", selectedCategory);
    }

    // Close the search modal when a result is clicked
    handleClose();
  };

  // Handle input change with debouncing, so it only updates after a slight pause
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery) {
      debounceFetchResults(newQuery);
    } else {
      // Reset local results and show results when input is empty
      setLocalResults({ users: [], qaks: [], articles: [] });
      setShowingResults(true);
    }
  };

  // Debounced function for fetching results
  const debounceFetchResults = debounce((newQuery) => {
    // Results are fetched in the useEffect hook based on the newQuery
  }, 500);

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const categories = ["All", "Users", "Qaks", "Articles"];

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header>
        <Modal.Title>Search</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row align-items-center">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Search Here"
              value={query}
              onChange={handleInputChange}
              aria-label="Search Input"
            />
          </div>
          <div className="col-md-4">
            <select
              className="custom-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
              aria-label="Category Dropdown"
            >
              <option value="" disabled>
                Pick Category
              </option>
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  className={cat === "All" ? "all-category" : ""}
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {showingResults && (
          <div className="list-group mt-2 search-results">
            {noResults ? (
              <div className="result-category">
                <h5 className="category-title">
                  Sorry folks, Search Result Not Found
                </h5>
                <p>No matching results found for "{query}".</p>
              </div>
            ) : (
              <>
                {selectedCategory === "Articles" &&
                  localResults.articles.length > 0 && (
                    <div className="result-category">
                      <h5 className="category-title">Articles</h5>
                      {localResults.articles.map((rssItem, index) => (
                        <a
                          key={rssItem.id || index}
                          href={rssItem.link}
                          className="list-group-item list-group-item-action d-flex justify-content-between"
                        >
                          <div>
                            <strong>{rssItem.title}</strong>
                          </div>
                          <div>
                            {rssItem.description && (
                              <span>Description: {rssItem.description}</span>
                            )}
                          </div>
                        </a>
                      ))}
                    </div>
                  )}

                {selectedCategory !== "Articles" &&
                  Object.keys(localResults).map((category) => {
                    if (localResults[category].length > 0) {
                      return (
                        <div
                          key={category}
                          className="result-category d-flex flex-column"
                        >
                          <h5 className="category-title">{category}</h5>
                          {localResults[category].map((item, index) => (
                            <div
                              key={item.id || index}
                              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                              onClick={() => displayDetailedResults(item)}
                            >
                              <strong>
                                {item.fullname || item.qak || item.title}
                              </strong>
                              <div>
                                {item.city && (
                                  <span className="user-info">
                                    City: {item.city}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  })}
              </>
            )}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default Search;
