var app = {
    init: function() {
        console.log();

        $('#euro').val('');

        app.addSelectDevise();

        $('#euro').on('keyup',app.deviseEuroInput);

        $('#menu').on('change',app.deviseEuroInput);

    },

    deviseEuroInput: function(){
        var $euroValue = $('#euro').val();

        if($.isNumeric($euroValue) == true || $euroValue == ''){
            app.selectedDevise($euroValue);
        } else {
            $('[name="euro"]').val('');
        }
    },

    addSelectDevise:function() {
        $.ajax({
            url: 'http://data.fixer.io/api/symbols?access_key=8888fddc3f909413b2f6da69510ad178&format=1',
            method: 'GET', 
            dataType: 'json',
        }).done(function (response) { 

            var country = response.symbols;
            
            for(var key in country){
                $('#menu').append($('<option>', {
                    value: key,
                    text: country[key]
                }));
            }
        }).fail(function () { 
            alert('Erreur');
        });

        var codeDevise = $('#menu').val();

        app.convertIsoFlag(codeDevise);

        return codeDevise;
    },
        
    selectedDevise: function(euro){
        var inputValue = euro;

        var devise = app.addSelectDevise();

        $.ajax({
            url: 'http://data.fixer.io/api/latest?access_key=8888fddc3f909413b2f6da69510ad178&base=EUR&symbols='+devise ,
            method: 'GET', 
            dataType: 'json',
        }).done(function (response) { 
            var rate = response.rates;
            var result = inputValue * rate[devise];
            $('.result').text(result.toFixed(3));

        }).fail(function () { 
            alert('Erreur');
        });
        
    },
    
    convertIsoFlag:function(code){
        var selectedCountryDevise = code;
        
        $.ajax({
            url: 'iso3.json' ,
            method: 'GET', 
            dataType: 'json',
        }).done(function (response) {
            for(var i in response){
                if(response[i] === selectedCountryDevise){    
                    response[i] = i;
                    $('#flag').html('<img src="https://www.countryflags.io/'+i+'/flat/32.png">');  
                }
            }                 
        }).fail(function () { 
            alert('Erreur');
        });        
    }        
};
$(app.init);
