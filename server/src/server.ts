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
		},
		{
			label: 'allstacks',
            kind: CompletionItemKind.Keyword,
            detail: 'Print the stacks of all instances of GsProcess that are known to the ProcessorScheduler instance in the VM and stacks associated with previous topaz STACK SAVE commands.',
        },
        {
            label: 'begin',
            kind: CompletionItemKind.Keyword,
            detail: 'Begins a GemStone transaction. If the session is already in a transaction, this has the effect of an abort. The begin command is only useful if your session is not in automatic transaction mode, i.e., in manual or transactionless transaction mode.',
        },
        {
            label: 'break aSubCommand',
            filterText: 'break',
            insertText: 'break ',
            kind: CompletionItemKind.Keyword,
            detail: `Establishes (or displays) a method breakpoint within your GemStone Smalltalk code. Subcommands are method, classmethod, list, enable, disable, and delete.`,
        },
        {
            label: 'category: aCategoryName',
            filterText: 'category:',
            insertText: 'category: ',
            kind: CompletionItemKind.Keyword,
            detail: `Sets the current category, the category for subsequent method compilations. If you try to compile a method without first selecting a category, the new method is inserted in the default category “as yet unspecified.” This command has the same effect as the set category: command.`,
        },
        {
            label: 'classmethod [: aClassName]',
            filterText: 'classmethod',
            insertText: 'classmethod',
            kind: CompletionItemKind.Keyword,
            detail: `Compiles a class method for the class whose name is given as a parameter. 
            The class of the method you compile is automatically selected as the current class. If you don’t supply a class name, the method is compiled for the current class (as defined by the most recent set class:, list categoriesin:, method:, classmethod:, removeAllMethods, removeAllClassMethods, or fileout class: command).`,
        },
        {
            label: 'commit',
            kind: CompletionItemKind.Keyword,
            detail: `Ends the current GemStone transaction and stores your changes in the repository. 
            This command cannot be abbreviated.`,
        },
        {
            label: 'continue [anObjectSpec]',
            filterText: 'continue',
            insertText: 'continue ',
            kind: CompletionItemKind.Keyword,
            data: 8
        },
        {
            label: 'c [anObjectSpec]',
            filterText: 'c',
            insertText: 'c ',
            kind: CompletionItemKind.Keyword,
            data: 8
        },
        {
            label: 'debugrun',
            kind: CompletionItemKind.Keyword,
            detail: `Like run, but sets flags so that execution will stop at the first step point within the source text. The text following the debugrun, and up to the first line that contains a % as the first character in the line, is sent to GemStone for execution as GemStone Smalltalk code.`
        },
        {
            label: 'define [aVarName [anObjectSpec [aSelectorOrArg]...]]',
            filterText: 'define',
            insertText: 'define ',
            kind: CompletionItemKind.Keyword,
            detail: `Defines local Topaz variables that allow you to refer to objects in commands such as send and object.
            All Topaz object specification formats are legal in define commands.`
        },
        {
            label: 'disassem[aClassParameter] aParamValue',
            filterText: 'disassem',
            insertText: 'disassem ',
            kind: CompletionItemKind.Keyword,
            detail: `The disassem command allows you to disassemble the specified GsNMethod, displaying the assembly code instructions.
            The disassem command is intended for use in a linked (topaz -l) session only. If the session is remote, the output goes to stdout of the remote Gem, which is the gem log.`
        },
        {
            label: 'display aDisplayFeature',
            filterText: 'display',
            insertText: 'display ',
            kind: CompletionItemKind.Keyword,
            detail: `The display and omit commands control the display of Gemstone Smalltalk objects and other features related to output.
            The display command turns on these display attributes, and the omit command turns them off.;`
        },
        {
            label: 'doit',
            kind: CompletionItemKind.Keyword,
            detail: `Sends the text following the doit command to the object server for execution and displays the OOP of the resulting object. If there is an error in your code, Topaz displays an error message instead of a legitimate result. GemStone Smalltalk text is terminated by the first line that contains a % as the first character in the line.`
        },
        {
            label: 'down [anInteger]',
            filterText: 'down',
            insertText: 'down ',
            kind: CompletionItemKind.Keyword,
            detail: `Moves the active frame down within the current stack, and displays the frame selected as a result. The optional argument anInteger specifies how many frames to move down. If no argument is supplied, the scope will go down one frame.
            The frame displayed includes parameters and temporaries for the frame, unlike the results displayed by stack down.`
        },
        {
            label: 'edit aSubCommandOrSelector [aSelector]',
            filterText: 'edit',
            insertText: 'edit ',
            kind: CompletionItemKind.Keyword,
            detail: `Allows you to edit GemStone Smalltalk source code. You can create or modify methods or blocks of code to be executed. You can also edit the text of the last run, printit, doit, method:, or classmethod: command.
            Before you can use this command, you must first establish the name of the host operating system editor you wish to use. You can do this by setting the host environment variable EDITOR or by invoking the Topaz set editorname command interactively or in your Topaz initialization file.
            Do not use the edit command for batch processing. Instead, use the method: and classmethod: commands to create methods in batch processes, and the run, printit or doit commands to execute blocks of code in batch.
            If you supply any parameter to edit, other than one of its subcommands, Topaz assumes that you are naming an existing instance method to be edited.`
        },
        {
            label: 'errorcount',
            kind: CompletionItemKind.Keyword,
            detail: `sessions since you started Topaz. This includes GemStone Smalltalk errors generated by compiling or a run or printit command, as well as errors in Topaz command processing.
            If expecterror is specified immediately before a compile or execute command (run, printit, doit, method:, classmethod:, send, or commit) and the expected error occurs during the compile or execute, the ErrorCount is not incremented. The ErrorCount is not reset by login, commit, abort, or logout.
            You can use the errorcount command at the topaz> prompt before you log in, as well as after login.`
        },
        {
            label: 'exec',
            kind: CompletionItemKind.Keyword,
            detail: `Sends the text following the exec command to GemStone for execution as GemStone Smalltalk code, and displays the result.
            The exec command, unlike related commands such as run and printit, accept text on the same line as the exec command itself, up to a % character on that line. If there is no % on the exec command line, subsequent lines are included as part of the Smalltalk code to be executed, up to a % character appearing as the first character in a line.`
        },
        {
            label: 'exit[aSmallInt | anObjectSpec]',
            filterText: 'exit',
            insertText: 'exit ',
            kind: CompletionItemKind.Keyword,
            detail: `Leaves Topaz, returning to the parent process or operating system. If you are still logged in to GemStone when you type exit, this aborts your transactions and logs out all active sessions.
            You can include an argument (a SmallInteger, or an object specification that resolves to a SmallInteger) to specify an explicit exitStatus for the Topaz process. If you do not specify an argument, the exitStatus will be either 0 (no errors occurred during Topaz execution) or 1 (there was a GCI error or the Topaz errorCount was nonzero). This command cannot be abbreviated.`
        },
        {
            label: 'exitifnoerror',
            kind: CompletionItemKind.Keyword,
            detail: `If there have been no errors — either GemStone Smalltalk errors or Topaz command processing errors — in any session since you started Topaz, this command has the same effect as exit 0. Otherwise, this command has no effect.
            This command cannot be abbreviated.`
        },
        {
            label: 'expecterror anErrorCategory anErrorNumCls [anErrorArg[anErrorArg] ...]',
            filterText: 'expecterror',
            insertText: 'expecterror ',
            kind: CompletionItemKind.Keyword,
            detail: `Specifies that the result of the following execution results in the specified answer (either a value or an error). If the expected result occurs, Topaz prints a confirmation message and increments the error count. 
            The expectbug command is intended for use in self-checking scripts to verify the existence of a known error. Only one expectbug command (at most) can be in effect during a given execution. Topaz honors the last expectbug command issued before the execution occurs. Expectbug can be used in conjunction with the expecterror and expectvalue commands—an expectbug command does not count against the maximum of five such expecterror and expectvalue commands permitted.`
        },
        {
            label: 'expectvalue anObjectSpec [anInt]',
            filterText: 'expectvalue',
            insertText: 'expectvalue ',
            kind: CompletionItemKind.Keyword,
            detail: `Indicates that the next compilation or execution is expected to result in the specified error. If the expected result occurs, Topaz reports the error in the conventional manner but does not increment its error count and allows execution to proceed without further action or comment.
            If the execution returns a result other than the expected error (including unexpected success), Topaz increments the error count and invokes any iferror actions that have been established.
            Up to five expecterror or expectvalue commands may precede an execution command. If the result of the execution satisfies any one of them, the error count variable is not incremented. This mechanism allows you to build self-checking scripts to check for errors that can’t be caught with GemStone Smalltalk exception handlers.
            expecterror must be reset for each command; it is only checked against a single return value. expecterror is normally used before the commands run, printit, doit, method:, classmethod:, commit, and send.You must also use it before executing continue after a breakpoint.`
        },
        {
            label: 'fileformat 8bit | utf8',
            filterText: 'fileformat',
            insertText: 'fileformat ',
            kind: CompletionItemKind.Keyword,
            detail: `This command controls the interpretation of Character data for input and fileout, to allow strings containing Characters with codepoints over 255 to be input and output.
            This is meaningful if you are using text that contains any Characters with values over 127. Characters 127 and below are 7-bit, and the code points are the same as the UTF-8 encoded values, and so are not affected by this setting.
            Characters in the range of 128-255 can be read and written with their 8-bit codepoints, or read and written encoded as UTF-8; these produce different results. So if such text is written as UTF8, it must be read in with a fileformat of UTF8 in order to get correct results, and similarly both written and read as 8-bit in order to recreate the same text.
            To avoid misinterpretation of fileouts, the fileout command writes a fileformat command at the start of the fileout. A fileformat command within a file only has effect within that file and any nested files.
            Note that this setting does not apply to files produced by the output command. output push, etc. write files in UTF-8 format, regardless of the setting for fileformat.`
        },
        {
            label: 'fileout [command] clsOrMethod [tofile: filename[format: fileformat]]',
            filterText: 'fileout',
            insertText: 'fileout clsOrMethod ',
            kind: CompletionItemKind.Keyword,
            detail: 'Writes out class and method information in a format that can be fed back into Topaz with the input command. Subcommands are used to specify whether to file out the entire class, or specific method or methods. If none of the defined subcommands follow the fileout, then the next word is assumed to be a selector for an instance method on the current class.'
        },
        {
            label: 'fr_cls [anInteger]',
            filterText: 'fr_cls',
            insertText: 'fr_cls ',
            kind: CompletionItemKind.Keyword,
            detail: `Similar to the frame command, but also displays OOPs of classes along with class names in the specified stack frames.
            This command cannot be abbreviated.`
        },
        {
            label: 'frame [anInteger]',
            filterText: 'frame',
            insertText: 'frame ',
            kind: CompletionItemKind.Keyword,
            detail: `Moves the active frame to the frame specified by anInteger, within the current stack, and displays the frame selected as a result. The display includes parameters and temporaries.
            If no argument is supplied, displays the current frame.`
        },
        {
            label: 'gcitrace aFileName',
            filterText: 'gcitrace',
            insertText: 'gcitrace ',
            kind: CompletionItemKind.Keyword,
            detail: `Turns GCI tracing on. Subsequent GCI calls are logged to the file aFileName. If aFileName is '' (empty string), then turns GCI tracing off.
            This command cannot be abbreviated.`
        },
        {
            label: 'help [aTopicName]',
            filterText: 'help',
            insertText: 'help ',
            kind: CompletionItemKind.Keyword,
            detail: 'Invokes a hierarchically-organized help facility that can provide information about all Topaz commands. Enter ? at a help prompt for a list of topics available at that level of the hierarchy. Help topics can be abbreviated to uniqueness.'
        },
        {
            label: 'hierarchy [aClassName]',
            filterText: 'hierachy',
            insertText: 'hierachy ',
            kind: CompletionItemKind.Keyword,
            detail: 'Prints the class hierarchy up to Object for the specified class. If you don’t specify a class, Topaz prints the hierarchy for the current class.'
        },
        {
            label: 'history [anInteger]',
            filterText: 'history',
            insertText: 'history ',
            kind: CompletionItemKind.Keyword,
            detail: 'Displays the specified number of recently executed commands, as listed in the Topaz line editor history. Has no effect if the line editor is not enabled. (Not available on Windows.)'
        },
        {
            label: 'iferr bufferNumber [aTopazCommandLine]',
            filterText: 'iferr',
            insertText: 'iferr ',
            kind: CompletionItemKind.Keyword,
            detail: `The iferr command works whenever an error is reported and the ErrorCount variable is incremented.
            This command saves aTopazCommandLine in the post-error buffer specified by bufferNumber as an unparsed Topaz command line. There are 10 buffers; bufferNumber must be a number between 1 and 10, inclusive.
            The post-error buffer commands apply under any of the following conditions:
            * an error occurs (other than one matching an expecterror command and other than one during parsing of the iferr command)
            * a result fails to match an expectvalue command
            * a result matches an expectbug command
            Whenever any of these conditions arise, any non-empty post-error buffers are executed. Execution starts with buffer 1, and proceeds to buffer 10, executing each non-empty posterror buffer in order.
            If an error occurs while executing one of post-error buffers, execution proceeds to the next non-empty post-error buffer. Error and result checking implied by display resultcheck, display errorcheck, expectvalue, etc., are not performed while executing from post-error buffers.
            If a post-error buffer contains a command that would terminate the topaz process, then later buffers will have no effect. If a post-error buffer contains a command that would terminate the session, execution later buffers will be attempted but they will not have a session, unless one of the contains “login”.
            To remove the contents of a specific post-error buffer, enter iferr bufferNumber without a final argument. The command iferr_clear will clear all buffers.
            The iferr_list command will display the contents of all post-error buffers.
            The following example uses expecterror to test for an error returned by the printit command. If Topaz finds one, it displays the active call stack for debugging. That behavior is specified by making the Topaz stack command an argument on the iferr command line.`
        },
        {
            label: 'iferr_clear',
            kind: CompletionItemKind.Keyword,
            detail: `The iferr_clear command clears all the post-error command buffers.
            This command cannot be abbreviated.`
        },
        {
            label: 'iferr_list',
            kind: CompletionItemKind.Keyword,
            detail: `The iferr_list command prints all the non-empty post-error command buffers.
            This command cannot be abbreviated.`
        },
        {
            label: 'iferror [aTopazCommandLine]',
            filterText: 'iferror',
            insertText: 'iferror ',
            kind: CompletionItemKind.Keyword,
            detail: `The iferror command saves aTopazCommandLine to the post-error command buffer 1, or when used without an argument, clearing buffer 1.`
        },
        {
            label: 'implementors selectorSpec',
            filterText: 'implementors',
            insertText: 'implementors ',
            kind: CompletionItemKind.Keyword,
            detail: 'Displays a list of all classes that implement the given selectorSpec (either a String or a Symbol).'
        },
        {
            label: 'input [aFileName | pop]',
            filterText: 'input',
            insertText: 'input ',
            kind: CompletionItemKind.Keyword,
            detail: `Controls the source from which Topaz reads input. Normally Topaz reads input from standard input (stdin). This command causes Topaz to take input from a file or device of your choice.
            If you specify a host environment name such as $HOME/foo.bar as the input file, Topaz expands that name to the full filename.
            If you don’t provide an explicit path specification, Topaz looks for the named input file in the directory where you started Topaz.`
        },
        {
            label: 'inspect [anObjectSpec]',
            filterText: 'inspect',
            insertText: 'inspect ',
            kind: CompletionItemKind.Keyword,
            detail: 'Sends the message describe to the designated object.'
        },
        {
            label: 'interp',
            kind: CompletionItemKind.Keyword,
            detail: `Sends the text following the interp command to GemStone for execution as GemStone Smalltalk code, and displays the result.
            If there is an error in your code, Topaz displays an error message instead of a legitimate result.
            GemStone Smalltalk text is terminated by the first line that contains a % as the first character in the line.`
        },
        {
            label: 'level anIntegerLevel',
            filterText: 'level',
            insertText: 'level ',
            kind: CompletionItemKind.Keyword,
            detail: 'Sets the Topaz display level; that is, this command tells Topaz how much information to include in the result display. A level of 1 (the default) means that the first level of instance variables within a result object will be displayed. Similarly, a level of 2 means that the variables within those variables will be displayed. Setting the level to 0 inhibits the display of objects (though object headers will still be displayed if you specify display oops). The maximum display level is 32767.'
        },
        {
            label: 'limit [bytes | oops | lev1bytes] anInteger',
            filterText: 'limit',
            insertText: 'limit ',
            kind: CompletionItemKind.Keyword,
            detail: `Tells Topaz how much of any individual object to display in GemStone Smalltalk results. The display can be limited by OOPs, to control the number of objects displayed (for example, the number of elements in a collection). It can also be limited by bytes, to control the number of bytes of byte objects, such as Strings, that are displayed.
            For example, limit bytes 100 would tell Topaz to only display 100 bytes of any String (or other byte object).
            A limit of 0 tells Topaz to not limit the size of the output. This is the default.
            If the amount that would be displayed is limited by limit bytes setting, the display indicates missing text using ...(NN more bytes). If the number of objects is limited by a limit oops setting, then it prints ... NN more instVars.`
        },
        {
            label: 'list',
            kind: CompletionItemKind.Keyword,
            detail: `The list command is used in conjunction with the set and edit commands to browse through dictionaries, classes, and methods in the repository. The list command is also useful in debugging.
            When no arguments are included on the command line, the list command lists the source code for the currently selected stack frame, as selected by the most recent up, down, or frame command.`
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
            insertText: 'literals ',
            kind: CompletionItemKind.Keyword,
            detail: 'Reports all methods in which anObject is contained as a literal reference. anObject is typically a String, Symbol, or Number.'
        },
        {
            label: 'loadua aFileName',
            filterText: 'loadua',
            insertText: 'loadua ',
            kind: CompletionItemKind.Keyword,
            detail: `Loads the application user action library specified by aFileName. This command must be used before login.
            This command cannot be abbreviated.
            User action libraries contained user-defined C functions to be called from GemStone Smalltalk. See the GemBuilder for C manual for information about dynamically loading user action libraries.`
        },
        {
            label: 'login',
            kind: CompletionItemKind.Keyword,
            detail: 'Lets you log in to a GemStone repository. Before you attempt to log in to GemStone, you’ll need to use the set command—either interactively or in your Topaz initialization file—to establish certain required login parameters.'
        },
        {
            label: 'logout',
            kind: CompletionItemKind.Keyword,
            detail: `Logs out the current GemStone session. This command aborts your current transaction. Your local variables (created with the define command) will no longer have valid definitions when you log in again.
            This command cannot be abbreviated.`
        },
        {
            label: 'logoutifloggedin',
            kind: CompletionItemKind.Keyword,
            detail: `If logged in, logs out the current GemStone session. If there is no current session, does not increment the Topaz error count.
            As with the logout command (page 110), this command aborts your current transaction. Your local variables (created with the define command) will no longer have valid definitions when you log in again.
            This command cannot be abbreviated.`
        },
        {
            label: 'lookup (meth | method | cmeth | cmethod) selectorSpec',
            filterText: 'lookup',
            insertText: 'lookup ',
            kind: CompletionItemKind.Keyword,
            data: 10
        },
        {
            label: 'lookup className [class] selectorSpec',
            filterText: 'lookup',
            insertText: 'lookup ',
            kind: CompletionItemKind.Keyword,
            data: 10
        },
        {
            label: 'method[: aClassName]',
            filterText: 'method',
            insertText: 'method ',
            kind: CompletionItemKind.Keyword,
            detail: 'Compiles an instance method for the class whose name is given as a parameter. The class of the method you compile will automatically be selected as the current class. If you don’t supply a class name, the method is compiled for the current class, as defined by the most recent set class:, list categoriesin:, method:, classmethod:, removeAllMethods, removeAllClassMethods, or fileout class: command.'
        },
        {
            label: 'nbresult',
            kind: CompletionItemKind.Keyword,
            detail: `Wait for and display the result of a previous nbrun call. This call may be preceded by a set session to switch to the session of an outstanding nbrun; otherwise, the current Topaz session is used.
            May be immediately preceded by expectvalue or expectbug, provided that the expect commands contain only Integers or numerically coded OOPS (i.e. @NNN), so that no GemStone code is executed before the nbresult.
            If the nbrun has compilation errors, those will be displayed by the nbresult. If there is no outstanding nbrun for the session the result is: [276 sz:0 cls: 76289 UndefinedObject] remoteNil
            Note that nonblocking operations do block in linked sessions, and in a linked session the result with no outstanding nbrun is nil, not remoteNil.
            This command is the equivalent of calling the GemBuilder for C function GciNbEnd.`
        },
        {
            label: 'nbrun',
            kind: CompletionItemKind.Keyword,
            detail: 'Similar to run, but execution is nonblocking, so the application can proceed with non-GemStone tasks while the expression is executed. To get the results of the execution, use nbresult.'
        },
        {
            label: 'nbstep',
            kind: CompletionItemKind.Keyword,
            detail: `Similar to step, but execution is nonblocking. To get the results of the execution, use nbresult.
            In a linked session, nbstep is blocking (necessarily). In this case a warning message is displayed.
            Should not be immediately preceded by expect commands, since this command has no result. May be followed by a set session and another nbrun or nbstep to start an execution in another session.
            This command is the equivalent of calling the GemBuilder for C function GciNbStep.`
        },
        {
            label: 'obj1 anObjectSpec',
            filterText: 'obj1',
            insertText: 'obj1 ',
            kind: CompletionItemKind.Keyword,
            data: 11
        },
        {
            label: 'obj2 anObjectSpec',
            filterText: 'obj2',
            insertText: 'obj2 ',
            kind: CompletionItemKind.Keyword,
            data: 11
        },
        {
            label: 'obj1z anObjectSpec',
            filterText: 'obj1z',
            insertText: 'obj1z ',
            kind: CompletionItemKind.Keyword,
            data: 12
        },
        {
            label: 'obj2z anObjectSpec',
            filterText: 'obj2z',
            insertText: 'obj2z ',
            kind: CompletionItemKind.Keyword,
            data: 12
        },
        {
            label: 'object anObjectSpec [at: anIndex [put: anObjectSpec]]',
            filterText: 'object',
            insertText: 'object ',
            kind: CompletionItemKind.Keyword,
            detail: `Provides structural access to GemStone objects, allowing you to peek and poke at objects without sending messages. The first anObjectSpec argument is an object specification in one of the Topaz object specification formats.
            You can use local variables (created with the define command) in object commands. The local definition of a symbol always overrides any definition of the symbol in GemStone. For example, if you defined the local variable thirdvar, and your UserGlobals dictionary also defined a GemStone symbol named thirdvar, the definition of that GemStone symbol would be ignored in object commands.`
        },
        {
            label: 'omit aDisplayFeature',
            filterText: 'omit',
            insertText: 'omit ',
            kind: CompletionItemKind.Keyword,
            detail: `The display and omit commands control the display of Gemstone Smalltalk objects and other features related to output.
            The display command turns on these display attributes, and the omit command turns them off.;`
        },
        {
            label: 'output [push | append | pushnew | pop] aFileName [only]',
            filterText: 'output',
            insertText: 'output ',
            kind: CompletionItemKind.Keyword,
            detail: `Controls where Topaz output is sent. Normally Topaz sends output to standard output (stdout): generally the topaz console. This command redirects all Topaz output to a file (or device) of your choice.
            If you specify a host environment name such as $HOME/foo.bar as the output file, Topaz expands that name to the full filename. If you don’t provide an explicit path specification, Topaz output is sent to the named file in the directory where you started Topaz.
            Output is written with UTF-8 encoding, regardless of the current state of fileformat.
            As the command names push and pop imply, Topaz can maintain a stack of up to 20 output files, with current interactions captured in each file.`
        },
        {
            label: 'pausefordebug [errorNumber]',
            filterText: 'pausefordebug',
            insertText: 'pausefordebug ',
            kind: CompletionItemKind.Keyword,
            detail: `Provided to assist internal debugging of a session.
            With no argument, this command has no effect.
            This command cannot be abbreviated.`
        },
        {
            label: 'pkglookup (meth | method| cmeth| cmethod) selectorSpec',
            filterText: 'pkglookup',
            insertText: 'pkglookup ',
            kind: CompletionItemKind.Keyword,
            data: 13
        },
        {
            label: 'pkglookup className [class] selectorSpec',
            filterText: 'pkglookup',
            insertText: 'pkglookup ',
            kind: CompletionItemKind.Keyword,
            data: 13
        },
        {
            label: 'printit',
            kind: CompletionItemKind.Keyword,
            detail: 'Sends the text following the printit command to GemStone for execution as GemStone Smalltalk code, and displays the result. If there is an error in your code, Topaz displays an error message instead of a legitimate result. GemStone Smalltalk text is terminated by the first line that contains a % as the first character in the line.'
        },
        {
            label: 'protectmethods',
            kind: CompletionItemKind.Keyword,
            detail: `After this command, all subsequent method compilations during the current session must contain either a <protected> or <unprotected> directive.
            Used for consistency checking in filein scripts.
            This command cannot be abbreviated.`
        },
        {
            label: 'quit [aSmallInt | anObjectSpec]',
            filterText: 'quit',
            insertText: 'quit ',
            kind: CompletionItemKind.Keyword,
            detail: `Leaves Topaz, returning to the operating system. If you are still logged in to GemStone when you type quit, this aborts your transaction and logs out all active sessions.
            You can include an argument (a SmallInteger, or an object specification that resolves to a SmallInteger) to specify an explicit exitStatus for the Topaz process. If you do not specify this argument, the exitStatus will be either 0 (no errors occurred during Topaz execution) or 1 (there was a GCI error or the Topaz errorCount was nonzero).
            This command cannot be abbreviated.`
        },
        {
            label: 'releaseall',
            kind: CompletionItemKind.Keyword,
            detail: `Empty Topaz's internal buffer of object identifiers (the export set). Objects are placed in the export set as a result of object creation and certain other object operations. releaseall is performed automatically prior to each run, doit, printit, or send.
            For more information, see the GemBuilder for C Manual. releaseall is equivalent to the GemBuilder for C call GciReleaseOops.`
        },
        {
            label: 'remark commentText',
            filterText: 'remark',
            insertText: 'remark ',
            kind: CompletionItemKind.Keyword,
            detail: `Begins a remark (comment) line. Topaz ignores all succeeding characters on the line.
            You can also use an exclamation point (!) or pound sign (#) as the first character in the line to signal the beginning of a comment.`
        },
        {
            label: 'removeallclassmethods [aClassName]',
            filterText: 'removeallclassmethods',
            insertText: 'removeallclassmethods ',
            kind: CompletionItemKind.Keyword,
            detail: `Removes all class methods from the class whose name you give as a parameter. The specified class automatically becomes the current class.
            If you don’t supply a class name, the methods are removed from the current class, as defined by the most recent set class:, list categoriesin:, method:, or classmethod: command.
            This command cannot be abbreviated.`
        },
        {
            label: 'removeallmethods [aClassName]',
            filterText: 'removeallmethods',
            insertText: 'removeallmethods ',
            kind: CompletionItemKind.Keyword,
            detail: `Removes all instance methods from the class whose name you give as a parameter. The specified class automatically becomes the current class.
            If you don’t supply a class name, the methods are removed from the current class, as defined by the most recent set class:, list categoriesin:, method:, or fileout class: command.
            This command cannot be abbreviated.`
        },
        {
            label: 'run',
            kind: CompletionItemKind.Keyword,
            detail: `Sends the text following the run command to GemStone for execution as GemStone Smalltalk code, and displays the result.
            If there is an error in your code, Topaz displays an error message instead of a legitimate result.
            GemStone Smalltalk text is terminated by the first line that contains a % as the first character in the line.`
        },
        {
            label: 'send anObjectSpec aMessage',
            filterText: 'send',
            insertText: 'send ',
            kind: CompletionItemKind.Keyword,
            detail: `Sends a message to an object.
            The send command’s first argument is an object specification identifying a receiver. The object specification is followed by a message expression built almost as it would be in GemStone Smalltalk, by mixing the keywords and arguments.
            There are some differences between send syntax and GemStone Smalltalk expression syntax. Only one message send can be performed at a time with send. Cascaded messages and parenthetical messages are not recognized by this command. Also, each item must be delimited by one or more spaces or tabs.
            All Topaz object specification formats are legal in send commands.
            If the configuration parameter GEM_NATIVE_CODE_ENABLED is set to FALSE, or if any breakpoints are set, execution defaults to interpreted mode. Otherwise, execution defaults to using native mode.
            For details about GemStone configuration parameters, see the System Administration Guide.`
        },
        {
            label: 'senders selectorSpec',
            filterText: 'senders',
            insertText: 'senders ',
            kind: CompletionItemKind.Keyword,
            detail: `Displays a list of all classes that are senders of the given selectorSpec (either a String or a Symbol).
            This command may use significant temporary object memory. Depending on your repository, you may need to increase the value of the GEM_TEMPOBJ_CACHE_SIZE configuration parameter beyond its default. For details about GemStone configuration parameters, see the System Administration Guide.`
        },
        {
            label: 'set aTopazParameter [aParamValue]',
            filterText: 'set',
            insertText: 'set ',
            kind: CompletionItemKind.Keyword,
            detail: `The set command allows you to set session-specific values for your topaz session. This includes the GemStone login parameters, and settings that affect your topaz user interface.
            You can combine two or more set items on one command line, and you can abbreviate token names to uniqueness.`
        },
        {
            label: 'shell [aHostCommand]',
            filterText: 'shell',
            insertText: 'shell ',
            kind: CompletionItemKind.Keyword,
            data: 14
        },
        {
            label: 'spawn [aHostCommand]',
            filterText: 'spawn',
            insertText: 'spawn ',
            kind: CompletionItemKind.Keyword,
            data: 14
        },
        {
            label: 'stack [aSubCommand]',
            filterText: 'stack',
            insertText: 'stack ',
            kind: CompletionItemKind.Keyword,
            detail: `Topaz can maintain up to 500 simultaneous GemStone Smalltalk process call stacks that provide information about the GemStone state of execution. Each call stack consists of a linked list of contexts.
            The call stack becomes active, and the stack command becomes accessible, when you execute GemStone Smalltalk code containing a breakpoint. The stack command allows you to examine and manipulate the contexts in the active call stack.
            Debugging usually proceeds on the active call stack, but you may also save the active call stack before executing other code, and return to it later.
            This command cannot be abbreviated.`
        },
        {
            label: 'status',
            kind: CompletionItemKind.Keyword,
            detail: 'Displays your current login settings and other information about your Topaz session.'
        },
        {
            label: 'step (over | into | thru)',
            filterText: 'step',
            insertText: 'step ',
            kind: CompletionItemKind.Keyword,
            detail: 'Advances execution to the next step point (assignment, message send, or method return) and halts. You can use the step command to continue execution of your GemStone Smalltalk code after an error or breakpoint has been encountered. For examples and other useful information, see Chapter 2, “Debugging Your GemStone Smalltalk Code”‚ starting on page 45.'
        },
        {
            label: 'stk [aSubCommand]',
            filterText: 'stk',
            insertText: 'stk ',
            kind: CompletionItemKind.Keyword,
            detail: `Similar to stack, but does not display parameters and temporaries for each frame. All frames for the active call stack are displayed, with the current active frame indicated by an arrow.
            This command cannot be abbreviated.`
        },
        {
            label: 'strings selectorSpec',
            filterText: 'strings',
            insertText: 'strings ',
            kind: CompletionItemKind.Keyword,
            detail: `Displays a list of all methods that contain the given selectorSpec (either a String or a Symbol) in their source string. Search is case-sensitive; for a case-insensitive search, see stringsic.
            This command cannot be abbreviated.`
        },
        {
            label: 'stringsic selectorSpec',
            filterText: 'stringsic',
            insertText: 'stringsic ',
            kind: CompletionItemKind.Keyword,
            detail: `Displays a list of all methods that contain the given selectorSpec (either a String or a Symbol) in their source string. Search is case-insensitive; for a case-sensitive search, see the strings command. 
            This command cannot be abbreviated.`
        },
        {
            label: 'subclasses [aClassName]',
            filterText: 'subclasses',
            insertText: 'subclasses ',
            kind: CompletionItemKind.Keyword,
            detail: 'Prints immediate subclasses of the specified class. If you don’t specify a class name, prints subclasses of the current class.'
        },
        {
            label: 'temporary [aTempName[/anInt] [anObjectSpec] ]',
            filterText: 'temporary',
            insertText: 'temporary ',
            kind: CompletionItemKind.Keyword,
            detail: `Displays or redefines the value of one or more temporary variables in the current frame of the current stack. For examples and other useful information, see Chapter 2, “Debugging
            All Topaz object specification formats (as described in “Specifying Objects” on page 39) are legal in temporary commands.`
        },
        {
            label: 'thread [anInt] [clear]',
            filterText: 'thread',
            insertText: 'thread ',
            kind: CompletionItemKind.Keyword,
            detail: 'Displays the currently selected GemStone process from among the stack saved from the last error, or from those retrieved by the most recent threads command.'
        },
        {
            label: 'threads [clear]',
            filterText: 'threads',
            insertText: 'threads ',
            kind: CompletionItemKind.Keyword,
            detail: 'Force any dirty instances of GsProcess cached in VM stack memory to be flushed to object memory.'
        },
        {
            label: 'time',
            kind: CompletionItemKind.Keyword,
            detail: `The first execution of time during the life of a topaz process displays current date and time from the operating system clock, total CPU time used by the topaz process.
            Subsequent execution of time will display in addition elapsed time since the previous time command, CPU time used by the topaz process since the previous time command.
            The time command can be executed when not logged in as well as after login.`
        },
        {
            label: 'unprotectmethods',
            kind: CompletionItemKind.Keyword,
            detail: `Cancels the effect of protectmethods, which is used for consistency checking in filein scripts.
            This command cannot be abbreviated.`
        },
        {
            label: 'up [anInteger]',
            filterText: 'up',
            insertText: 'up ',
            kind: CompletionItemKind.Keyword,
            detail: `In the current stack, change the current frame to be the caller of the current frame, and display the new selected frame. The optional argument anInteger specifies how many frames to move up. If no argument is supplied, the scope will go up one frame.
            The behavior is similar to stack up, except that stack up does not accept an argument, and the frame display for stack up does not includes parameters and temporaries for the frame.`
        },
        {
            label: 'where [anInteger | aString]',
            filterText: 'where',
            insertText: 'where ',
            kind: CompletionItemKind.Keyword,
            detail: 'Displays the current call stack, with one line per frame.'
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