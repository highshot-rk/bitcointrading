/* eslint-disable indent */
import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { useLocalStorage } from './util/LocalStorage';
import ICoinListItem from './types/ICoinListItem';

export interface Store {
  watchlist: ICoinListItem[];
}

interface AddToWatchlist {
  type: 'addToWatchlist';
  coinListItem: ICoinListItem;
}

interface RemoveFromWatchlist {
  type: 'removeFromWatchlist';
  coinListItem: ICoinListItem;
}

export type Actions = AddToWatchlist | RemoveFromWatchlist;

export const reducer = (state: Store, action: Actions): Store => {
  switch (action.type) {
    case 'addToWatchlist': {
      const j = {
        ...state,
        watchlist: [...state.watchlist, action.coinListItem],
      };

      return j;
      break;
    }
    case 'removeFromWatchlist': {
      const coin = state.watchlist.find(
        (coin) => coin.id === action.coinListItem.id
      );
      let newWatchlist;
      if (coin) {
        const index = state.watchlist.indexOf(coin);
        newWatchlist = state.watchlist.filter(
          (coin_, index_) => index_ !== index
        );
      }
      return {
        ...state,
        watchlist: newWatchlist || state.watchlist,
      };
    }
  }
};

interface StoreContext {
  store: Store;
  dispatch: Dispatch<Actions>;
}

const StoreContext = createContext({} as StoreContext);

export const useStore = (): StoreContext => useContext(StoreContext);

export default function StoreProvider(props: {
  children: JSX.Element;
}): JSX.Element {
  const [watchlist] = useLocalStorage<ICoinListItem[]>('watchlist', []);
  const [store, dispatch] = useReducer(reducer, { watchlist });

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
}
