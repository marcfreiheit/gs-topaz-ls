'use strict';

import {
	IPCMessageReader, IPCMessageWriter,
	createConnection, IConnection, 
	TextDocuments, InitializeResult, TextDocumentPositionParams, CompletionItem, CompletionItemKind
	} from 'vscode-languageserver';

//import * as fs from 'fs';
//import * as path from 'path';

let connection: IConnection = createConnection(new IPCMessageReader(process), new IPCMessageWriter(process));


let documents: TextDocuments = new TextDocuments();

documents.listen(connection);


connection.onInitialize((_): InitializeResult => {

    return {
        capabilities: {
            textDocumentSync: documents.syncKind,
            completionProvider: {
                resolveProvider: true
            },
            hoverProvider: true
        }
    }
})

connection.onCompletion((_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
	// The pass parameter contains the position of the text document in
	// which code complete got requested. For the example we ignore this
	// info and always provide the same completion items.
	return [
		{
			label: 'TypeScript',
			kind: CompletionItemKind.Text,
			data: 1
		},
		{
			label: 'JavaScript',
			kind: CompletionItemKind.Text,
			data: 2
		}
	]
});

connection.listen();