// path without any / or # at the end
switch (window.location.pathname.replace(/\/$|\/#/g, "")) {
	case "/home":
		// Some actions may redirect the user to the blank "home" page.
		window.location.pathname = "/zdp";
		break;
	case "/zdp/einsatz":
		throw new Error("Not implemented");
}
