import anecdoteService from "../services/anecdotes";

export const createAnecdote = (content) => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content);
		dispatch({
			type: "NEW_ANECDOTE",
			data: newAnecdote,
		})
	}
};

export const voteOn = (id) => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll();
		const anecdote = await anecdotes.find(a => a.id === id);
		const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1};
		anecdoteService.update(id, changedAnecdote);
		dispatch({
			type: "VOTE",
			data: { id },
		})
	}
};

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll();
		dispatch({
			type: "INIT_ANECDOTES",
			data: anecdotes, 
		})
	};
};

const reducer = (state = [], action) => {
	switch (action.type) {
		case "NEW_ANECDOTE":
			return [...state, action.data];
		case "INIT_ANECDOTES":
			return action.data;
		case "VOTE":
			const id = action.data.id;
			const anecdoteToChange = state.find(a => a.id === id);
			const anecdoteCopy = {
				...anecdoteToChange,
				votes: anecdoteToChange.votes + 1
			};
			return state.map(anecdote => anecdote.id !== id ? anecdote : anecdoteCopy);
		default: 
			return state;
  };
}

export default reducer;