import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSearch } from "../../hooks/search-hook";
import classes from "./SearchBar.module.css";
import SearchList from "../FormElements/SearchList";
import SearchListItem from "../FormElements/SearchListItem";

import { useHttpClient } from "../../hooks/http-hook";

const SearchBar = (props) => {
  const [listVisible, showList, hideList, searchHandler] = useSearch();
  const { sendRequest } = useHttpClient();

  const listItemsRef = useRef([]);
  const inputRef = useRef();

  const history = useHistory();

  const listItemClickedhandler = async (igdbId, name, link) => {
    try {
      hideList();
      inputRef.current.value = "";

      await sendRequest(
        `/api/games/${link}`,
        "POST",
        JSON.stringify({
          igdbId: igdbId,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      history.push(`/games/${link}`);
    } catch (err) {
      console.log(err);
    }
  };

  const createListItems = async (value) => {
    try {
      const data = await sendRequest(`/api/games/search/${value}`, "GET");

      if(data.length > 0){
        listItemsRef.current = data.map((game) => {
          return (
            <SearchListItem
              key={game.igdbId}
              id={game.igdbId}
              image={game.image}
              name={game.displayName}
              link={game.linkName}
              onClick={listItemClickedhandler}
            />
          );
        });
  
        showList();
      }

    } catch (err) {
      console.log(err);
    }
  };

  const hideHandler = () => {
    setTimeout(() => {
      hideList();
    }, 150);
  };

  return (
    <div className={classes["search-bar"]}>
      <div className={classes["form-control"]}>
        <input
          ref={inputRef}
          id={props.id}
          name={props.id}
          type="text"
          placeholder={props.placeholder}
          onChange={(event) => {
            searchHandler(event, createListItems);
          }}
          onBlur={hideHandler}
          autoComplete="off"
        />
        <span>
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>

      <SearchList show={listVisible}>{listItemsRef.current}</SearchList>
    </div>
  );
};

export default SearchBar;
