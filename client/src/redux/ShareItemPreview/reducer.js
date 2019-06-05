// actions for share item page
const UPDATE_ITEM = 'UPDATE_ITEM';
const RESET_ITEM = 'RESET_ITEM';
const RESET_IMAGE = 'RESET_IMAGE';

// actions creators
export const updateItem = item => ({
  type: UPDATE_ITEM,
  payload: item
});

export const resetItem = () => ({
  type: RESET_ITEM
});

export const resetImage = () => ({
  type: RESET_IMAGE
});

// initial state
const initialState = {
  title: 'Name your Item',
  description: 'Describe your item',
  imageurl:
    'https://via.placeholder.com/350x250.png?text=Please+select+an+image',
  tags: [],
  itemowner: {},
  created: new Date()
};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ITEM:
      return {
        ...state,
        ...action.payload
      };
    case RESET_ITEM:
      return {
        ...initialState
      };
    case RESET_IMAGE:
      return {
        ...state,
        imageurl: initialState.imageurl
      };
    default:
      return { ...state };
  }
};
