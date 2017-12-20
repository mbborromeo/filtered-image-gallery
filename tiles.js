( function(){ //IIFE means this will immediately invoke
    var $tilePlaceholder = $("#tile-placeholder");
    var $tiles = $("#tile-placeholder .tile"); //store all tiles
    var $buttons = $("#tile-buttons"); //buttons div
    var tagged = {}; //plain JS object/array
    
    $tiles.each( function(){
        var currentTile = this; //reference to .tile div element
        console.log("currentTile is: " + currentTile );
        var tags = $( this ).data("tags"); //get the elements data-tags String value using jQuery data()
        console.log( "tags is: " + tags );

        if( tags ){ //if elements actually has tags value
            //use .trim() to remove whitespace from beginning and end of string
            tags.split(",").forEach( function(t){
                console.log("tags split forEach tagged[t] is " + tagged[t] );
                var tTrimmed = t.trim();
                if( tagged[tTrimmed] == null ){
                    tagged[tTrimmed] = [];
                }
                tagged[tTrimmed].push( currentTile );
            } );
        }
    } );
    
    //if you want to order tags in tagged object alphabetically, may have to use array instead of object
    //as tagged.sort() will not work...
    
    /* Create buttons */
    //buttons 'Show All' code
    $('<button />', {
        text: 'Show All',
        class: 'active',
        click: function(){
            console.log("All button was clicked");
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            $tiles.show();            
        }
    }).appendTo( $buttons );
    
    //iterate over each entry in the array 'tagged' to create the rest of the buttons
    $.each( tagged, function(tagName){
            $(  "<button />", {
                text: tagName + ' (' + tagged[tagName].length + ')',
                click: function(){
                    console.log("other button was clicked");
                    $(this).addClass('active');
                    $(this).siblings().removeClass('active');
                    
                    //for each .tile in $tiles, hide it, then apply filter check, then show it
                    $tiles.hide().filter( tagged[tagName] ).show(); 
                }//end click
            }).appendTo( $buttons );      
    });//end anonymous function/end each
    
}() );
