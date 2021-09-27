export const initialDate = new Date();

export const isInt = (number) => /^\d+$/.test(number);

export const isDateNotValid = (
	date,
	setHelperText,
	dateType = "period",
	fieldType = ""
) => {
	if (fieldType === "required" && date === null) {
		setHelperText(
			dateType !== "period" ? "Insira uma data" : "Insira um período"
		);
		return true;
	}
	if (date !== null && !isInt(date.getFullYear())) {
		setHelperText(
			dateType !== "period"
				? "Insira uma data válida"
				: "Insira um período válido"
		);
		return true;
	}
	return false;
};
