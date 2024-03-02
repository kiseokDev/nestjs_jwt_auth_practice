interface LoggerService {
	log(message: any, ...optionalParams: any[]): any;
	error(message: any, ...optionalParams: any[]): any;
	warn(message: any, ...optionalParams: any[]): any;
	debug?(message: any, ...optionalParams: any[]): any;
	verbose?(message: any, ...optionalParams: any[]): any;
	setLogLevels?(levels: _LOG_): any;
}

enum _LOG_ {
	debug = 0,
	verbose = 1,
	log = 2,
	warn = 3,
	error = 4,
}
