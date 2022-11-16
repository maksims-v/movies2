import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  searchFilterData: [],
  sortData: [],
  movieWithFavoriteData: [],
  bookmarksArr: [],
  favoriteArr: [],
  resetCheckbox: true,
  detailMovie: false,
  searchOptions: true,
  accountOffOn: false,
  enterAccount: true,
  favoriteOn: false,
  count: 0,
  pageCountBack: 0,
  pageCountNext: 10,
  movieGenreData: [
    {
      id: 28,
      name: ' боевик',
      toggle: false,
    },
    {
      id: 12,
      name: ' приключения',
      toggle: false,
    },
    {
      id: 16,
      name: ' мультфильм',
      toggle: false,
    },
    {
      id: 35,
      name: ' комедия',
      toggle: false,
    },
    {
      id: 80,
      name: ' криминал',
      toggle: false,
    },
    {
      id: 99,
      name: ' документальный',
      toggle: false,
    },
    {
      id: 18,
      name: ' драма',
      toggle: false,
    },
    {
      id: 10751,
      name: ' семейный',
      toggle: false,
    },
    {
      id: 14,
      name: ' фэнтези',
      toggle: false,
    },
    {
      id: 36,
      name: ' история',
      toggle: false,
    },
    {
      id: 27,
      name: ' ужасы',
      toggle: false,
    },
    {
      id: 10402,
      name: ' музыка',
      toggle: false,
    },
    {
      id: 9648,
      name: ' детектив',
      toggle: false,
    },
    {
      id: 10749,
      name: ' мелодрама',
      toggle: false,
    },
    {
      id: 878,
      name: ' фантастика',
      toggle: false,
    },
    {
      id: 10770,
      name: 'телевизионный фильм',
      toggle: false,
    },
    {
      id: 53,
      name: 'триллер',
      toggle: false,
    },
    {
      id: 10752,
      name: 'военный',
      toggle: false,
    },
    {
      id: 37,
      name: 'вестерн',
      toggle: false,
    },
  ],
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    get_data: (state, action) => {
      state.data = action.payload;
      state.searchFilterData = action.payload;
      state.sortData = action.payload;
      state.movieWithFavoriteData = action.payload;
    },
    search_counter: (state) => {
      state.count = state.count + 1;
    },
    movies_fetched: (state, action) => {
      state.detailMovie = action.payload;
    },
    add_to_bookmarks_arr: (state, action) => {
      state.bookmarksArr = action.payload;
    },
    detail_movie: (state, action) => {
      state.detailMovie = action.payload;
    },
    moviesFetchingError: (state) => {
      state = state;
    },
    closeModal: (state) => {
      state.accountOffOn = state.accountOffOn ? false : true;
      state.enterAccount = !state.enterAccount ? true : false;
    },
    search_options: (state, action) => {
      state.searchOptions = action.payload;
    },
    favorite_on: (state, action) => {
      state.favoriteOn = action.payload;
    },
    pages_count_back_next: (state, action) => {
      state.pageCountBack = state.pageCountBack + action.payload;
      state.pageCountNext = state.pageCountNext + action.payload;
    },
    pages_count_back_next_reset: (state) => {
      state.pageCountBack = 0;
      state.pageCountNext = 10;
    },
    add_to_favorite_arr: (state, action) => {
      state.favoriteArr = action.payload;
    },
    filtered_sort_data: (state, action) => {
      state.sortData = action.payload;
    },
    movie_with_favorite_data: (state, action) => {
      state.movieWithFavoriteData = action.payload;
    },
    search_filter_data: (state, action) => {
      state.searchFilterData = action.payload;
      state.count = 0;
    },
    openModal: (state) => {
      state.enterAccount = true ? false : true;
    },
    exitAccount: (state) => {
      state.accountOffOn = false;
      state.enterAccount = true;
    },
  },
});

const { actions, reducer } = moviesSlice;

export default reducer;

export const {
  get_data,
  search_counter,
  movies_fetched,
  add_to_bookmarks_arr,
  detail_movie,
  moviesFetchingError,
  closeModal,
  search_options,
  favorite_on,
  pages_count_back_next,
  pages_count_back_next_reset,
  add_to_favorite_arr,
  filtered_sort_data,
  movie_with_favorite_data,
  search_filter_data,
  openModal,
  exitAccount,
} = actions;
