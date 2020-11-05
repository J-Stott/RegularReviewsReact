import React, { useState, useEffect, useRef } from "react";

import SearchList from "./SearchList";
import SearchListItem from "./SearchListItem";

import classes from "./ReviewSearchBar.module.css";
import inputClasses from "./Input.module.css";

import {useSearch} from "../../hooks/search-hook";
import { useHttpClient } from "../../hooks/http-hook";

const ReviewSearchBar = (props) => {

  const [listVisible, showList, hideList, searchHandler] = useSearch();
  const {sendRequest} = useHttpClient();
  const [gameName, setGameName] = useState(props.initialName || "");
  const [, setIgdbId] = useState(props.initialIgdbId || "");
  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const [selectedGame, setSelectedGame] = useState(props.initialName || "");
  const listItemsRef = useRef([]);

  const { dbId, valueId, formInputHandler } = props;

  const updateGameName = (event) => {
    setGameName(event.target.value);

    if(event.target.value === ""){
      setIgdbId("");
      setSelectedGame("");
      formInputHandler(dbId, "", false);
      formInputHandler(valueId, "", false);
    }
  }

  const listItemClickedhandler = (igdbId, name) => {
    setSelectedGame(name);
    setGameName(name);
    setIgdbId(igdbId);
    formInputHandler(dbId, igdbId, true);
    formInputHandler(valueId, name, true);
    hideList();
  };

  //we only care if the search bar isn't focused 
  useEffect(() => {
    if(!searchBarFocused && !listVisible){
      const updateSearchBar = selectedGame !== "" && gameName !== selectedGame;

      if(updateSearchBar) {
        setGameName(selectedGame);
      }
    }
  }, [searchBarFocused]) // eslint-disable-line react-hooks/exhaustive-deps

  const createListItems = async (value) => {
    try{
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
    } catch(err) {
      console.log(err);
    }

  }

  const focusHandler = () => {
    setSearchBarFocused(true);
  }

  const hideHandler = () => {

      setTimeout(() => {
        hideList();
        setSearchBarFocused(false);
      }, 150);

  };

  return (
    <div className={classes["search-bar"]}>
      <div className={inputClasses["form-control"]}>
        <input
          id={props.dbId}
          name={props.dbId}
          type="text"
          placeholder={props.placeholder}
          value={gameName}
          onChange={(event) => {
            updateGameName(event)
            searchHandler(event, createListItems)
          }}
          onFocus={focusHandler}
          onBlur={hideHandler}
          autoComplete="off"
          disabled={props.disabled}
        />
      </div>

      <SearchList show={listVisible}>{listItemsRef.current}</SearchList>
    </div>
  );
};

export default ReviewSearchBar;
