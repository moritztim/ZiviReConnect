// path without any / or # at the end
switch (window.location.pathname.replace(/\/$|\/#/g, "")) {
	case "/zdp/einsatz":
		throw new Error("Not implemented");
}
