function redirect() {
	window.location.replace("https://ziviconnect.admin.ch/zdp")
}

// path without any / or # at the end
switch (window.location.pathname.replace(/\/$|\/#/g, "")) {
	case "/home":
		// Some actions may redirect the user to the blank "home" page.
		redirect();
		break;
	case "/zdp/einsatz":
		throw new Error("Not implemented");
}
