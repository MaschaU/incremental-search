(function(countries) {
    var len = countries.length;
    var field = $('input').eq(0);
    var results = $('#results');

    var lowerCaseCountries = countries.map(function(country) {
        return country.toLowerCase();
    });

    field.on('input', function() {
        findAndShowResults(this.value);
    }).on('focus', function() {
        findAndShowResults(this.value);
    }).on('blur', function() {
        results.hide();
    }).on('keydown', function(e) {
        if (results.css('display') != 'block') {
            return;
        }
        if (e.keyCode == 13) {
            handleResultClick(results.find('.highlighted'));
        } else if (e.keyCode == 38 || e.keyCode == 40) {
            handleArrowKey(e.keyCode);
            e.preventDefault();
        }
    });

    results.on('mouseover', '.result', function(e) {
        results.find('.highlighted').removeClass('highlighted');
        $(e.target).addClass('highlighted');
    }).on('mousedown', function(e) {
        handleResultClick($(e.target));
    });

    function findAndShowResults(val) {
        if (!val) {
            return results.hide();
        }
        var resultItems = findResults(val.toLowerCase());
        renderResults(resultItems);
    }

    function findResults(str) {
        var resultItems = [];
        for (var i = 0; i < len; i++) {
            if (!lowerCaseCountries[i].indexOf(str)) {
                if (resultItems.push(countries[i]) > 3) {
                    break;
                }
            }
        }
        return resultItems;
    }

    function renderResults(resultItems) {
        results.html(getResultsHtml(resultItems)).show();
    }

    function getResultsHtml(results) {
        var l = results.length;
        if (!l) {
            return '<em>No results</em>';
        }
        var html = '';
        for (var i = 0; i < l; i++) {
            html += '<div class="result" title="' + results[i] + '">' + results[i] + '</div>';
        }
        return html;
    }

    function handleArrowKey(keyCode) {
        var resultItems = $('.result');
        var l = resultItems.length;
        if (!l) {
            return;
        }
        var n = keyCode == 40 || -1;
        for (var i = 0; i < l; i++) {
            if (resultItems.eq(i).hasClass('highlighted')) {
                if (i + n < 0 || i + n > l - 1) {
                    return;
                }
                resultItems.eq(i).removeClass('highlighted');
                return resultItems.eq(i+n).addClass('highlighted');
            }
        }
        resultItems.eq(n == 1 ? 0 : l - 1).addClass('highlighted');
    }

    function handleResultClick(result) {
        if (!result.length) {
            return;
        }
        field.val(result.attr('title'));
        results.hide();
    }
})(["Afghanistan", "Albania", "Algeria", "American Samoa", "Angola", "Anguilla", "Antigua", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bonaire (Netherlands Antilles)", "Bosnia Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic of", "Cook Islands", "Costa Rica", "Croatia", "Curacao (Netherlands Antilles)", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iraq", "Ireland (Republic of)", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kosrae Island", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Lithuania", "Luxembourg", "Macau", "Macedonia (FYROM)", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Moldova", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Ponape", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Rota", "Russia", "Rwanda", "Saba (Netherlands Antilles)", "Saipan", "Samoa", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "South Africa", "South Korea", "Spain", "Sri Lanka", "St. Barthelemy", "St. Croix", "St. Eustatius (Netherlands Antilles)", "St. John", "St. Kitts and Nevis", "St. Lucia", "St. Maarten (Netherlands Antilles)", "St. Thomas", "St. Vincent and the Grenadines", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Tinian", "Togo", "Tonga", "Tortola", "Trinidad and Tobago", "Truk", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos", "Tuvalu", "US Virgin Islands", "Uganda", "Ukraine", "Union Island", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Gorda", "Wallis and Futuna", "Yap", "Yemen", "Zambia", "Zimbabwe"]);