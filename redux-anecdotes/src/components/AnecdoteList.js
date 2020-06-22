import React from "react";
import { connect } from "react-redux";
import { voteOn } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
	const vote = (id) => {
		const anecdote = props.anecdotes.find(anecdote => anecdote.id === id);
		props.voteOn(id);
		props.setNotification(`You voted on the anecdote: "${anecdote.content}"`, 5);
	}
	
	const sortedAnecdotes = props.anecdotes.sort((a, b) => b.votes - a.votes);

	return (
		<div>
			<h2>Anecdotes</h2>
			{sortedAnecdotes.map(anecdote => 
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					has {anecdote.votes}
					<button onClick={() => vote(anecdote.id)}>vote</button>
				</div>
			)}
		</div>
	)
}

const mapStateToProps = (state) => {
	if (state.filter === "ALL") {
		return {
			anecdotes: state.anecdotes,
			filter: state.filter,
		}
	}
	const filteredAnecdotes = state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter));

	return {
		anecdotes: filteredAnecdotes,
		filter: state.filter,
	};
};

const mapDispatchToProps = {
	voteOn,
	setNotification,
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
export default ConnectedAnecdotes;