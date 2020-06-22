const notificationReducer = (state = { text: "", timer: null }, action) => {
	switch (action.type) {
		case "SET_NOTIFICATION":
			if (state.timer !== null) {
				clearTimeout(state.timer);
			}
			return { text: action.data.notification, timer: action.data.timer };

		case "REMOVE_NOTIFICATION":
			return { text: "", timer: null };

		default:
			return state;
	}
}

export const setNotification = (notification, seconds) => {
	return async dispatch => {
		const timer = setTimeout(() => {
			dispatch({
				type: "REMOVE_NOTIFICATION",
			})
		}, (seconds * 1000));

		await dispatch({
			type: "SET_NOTIFICATION",
			data: { notification, timer },
		})
	}
}

export default notificationReducer;