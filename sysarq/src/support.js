export const initialDate = new Date();

export const isInt = (number) => /^\d+$/.test(number);

export const isDateNotValid = (
	date,
	dateType,
	setHelperText,
	fieldType = ""
) => {
	if (fieldType === "required" && date === null) {
		setHelperText(`Insira a data de ${dateType}`);
		return true;
	}
	if (date !== null && !isInt(date.getFullYear())) {
		setHelperText(
			`Insira uma ${fieldType === "required" ? "data" : dateType} válida`
		);
		return true;
	}
	return false;
};
