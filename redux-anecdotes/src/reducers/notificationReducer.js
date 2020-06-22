const notificationReducer = (state = { text: "", timer: null }, action) => {
	switch (action.type) {
		case "SET_NOTIFICATION":
			if (state.timer !== null) {
				clearTimeout(state.timer);
			}
			return { text: action.data.text, timer: action.data.timer };

		case "REMOVE_NOTIFICATION":
			return { text: "", timer: null };
			
		default:
			return state;
	}
}

export const setNotification = (text, seconds) => {
	return async dispatch => {
		const timer = setTimeout(() => {
			dispatch({
				type: "REMOVE_NOTIFICATION",
			})
		}, (seconds * 1000));

		await dispatch({
			type: "SET_NOTIFICATION",
			data: { text, timer },
		})
	}
}

export default notificationReducer;