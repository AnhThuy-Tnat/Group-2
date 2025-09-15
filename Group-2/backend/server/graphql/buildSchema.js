import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load tất cả .graphql
const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));
const typeDefs = mergeTypeDefs(typesArray);

// Load tất cả resolvers .js
const resolversArray = loadFilesSync(path.join(__dirname, './resolvers/**/*.js'));

const schema = makeExecutableSchema({
    typeDefs,
    resolvers: resolversArray,
});

export default schema;
