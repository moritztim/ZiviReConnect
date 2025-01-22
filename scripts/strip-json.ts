import { SEPARATOR as PATH_SEPARATOR } from "@std/path";
import { strip } from "@luxass/strip-json-comments";

import { diff } from "@libs/diff";
import { format, resolveConfig, resolveConfigFile } from "prettier";

const SCHEMA_KEY = "$schema";
const FILE_EXTENSION = /\.jsonc?$/;
const PATHS = { src: "src", dest: "dist" };

const root = Deno.cwd();

const diffOptions = { colors: true, context: 0 };
const prettierConfig = await resolveConfig(
	(await resolveConfigFile(root)) ?? `${root}/.prettierrc.yml`,
);

/** @returns Entries deleted */
function stripSchemaProperty(data: object, recursionCount = 0): number {
	if (SCHEMA_KEY in data) {
		delete data[SCHEMA_KEY];
		recursionCount++;
	}
	// for value in data
	Object.values(data).forEach((value) => {
		if (typeof value === "object") stripSchemaProperty(value);
	});

	return recursionCount;
}

async function stripJsonFiles(
	/** Path relative to src and dist dir*/ subPath: string = ".",
) {
	/** Path relative to {@linkcode root} */
	const pathFromRoot = [PATHS.src, subPath].join(PATH_SEPARATOR);

	for (const entry of Deno.readDirSync(pathFromRoot)) {
		if (entry.isFile && entry.name.match(FILE_EXTENSION)) {
			console.group(`Processing ${entry.name}...`);

			const source = await Deno.readTextFile(
				[root, pathFromRoot, entry.name].join(PATH_SEPARATOR),
			);

			let processed = strip(source, {
				trailingCommas: true,
				whitespace: false,
			});
			if (processed != source)
				console.log(
					`Removed ${source.length - processed.length} characters worth of comments and trailing commas`,
				);

			const data = JSON.parse(processed);
			const count = stripSchemaProperty(data);
			if (count > 0)
				console.log(
					`Removed ${count} instance${count > 1 ? "s" : ""} of "${SCHEMA_KEY}"`,
				);

			processed = await format(JSON.stringify(data), {
				parser: "json",
				...prettierConfig,
			});
			console.log(diff(source, processed, diffOptions));

			const outputFilePath = [
				root,
				PATHS.dest,
				subPath,
				entry.name.replace(FILE_EXTENSION, ".json"),
			].join(PATH_SEPARATOR);

			console.log(`Writing to ${outputFilePath}`);

			console.groupEnd();
			await Deno.mkdir([root, PATHS.dest, subPath].join(PATH_SEPARATOR), {
				recursive: true,
			});
			await Deno.writeTextFile(outputFilePath, processed);
		}
		if (entry.isDirectory) {
			console.group(`Entering ${entry.name}...`);
			stripJsonFiles([subPath, entry.name].join(PATH_SEPARATOR));
			console.groupEnd();
		}
	}
}

stripJsonFiles();
