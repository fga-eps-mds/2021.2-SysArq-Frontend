import { setupServer } from "msw/node";
import { rest } from "msw";

const hostApiArchives = `${process.env.REACT_APP_URL_API_ARCHIVES}`;
const axiosProfile = process.env.REACT_APP_URL_API_PROFILE;

const refreshTokenRequest = rest.post(
	`${axiosProfile}api/token/refresh/`,
	(req, res, ctx) => {
		if (req.body.refresh === "401") {
			return res(ctx.status(401));
		}
		if (req.body.refresh === "404") {
			return res(ctx.status(404));
		}
		return res(ctx.status(200));
	}
);

export const failedUnitServer = setupServer(
	refreshTokenRequest,
	rest.get(`${hostApiArchives}unity/`, (req, res, ctx) =>
		res(ctx.status(404))
	)
);

export const failedDocumentSubjectServer = setupServer(
	refreshTokenRequest,
	rest.get(`${hostApiArchives}document-subject/`, (req, res, ctx) =>
		res(ctx.status(404))
	)
);

export const failedShelfServer = setupServer(
	refreshTokenRequest,
	rest.get(`${hostApiArchives}shelf/`, (req, res, ctx) =>
		res(ctx.status(404))
	)
);

export const failedRackServer = setupServer(
	refreshTokenRequest,
	rest.get(`${hostApiArchives}rack/`, (req, res, ctx) =>
		res(ctx.status(404))
	)
);

export const failedDocumentTypeServer = setupServer(
	refreshTokenRequest,
	rest.get(`${hostApiArchives}document-type/`, (req, res, ctx) =>
		res(ctx.status(404))
	)
);

export const failedAbbreviationServer = setupServer(
	refreshTokenRequest,
	rest.get(`${hostApiArchives}box-abbreviation/`, (req, res, ctx) =>
		res(ctx.status(404))
	)
);

export const server = setupServer(
	refreshTokenRequest,

	rest.get(`${hostApiArchives}document-subject/`, (req, res, ctx) =>
		res(
			ctx.json([
				{
					id: 34,
					subject_name: "subject_name_test",
					temporality: "2035-09-10",
				},
			])
		)
	),

	rest.get(`${hostApiArchives}unity/`, (req, res, ctx) =>
		res(
			ctx.json([
				{
					id: 38,
					telephone_number: "39",
					note: "unit_notes_test",
					unity_name: "sender_unit_name_test",
					unity_abbreviation: "unit_abbreviation_test",
					administrative_bond: "unit_administrative_bond_test",
					bond_abbreviation: "unit_bond_abbreviation_test",
					type_of_unity: "type_of_unit_test",
					municipality: "unit_municipality_test",
				},
				{
					id: 40,
					telephone_number: "41",
					note: "unit_notes_test_1",
					unity_name: "destination_unit_name_test",
					unity_abbreviation: "unit_abbreviation_test_1",
					administrative_bond: "unit_administrative_bond_test_1",
					bond_abbreviation: "unit_bond_abbreviation_test_1",
					type_of_unity: "type_of_unit_test_1",
					municipality: "unit_municipality_test_1",
				},
				{
					id: 41,
					telephone_number: "42",
					note: "unit_notes_test_2",
					unity_name: "unarchive_unit_name_test",
					unity_abbreviation: "unit_abbreviation_test_2",
					administrative_bond: "unit_administrative_bond_test_2",
					bond_abbreviation: "unit_bond_abbreviation_test_2",
					type_of_unity: "type_of_unit_test_2",
					municipality: "unit_municipality_test_2",
				},
			])
		)
	),

	rest.get(`${hostApiArchives}box-abbreviation/`, (req, res, ctx) =>
		res(
			ctx.json([
				{
					id: 43,
					number: 44,
					abbreviation: "abbreviation_test",
					name: "abbreviation_name_test",
					year: 2045,
				},
			])
		)
	),

	rest.get(`${hostApiArchives}shelf/`, (req, res, ctx) =>
		res(
			ctx.json([
				{
					id: 46,
					number: 47,
				},
			])
		)
	),

	rest.get(`${hostApiArchives}rack/`, (req, res, ctx) =>
		res(
			ctx.json([
				{
					id: 48,
					number: 49,
				},
			])
		)
	),

	rest.get(`${hostApiArchives}document-type/`, (req, res, ctx) =>
		res(
			ctx.json([
				{
					id: 34,
					document_name: "documentType_name_test",
					temporality: "2035-09-10",
				},
			])
		)
	),

	rest.get(
		`${hostApiArchives}year-by-abbreviation/:boxAbbreviation`,
		(req, res, ctx) =>
			res(
				ctx.json([
					{
						id: 43,
						number: 44,
						abbreviation: "abbreviation_test",
						name: "abbreviation_name_test",
						year: 2045,
					},
					{
						id: 44,
						number: 45,
						abbreviation: "abbreviation_test",
						name: "abbreviation_name_test",
						year: 2046,
					},
				])
			)
	),

	rest.get(
		`${hostApiArchives}number-by-year-abbrevation/:boxAbbreviation/:boxYear`,
		(req, res, ctx) =>
			res(
				ctx.json([
					{
						id: 43,
						number: 44,
						abbreviation: "abbreviation_test",
						name: "abbreviation_name_test",
						year: 2045,
					},
				])
			)
	),

	rest.post(`${hostApiArchives}frequency-relation/`, (req, res, ctx) => {
		if (
			req.body.process_number === "28" &&
			req.body.received_date === "2033-05-31" &&
			req.body.notes === "note_test"
		) {
			return res(ctx.status(201));
		}
		return res(ctx.status(404));
	}),

	rest.post(`${hostApiArchives}administrative-process/`, (req, res, ctx) => {
		if (req.body.process_number === "50") {
			return res(ctx.status(201));
		}
		return res(ctx.status(404));
	}),

	rest.post(`${hostApiArchives}box-archiving/`, (req, res, ctx) => {
		if (
			req.body.process_number === "3" &&
			req.body.sender_unity === 38 &&
			req.body.notes === "notes_test" &&
			req.body.received_date === "2006-05-04" &&
			req.body.document_url === "" &&
			req.body.cover_sheet === "" &&
			req.body.shelf_id === 46 &&
			req.body.rack_id === 48
		) {
			return res(ctx.status(201));
		}
		return res(ctx.status(404));
	}),

	rest.post(`${hostApiArchives}frequency-sheet/`, (req, res, ctx) => {
		if (req.body.person_name === "teste" && req.body.role === "teste") {
			return res(ctx.status(201));
		}
		return res(ctx.status(404));
	})
);
