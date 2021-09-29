import { setupServer } from "msw/node";
import { rest } from "msw";

const hostApiArchives = `${process.env.REACT_APP_URL_API_ARCHIVES}`;

export const failedShelfServer = setupServer(
	rest.get(`${hostApiArchives}shelf/`, (req, res, ctx) =>
		res(res(ctx.status(404)))
	)
);

export const failedRackServer = setupServer(
	rest.get(`${hostApiArchives}rack/`, (req, res, ctx) =>
		res(res(ctx.status(404)))
	)
);

export const failedDocumentTypeServer = setupServer(
	rest.get(`${hostApiArchives}document-type/`, (req, res, ctx) =>
		res(res(ctx.status(404)))
	)
);

export const failedAbbreviationServer = setupServer(
	rest.get(`${hostApiArchives}box-abbreviation//`, (req, res, ctx) =>
		res(res(ctx.status(404)))
	)
);

export const server = setupServer(
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

	rest.post(`${hostApiArchives}frequency-relation/`, (req, res, ctx) =>
		// if (
		// 	req.body.process_number === "28" &&
		// 	req.body.notes === "n_test" &&
		// 	req.body.number === "27" &&
		// 	req.body.received_date === "" &&
		// 	req.body.reference_period === [] &&
		// 	req.body.sender_unit === 0 &&
		// 	req.body.abbreviation_id === 0 &&
		// 	req.body.shelf_id === 0 &&
		// 	req.body.rack_id === 0 &&
		// 	req.body.document_type_id === 0
		// ) {
		// 	return res(ctx.status(201));
		// }
		res(ctx.status(404))
	),

	rest.post(`${hostApiArchives}administrative-process/`, (req, res, ctx) => {
		if (
			req.body.notice_date === "2005-04-03" &&
			req.body.archiving_date === "2011-10-09" &&
			req.body.reference_month_year === "2015-04-01" &&
			req.body.process_number === "16" &&
			req.body.cpf_cnpj === "28293031323" &&
			req.body.interested === "interested_test" &&
			req.body.subject_id === 34 &&
			req.body.dest_unity_id === 40 &&
			req.body.sender_unity === 38 &&
			req.body.sender_user === "sender_worker_test" &&
			req.body.abbreviation_id === 43 &&
			req.body.shelf_id === 46 &&
			req.body.rack_id === 48 &&
			req.body.is_filed === false &&
			req.body.is_eliminated === false &&
			req.body.unity_id === 41 &&
			req.body.administrative_process_number === "50" &&
			req.body.send_date === "2055-09-08" &&
			req.body.notes === "notes_test"
		) {
			return res(ctx.status(201));
		}
		return res(ctx.status(404));
	}),

	rest.post(`${hostApiArchives}archival-relation/`, (req, res, ctx) =>
		// if (
		// 	req.body.box_list === [] &&
		// 	req.body.process_number === "3" &&
		// 	req.body.sender_unity === 38 &&
		// 	req.body.notes === "notes_test" &&
		// 	req.body.number === "2" &&
		// 	req.body.received_date === "2006-05-04" &&
		// 	req.number_of_boxes === "1" &&
		// 	req.body.abbreviation_id === 43 &&
		// 	req.body.shelf_id === 46 &&
		// 	req.body.rack_id === 48 &&
		// 	req.body.document_type_id === 34
		// ) {
		// 	return res(ctx.status(201));
		// }
		res(ctx.status(404))
	)
);
