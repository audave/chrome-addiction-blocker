console.log('this is a test.mmm')

chrome.storage.sync.get(['sites'], function (items) {
    // message('Settings retrieved', items);
    console.log(items);

    items.sites.forEach(function (currentValue, index, arr) {
        console.log(currentValue);
        console.log(window.location.hostname);
        if (currentValue === window.location.hostname) {
            console.log('some string');
            $('body').css('background-color', 'red');

            $("body").append ('<h1>Going to do something funky</h1>');
        }
    });

});


/**
 * List of annoyances
 *
 * Greyscale
 * wait period
 * auto logout
 *
 */