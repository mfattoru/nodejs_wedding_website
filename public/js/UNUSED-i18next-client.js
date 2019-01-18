// console.log('loading the file');


// i18next
//     .use(i18nextXHRBackend)
//     .use(i18nextBrowserLanguageDetector)
//     .init({
//         fallbackLng: 'en',
//         debug: true,
//         backend: {
//         // load from i18next-gitbook repo
//         //   loadPath: 'https://raw.githubusercontent.com/i18next/i18next-gitbook/master/locales/{{lng}}/{{ns}}.json',
//         loadPath: 'locales/{{lng}}',
//         //   loadPath: 'https://raw.githubusercontent.com/mfattoru/nodejs_wedding_website/master/locales/{{lng}}.json',
//         crossDomain: true
//         }
//     });

    // jqueryI18next.init(i18nextInstance, $, {
	// 	tName: 't', // --> appends $.t = i18next.t
	// 	i18nName: 'i18n', // --> appends $.i18n = i18next
	// 	handleName: 'localize', // --> appends $(selector).localize(opts);
	// 	selectorAttr: 'data-i18n', // selector for translating elements
	// 	targetAttr: 'i18n-target', // data-() attribute to grab target element to translate (if different than itself)
	// 	optionsAttr: 'i18n-options', // data-() attribute that contains options, will load/set if useOptionsAttr = true
	// 	useOptionsAttr: false, // see optionsAttr
	// 	parseDefaultValueFromContent: true // parses default values from content ele.val or ele.text
	// 	});
    // }, function(err, t) {
    //     // init set content
    //     updateContent();
    // });


// just set some content and react to language changes
// could be optimized using vue-i18next, jquery-i18next, react-i18next, ...
// function updateContent() {
//   document.getElementById('title').innerHTML = i18next.t('title', { what: 'i18next' });
//   document.getElementById('saveBtn').innerHTML = i18next.t('button.save', { count: Math.floor(Math.random()*2+1)  });
  
//   document.getElementById('info').innerHTML = `detected user language: "${i18next.language}"  --> loaded languages: "${i18next.languages.join(', ')}"`;
// }

// function changeLng(lng) {
//   i18next.changeLanguage(lng);
// }

// i18next.on('languageChanged', () => {
//   updateContent();
// });
