import { useState, useEffect } from 'react';

export default function useForm(initial = {}) {
	// create a state object for inputs
	const [inputs, setInputs] = useState(initial);
	const initialValues = Object.values(initial).join('');

	useEffect(() => {
		// this function runs when
		setInputs(initial);
	}, [initialValues]);

	function handleChange(e) {
		let { name, type, value } = e.target;
		// if (type === 'number') value = parseInt(value);
		if (type === 'file') [value] = e.target.files;
		setInputs({
			// copy existing state
			...inputs,
			[name]: value,
		});
	}

	function resetForm(e) {
		setInputs(initial);
	}

	function clearForm(e) {
		const blankState = Object.fromEntries(
			Object.entries(inputs).map(([key]) => [key, ''])
		);
		setInputs(blankState);
	}

	// return things we want to surface from custom hook
	return {
		inputs,
		handleChange,
		resetForm,
		clearForm,
	};
}
