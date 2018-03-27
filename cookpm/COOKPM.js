(function(){
	var jml = function (elName, atts, children) {'use strict';var el = typeof elName === 'string' ? document.createElement(elName) : elName;if (atts && Array.isArray(atts)) {children = atts;}else if (atts) {Object.keys(atts).forEach(function (att) {var attVal = atts[att];if (att === '$on') {return Object.keys(attVal).forEach(function(ev){var val = attVal[ev];val=(typeof val === 'function')?[val,false]:val;el.addEventListener(ev,val[0],val[1]);});}if(typeof attVal === 'object'){return Object.keys(attVal).forEach(function(prop) {el[att][prop.replace(/-([a-z])/g,function(n0, n1){return n1.toUpperCase();})]=attVal[prop];});}el.setAttribute(att, attVal);});}(children||[]).forEach(function(child){if(typeof child === 'string'){el.appendChild(document.createTextNode(child));}else {el.appendChild(jml.apply(null, child));}});return el;};
	var TITOLARE = "titolare";
	var TITOLOINFORMATIVA = "titoloinformativa";
	var SERVIZI = "servizi";
	var COOKIETECNICI = "cookietecnici";
	var INFOCOOKIE = "infocookie";
	var COOKIENAME = "cookieprivacysettings";
	var POLICYTITLE = "policytitle";
	var POLICYTEXT = "policytext";
	var OKACTIONTEXT = "okactiontext";
	var MOREACTIONTEXT = "moreactiontext";
	var SCROLLTIMEOUT = "scrolltimeout";
	var PROSEGUI = "prosegui";

	if(window.COOKPM) {
		return;
	}
	var _ = {};
	_.options = {};
	_.options[COOKIETECNICI] = [];
	_.options[SERVIZI] = [];
	_.options[TITOLOINFORMATIVA] = "Informativa estesa sui cookie";
	_.options[TITOLARE] = {"nominativo":"[INDICARE NOMITIVO]", "email":"[INDICARE EMAIL]"};
	_.options[INFOCOOKIE] = "I Cookie sono costituiti da porzioni di codice installate all'interno del browser che assistono il Titolare nell’erogazione del servizio in base alle finalità descritte. Alcune delle finalità di installazione dei Cookie potrebbero, inoltre, necessitare del consenso dell'Utente.";
	_.options[SCROLLTIMEOUT] = 500;
	_.options[POLICYTITLE] = 'Informativa';
	_.options[POLICYTEXT] = 'Questo sito o gli strumenti terzi da questo utilizzati si avvalgono di cookie necessari al funzionamento ed utili alle finalità illustrate nella cookie policy. Se vuoi saperne di più, consulta la privacy policy. Chiudendo questo banner, cliccando in un’area sovrastante o accedendo ad un’altra pagina del sito, acconsenti all’uso dei cookie.';
	_.options[OKACTIONTEXT] = 'Accetto';
	_.options[MOREACTIONTEXT] = 'Privacy policy';
	_.options[PROSEGUI] = "Proseguendo la navigazione o chiudendo la finestra presti il tuo consenso all’utilizzo di cookie.";
	_.getOption = function(op) {
		return _.options[op];
	};

	_.userAccepted = function(){
		return /__COOKPM=true/.test(document.cookie);
	};

	_.removeCookie = function(ev){
		document.cookie = '__COOKPM=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	};

	_.setOptions = function(ops) {
		for(var op in ops)
		_.setOption(op,ops[op]);
	};

	_.setOption = function(op,val) {
		_.options[op] = val;
	};

	var userAcceptImplicit = function(){
		userAccept();
	};
	var userAcceptExplicit = function(ev){
		if(ev && ev.preventDefault) {
			ev.preventDefault();
		}
		userAccept();
	};
	var userAccept = function(ev){
		if(_.userAccepted()) {
			return;
		}
		var exp = new Date();
		exp = new Date(exp.getTime() + 1000*60*60*24*365); // 365 days
		document.cookie = "__COOKPM=true; expires=" + exp.toGMTString() + ";";
		_.hideBanner();
		location.reload();
	};
	var hidePolicy = function(ev){
		if(ev && ev.preventDefault) {
			ev.preventDefault();
		}
		if (ev && ev.stopPropagation) {
			ev.stopPropagation();
		}
		if(document.querySelector("#COOKPM-MODALOVERLAY")) {
			document.querySelector("body").removeChild(document.querySelector("#COOKPM-MODALOVERLAY"));
		}
		userAcceptExplicit();		
	};
	_.showPolicy = function(ev){
		if(ev && ev.preventDefault) {
			ev.preventDefault();
		}
		window.location.href = '/privacy-policy';
	};
	var showBanner = function(){
		var x = document.createElement("a");
			x.innerHTML = "&times;";
			x.setAttribute("href","#");
			x.setAttribute("class","COOKPM-x");
			x.addEventListener('click',userAcceptExplicit);
		var body = document.querySelector("body");
		var banner = document.createElement("div");
			banner.setAttribute("id","COOKPM-BANNER");
		var policytitle = document.createElement("div");
			policytitle.setAttribute("class","COOKPM-policytitle");
			policytitle.innerHTML = _.getOption(POLICYTITLE);
		var policytext = document.createElement("div");
			policytext.setAttribute("class","COOKPM-policytext");
			policytext.innerHTML = _.getOption(POLICYTEXT);
		var actions = document.createElement("div");
			actions.setAttribute("class","COOKPM-actions");
		var okaction = document.createElement("button");
			okaction.setAttribute("class","COOKPM-okaction");
			okaction.innerHTML = _.getOption(OKACTIONTEXT);
			okaction.addEventListener('click',userAcceptExplicit);
		var moreaction = document.createElement("button");
			moreaction.setAttribute("class","COOKPM-moreaction");
			moreaction.innerHTML = _.getOption(MOREACTIONTEXT);
			moreaction.addEventListener("click",_.showPolicy);
		banner.addEventListener('click',function(ev) {
			if (!ev){
				ev = window.event;
			}
			//IE9 & Other Browsers
			if (ev.stopPropagation) {
				ev.stopPropagation();
			}
			//IE8 and Lower
			else {
				ev.cancelBubble = true;
			}
		});
		body.appendChild(banner);
		// banner.appendChild(policytitle);
		banner.appendChild(policytext);
		banner.appendChild(actions);
		actions.appendChild(okaction);
		actions.appendChild(moreaction);
		// policytitle.appendChild(x);
	};

	_.hideBanner = function(){
		if(document.querySelector("#COOKPM-BANNER")) {
			document.querySelector("body").removeChild(document.querySelector("#COOKPM-BANNER"));
		}
	};
	_.showBanner = function(){
		if(_.userAccepted()) {
			return;
		}
		if(document.querySelector("#COOKPM-BANNER")) {
			return;
		}
		showBanner();
	};
	if(!_.userAccepted()) {
		document.addEventListener("click",userAcceptImplicit);
	}

	window.COOKPM = _;
	document.addEventListener("DOMContentLoaded", function(event) {
		_.showBanner();
	});
})();
