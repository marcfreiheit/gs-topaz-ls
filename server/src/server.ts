'use strict';

import {
	IPCMessageReader, IPCMessageWriter,
	createConnection, IConnection, 
	TextDocuments, InitializeResult, CompletionItem, CompletionItemKind, } from 'vscode-languageserver';

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
            hoverProvider: false // Todo: Set to true if hover feature is more advanced
        }
    };
});

connection.onCompletion((_): CompletionItem[] => {
	// The pass parameter contains the position of the text document in
	// which code complete got requested. For the example we ignore this
	// info and always provide the same completion items.
	return [
		{
			label: 'abort',
			kind: CompletionItemKind.Keyword,
            detail: `Aborts the current GemStone transaction. Your local variables (created with the define command) may no longer have valid definitions after you abort. 
            If your session is outside a transaction, use abort to give you a new view of the repository.
            This command cannot be abbreviated.`,
            data: 1
		},
		{
			label: 'allstacks',
            kind: CompletionItemKind.Keyword,
            detail: 'Print the stacks of all instances of GsProcess that are known to the ProcessorScheduler instance in the VM and stacks associated with previous topaz STACK SAVE commands.',
            data:  2
        },
        {
            label: 'begin',
            kind: CompletionItemKind.Keyword,
            detail: 'Begins a GemStone transaction. If the session is already in a transaction, this has the effect of an abort. The begin command is only useful if your session is not in automatic transaction mode, i.e., in manual or transactionless transaction mode.',
            data: 3
        },
        {
            label: 'break aSubCommand',
            filterText: 'break',
            kind: CompletionItemKind.Keyword,
            detail: `Establishes (or displays) a method breakpoint within your GemStone Smalltalk code. Subcommands are method, classmethod, list, enable, disable, and delete.`,
            data: 4
        },
        {
            label: 'category: aCategoryName',
            filterText: 'category:',
            kind: CompletionItemKind.Keyword,
            detail: `Sets the current category, the category for subsequent method compilations. If you try to compile a method without first selecting a category, the new method is inserted in the default category “as yet unspecified.” This command has the same effect as the set category: command.`,
            data: 5
        },
        {
            label: 'classmethod [: aClassName]',
            filterText: 'classmethod',
            kind: CompletionItemKind.Keyword,
            detail: ``,
            data: 6
        },
        {
            label: 'commit',
            kind: CompletionItemKind.Keyword,
            detail: ``,
            data: 7
        },
        {
            label: 'continue [anObjectSpec]',
            filterText: 'continue',
            kind: CompletionItemKind.Keyword,
            data: 8
        },
        {
            label: 'c [anObjectSpec]',
            filterText: 'c',
            kind: CompletionItemKind.Keyword,
            data: 8
        },
        {
            label: 'debugrun',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'define [aVarName [anObjectSpec [aSelectorOrArg]...]]',
            filterText: 'define',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'disassem[aClassParameter] aParamValue',
            filterText: 'disassem',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'display aDisplayFeature',
            filterText: 'display',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'doit',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'down [anInteger]',
            filterText: 'down',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'edit aSubCommandOrSelector [aSelector]',
            filterText: 'edit',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'errorcount',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'exec',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'exit[aSmallInt | anObjectSpec]',
            filterText: 'exit',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'exitifnoerror',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'expecterror anErrorCategory anErrorNumCls [anErrorArg[anErrorArg] ...]',
            filterText: 'expecterror',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'expectvalue anObjectSpec [anInt]',
            filterText: 'expectvalue',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'fileformat 8bit | utf8',
            filterText: 'fileformat',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'fileout [command] clsOrMethod [tofile: filename[format: fileformat]]',
            filterText: 'fileout',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'fr_cls [anInteger]',
            filterText: 'fr_cls',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'frame [anInteger]',
            filterText: 'frame',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'gcitrace aFileName',
            filterText: 'gcitrace',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'help [aTopicName]',
            filterText: 'help',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'hierarchy [aClassName]',
            filterText: 'hierachy',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'history [anInteger]',
            filterText: 'history',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'iferr bufferNumber [aTopazCommandLine]',
            filterText: 'iferr',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'iferr_clear',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'iferr_list',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'iferror [aTopazCommandLine]',
            filterText: 'iferror',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'implementors selectorSpec',
            filterText: 'implementors',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'input [aFileName | pop]',
            filterText: 'input',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'inspect [anObjectSpec]',
            filterText: 'inspect',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'interp',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'level anIntegerLevel',
            filterText: 'level',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'limit [bytes | oops | lev1bytes] anInteger',
            filterText: 'limit',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'list',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'listw',
            kind: CompletionItemKind.Keyword,
            data: 9
        },
        {
            label: 'l',
            kind: CompletionItemKind.Keyword,
            data: 9
        },
        {
            label: 'literals anObject',
            filterText: 'literals',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'loadua aFileName',
            filterText: 'loadua',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'login',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'logout',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'logoutifloggedin',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'lookup (meth | method | cmeth | cmethod) selectorSpec',
            filterText: 'lookup',
            kind: CompletionItemKind.Keyword,
            data: 10
        },
        {
            label: 'lookup className [class] selectorSpec',
            filterText: 'lookup',
            kind: CompletionItemKind.Keyword,
            data: 10
        },
        {
            label: 'method[: aClassName]',
            filterText: 'method',
            kind: CompletionItemKind.Keyword,
        },
        {
            label: 'nbresult',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'nbrun',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'nbstep',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'obj1anObjectSpec',
            filterText: 'obj1',
            kind: CompletionItemKind.Keyword,
            data: 11
        },
        {
            label: 'obj2 anObjectSpec',
            filterText: 'obj2',
            kind: CompletionItemKind.Keyword,
            data: 11
        },
        {
            label: 'obj1z anObjectSpec',
            filterText: 'obj1z',
            kind: CompletionItemKind.Keyword,
            data: 12
        },
        {
            label: 'obj2z anObjectSpec',
            filterText: 'obj2z',
            kind: CompletionItemKind.Keyword,
            data: 12
        },
        {
            label: 'object anObjectSpec [at: anIndex [put: anObjectSpec]]',
            filterText: 'object',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'omit aDisplayFeature',
            filterText: 'omit',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'output [push | append | pushnew | pop] aFileName [only]',
            filterText: 'output',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'pausefordebug [errorNumber]',
            filterText: 'pausefordebug',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'pkglookup (meth | method| cmeth| cmethod) selectorSpec',
            filterText: 'pkglookup',
            kind: CompletionItemKind.Keyword,
            data: 13
        },
        {
            label: 'pkglookup className [class] selectorSpec',
            filterText: 'pkglookup',
            kind: CompletionItemKind.Keyword,
            data: 13
        },
        {
            label: 'printit',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'protectmethods',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'quit [aSmallInt | anObjectSpec]',
            filterText: 'quit',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'releaseall',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'remark commentText',
            filterText: 'remark',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'removeallclassmethods [aClassName]',
            filterText: 'removeallclassmethods',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'removeallmethods [aClassName]',
            filterText: 'removeallmethods',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'run',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'send anObjectSpec aMessage',
            filterText: 'send',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'senders selectorSpec',
            filterText: 'senders',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'set aTopazParameter [aParamValue]',
            filterText: 'set',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'shell [aHostCommand]',
            filterText: 'shell',
            kind: CompletionItemKind.Keyword,
            data: 14
        },
        {
            label: 'spawn [aHostCommand]',
            filterText: 'spawn',
            kind: CompletionItemKind.Keyword,
            data: 14
        },
        {
            label: 'stack [aSubCommand]',
            filterText: 'stack',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'status',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'step (over | into | thru)',
            filterText: 'step',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'stk [aSubCommand]',
            filterText: 'stk',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'strings selectorSpec',
            filterText: 'strings',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'stringsic selectorSpec',
            filterText: 'stringsic',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'subclasses [aClassName]',
            filterText: 'subclasses',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'temporary [aTempName[/anInt] [anObjectSpec] ]',
            filterText: 'temporary',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'thread [anInt] [clear]',
            filterText: 'thread',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'threads [clear]',
            filterText: 'threads',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'time',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'unprotectmethods',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'up [anInteger]',
            filterText: 'up',
            kind: CompletionItemKind.Keyword
        },
        {
            label: 'where [anInteger | aString]',
            filterText: 'where',
            kind: CompletionItemKind.Keyword
        }
	];
});

// additional information about selected item
connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
	if (item.data === 8) {
        item.detail = `Attempts to continue GemStone Smalltalk execution on the active call stack after encountering a breakpoint, a pause message, or a user-defined error. The call stack becomes active, and the continue command becomes accessible, when you execute GemStone Smalltalk code containing a breakpoint.`;
	} else if (item.data === 9) {
		item.detail = 'For the method implied by the current stack frame, limit the list to the number of source lines defined by the set listwindow command. The list is centered around the current insertion point for the frame.';
	} else if (item.data === 10) {
        item.detail = '';
    } else if (item.data === 11) {
        item.detail = `Equivalent to the object command, but with the following difference: results are displayed
        at level 1 (if obj1) or level 2 (if obj2), with offsets of instance variables shown as onebased. After execution, previous settings for level and omit|display zerobased are restored.
        These commands cannot be abbreviated.`;
    } else if (item.data === 12) {
        item.detail = `Equivalent to the object command, but with the following difference: results are displayed at level 1 (if obj1) or level 2 (if obj2), with offsets of instance variables shown as zerobased. After execution, previous settings for level and omit|display zerobased are restored.
        These commands cannot be abbreviated.`;
    } else if (item.data === 13) {
        item.detail = `Similar to the lookup command, but with one key exception: pkglookup looks first in GsPackagePolicy state, then in the persistent method dictionaries for each class up the hierarchy. The pkglookup command does not look at transient (session method) dictionaries.`;
    } else if (item.data === 14) {
        item.detail = `When issued with no parameters, this command creates a child process in the host operating system, leaving you at the operating system prompt. To get back into Topaz, exit the command shell by typing Control-D (from the UNIX Bourne or Korn shells), typing logout (from the UNIX C shell), or typing exit (from a DOS shell).`;
    }
	return item;
});

//connection.onHover((_textDocumentPosition: TextDocumentPositionParams) => {
//    fs.readFileSync(_textDocumentPosition.textDocument.uri);
//    
//    return undefined;
//});

connection.listen();