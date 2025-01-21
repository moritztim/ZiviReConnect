function redirect() {
	window.location.replace("https://ziviconnect.admin.ch/zdp")
}

// remove preceding www. if exists
if (window.location.hostname.split("www.").pop() == "ezivi.admin.ch")
	// The host of the previous zivi portal just displays a 502 error page.
	redirect()
// path without any / or # at the end
switch (window.location.pathname.replace(/\/$|\/#/g, "")) {
	case "/home":
		// Some actions may redirect the user to the blank "home" page.
		redirect();
		break;
}
