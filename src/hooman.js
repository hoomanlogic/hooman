/********************************************************************************
 * hooman.js (formerly hoomanlogic_py)
 * geoffrey floyd (geoffreyfloyd@hoomanlogic.com)
 *
 * Framework for building interfaces that accept text-based human language input.
 *
 * In its current state, it is limited in the recognition of human input, and is 
 * more akin to an intuitive command - line format than actual human language input 
 * in full sentence structure, but the framework is built the future of this in
 * mind, and as the framework becomes more 'intelligent', projects that implement 
 * this will need only minimal, if any, changes to their code.
 *******************************************************************************/
(function (factory) {
	module.exports = exports = factory();
}(function () {
	
	function createCommandInterface (cmdInterface) {
		// link the functions to eachother
		cmdInterface.command.interpret = cmdInterface.interpreter;
		cmdInterface.interpreter.translate = cmdInterface.command;
		return cmdInterface.command;
	}

	function stripQuotes (token) {
		var quotes = ['"', "'"];
		if (token !== null && token.length > 2 && quotes.indexOf(token.slice(0, 1)) > -1 && quotes.indexOf(token.slice(-1)) > -1 && token.slice(0, 1) === token.slice(-1)) {
			return token.slice(1, token.length - 1);
		}
		else {
			return token;
		}
	}

	function tokenize (cmd) {
		var tokenPattern = /\{([^\}]*)\}|[^\s"']+|"([^"]*)"|'([^']*)/g;
		var tokens = cmd.match(tokenPattern);
		var match;

		tokens = tokens.map(function (token) {
			return stripQuotes(token);
		});

		return tokens;
	}

	return {
		createCommandInterface: createCommandInterface,
		stripQuotes: stripQuotes,
		tokenize: tokenize
	};

}));
