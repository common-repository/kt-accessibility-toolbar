jQuery(document).ready(function ($) {

    $(document).ajaxStop(function(){
       kuSetting(); 
    });

    const html_element = "h1,h2,h3,h4,h5,h6,div,p,section";
    $('.accessbility-btn, .close-btn').click( function(event){
        event.preventDefault();
        $('.kuware-wrapper').toggle();
        kuSetting();     
    }); 

    var resize = new Array('.ku-style');
    resize = resize.join(',');

    //resets the font size when "reset" is clicked
    var resetFont = $(resize).css('font-size');

    $(".ku-reset").click(function() {
        $('#ku-font-size').remove();
        $('#ku-letter-spacing').remove();
        $('#ku-line-height').remove();
        $('#ku-word-spacing').remove();
        $('#ku-zoom').remove();
        $('#ku-color-contras').remove();
        $('body').removeClass("ku-body-align-left");
        $('body').removeClass("ku-body-align-right");
        $('body').removeClass("ku-body-cognitive-load"); 
        localStorage.clear();
        $('.zoom-increase').attr("data-zoom","100");
        $('.kuware-active').removeClass("kuware-active");
    });
    //increases font size when "+" is clicked
    $(".font-increase").click(function() {     
        changeStyle('font-size',10); 
        saveactive('font-icon','font-increase');        
    });
    //decrease font size when "-" is clicked
    $(".font-decrease").click(function() {        
        changeStyle('font-size',-10);   
        saveactive('font-icon','font-decrease');     
    });
    //line-height
    $(".line-height-increase").click(function() {
        changeStyle('line-height',10); 
        saveactive('line-icon','line-height-increase');     
    });
    $(".line-height-decrease").click(function() {
        changeStyle('line-height',-10);
        saveactive('line-icon','line-height-decrease');         
    }); 
    // letter-spacing
    $(".letter-spacing-increase").click(function() {
        changeStyle('letter-spacing',1);
        saveactive('letter-icon','letter-spacing-increase');         
    });

    $(".letter-spacing-decrease").click(function() {
        changeStyle('letter-spacing',-1);    
        saveactive('letter-icon','letter-spacing-decrease');            
    });  
    //word-spacing
    $(".word-spacing-increase").click(function() {
        changeStyle('word-spacing',1); 
        saveactive('word-icon','word-spacing-increase');  
    });

    $(".word-spacing-decrease").click(function() {
        changeStyle('word-spacing',-1);
        saveactive('word-icon','word-spacing-decrease');   
    });  

    function changeStyle(element_name,element_value){
        if(element_name =='font-size'){
            var datasize = $('#ku-font-size').data("size");      
            if (datasize == undefined) {
              var orgsize = 100+element_value;
            } else {
              var orgsize = datasize+element_value;
            }
            var newFontSize = parseInt(orgsize);
            var e = ".ku-style { "+element_name+": " + newFontSize + "% !important}";
            $('#ku-'+element_name).remove();
            var f = '<style data-size ='+orgsize+' id="ku-'+element_name+'">' + e + '</style>';
        }else if(element_name =='line-height'){
            var datasize = $('#ku-line-height').data("size");      
            if (datasize == undefined) {
                if(element_value =='10'){
                    var orgsize = 200+element_value;
                }else{
                    var orgsize = 150+element_value;
                }              
            } else {
              var orgsize = datasize+element_value;
            }
            var newFontSize = parseInt(orgsize);
            var e = ".ku-style { "+element_name+": " + newFontSize + "% !important}";
            $('#ku-'+element_name).remove();
            var f = '<style data-size ='+orgsize+' id="ku-'+element_name+'">' + e + '</style>';
        }else{
            var originalFontSize = $(resize).css(element_name);
            var originalFontNumber = parseFloat(originalFontSize, 10);
            var newFontSize = parseInt(originalFontNumber+element_value); 
            var e = ".ku-style { "+element_name+": " + newFontSize + "px !important}";
            $('#ku-'+element_name).remove();
            var f = '<style id="ku-'+element_name+'">' + e + '</style>';
        }       
        
        
        $('head').append(f);
        saveStyle('ku-'+element_name, e);
        return false;          
    }

    //var zoom = 100;        
    $('.zoom-increase').on('click', function(){
        $(".zoom-icon.kuware-active").removeClass("kuware-active");
        $(this).addClass("kuware-active");
        var dataZoom = $('.zoom-increase').attr("data-zoom");
        var zoom = parseInt(dataZoom)+10;   
       // zoom += 10;     
        var e = 'body >:not(.ignore) { zoom: '+zoom+'% !important;-ms-zoom: zoom: '+zoom+'% !important;-moz-transform: scale(zoom: '+zoom+'%) !important;-moz-transform-origin: top center 0px !important; }';
        $('#ku-zoom').remove();
        var f = '<style id="ku-zoom">' + e + '</style>';
        $('head').append(f);
        saveStyle('ku-zoom', e);
        saveactive('zoom-icon','zoom-increase');   
        $(this).data("zoom"); 
        $('.zoom-increase').attr("data-zoom",zoom); //setter
        return false;          
    });
    $('.zoom-decrease').on('click', function(){
        $(".zoom-icon.kuware-active").removeClass("kuware-active");
        $(this).addClass("kuware-active");
        var dataZoom = $('.zoom-increase').attr("data-zoom");
        var zoom = parseInt(dataZoom)-10;   
        var e = 'body >:not(.ignore) { zoom: '+zoom+'% !important;-ms-zoom: zoom: '+zoom+'% !important;-moz-transform: scale(zoom: '+zoom+'%) !important;-moz-transform-origin: top center 0px !important; }';
        $('#ku-zoom').remove();
        var f = '<style id="ku-zoom">' + e + '</style>';
        $('head').append(f);
        saveStyle('ku-zoom', e);
        saveactive('zoom-icon','zoom-decrease');
        $('.zoom-increase').attr("data-zoom",zoom); 
        return false;           
    });

    $('.ku-contrast').on('click', function(){
        $('body').addClass('ku-color-contras'); 
        var style = $(this).attr( "style" );
        if (typeof style !== "undefined") 
        var e = 'body.ku-color-contras>:not(.ignore) a{color:#FFFFFF!important} body.ku-color-contras>:not(.ignore),body.ku-color-contras>:not(.ignore) div{' + style + '} body.ku-color-contras>:not(.ignore) section{' + style + '} body.ku-color-contras>:not(.ignore) nav{' + style + '} body.ku-color-contras>:not(.ignore) main{' + style + '} body.ku-color-contras>:not(.ignore) footer{' + style + '} body.ku-color-contras>:not(.ignore) header{' + style + '} body.ku-color-contras>:not(.ignore) button,body.ku-color-contras>:not(.ignore) input,body.ku-color-contras>:not(.ignore) select,body.ku-color-contras>:not(.ignore) table,body.ku-color-contras>:not(.ignore) td,body.ku-color-contras>:not(.ignore) textarea,body.ku-color-contras>:not(.ignore) th,body.ku-color-contras>:not(.ignore) tr,body.ku-color-contras>:not(.ignore) tt{border:1px solid #FFFFFF!important}body.ku-color-contras>:not(.ignore) select{color:#B43417!important}';
        $('#ku-color-contras').remove();
        var f = '<style id="ku-color-contras">' + e + '</style>';
        $('head').append(f);

        if ($("body").hasClass('ku-color-contras')) {
            localStorage.setItem('bodyclass', 'ku-color-contras');
            saveStyle('ku-color-contras', e);
        }else{
            localStorage.removeItem('bodyclass');
        }
        return false;      
    });

    var saveStyle = function (name, value) {
        var existing = localStorage.getItem('userstyle');
        existing = existing ? JSON.parse(existing) : {};
        existing[name] = value;
        localStorage.setItem('userstyle', JSON.stringify(existing));
    };

    var saveactive = function (name,value) {     
        $('.'+name+'.kuware-active').removeClass("kuware-active");
        $('.'+value).addClass("kuware-active");
        var existing = localStorage.getItem('activeclass');
        existing = existing ? JSON.parse(existing) : {};
        existing[name] = value;
        localStorage.setItem('activeclass', JSON.stringify(existing));
    };    

    $(".ku-align-left").click(function() {
        $(".left-align.kuware-active").removeClass("kuware-active");
        $(this).addClass("kuware-active");
        $('body').removeClass("ku-body-align-right");
        $('body').toggleClass('ku-body-align-left'); 

        if ($("body").hasClass('ku-body-align-left')) {
            localStorage.setItem('bodyclass', 'ku-body-align-left');
        }else{
            localStorage.removeItem('bodyclass');
        } 

    }); 

    $(".ku-right-align").click(function() {
        $(".left-align.kuware-active").removeClass("kuware-active");
        $(this).addClass("kuware-active");
        $('body').removeClass("ku-body-align-left");
        $('body').toggleClass('ku-body-align-right');  

        if ($("body").hasClass('ku-body-align-right')) {
            localStorage.setItem('bodyclass', 'ku-body-align-right');
        }else{
            localStorage.removeItem('bodyclass');
        } 
    });

    $(".ku-cognitive-load").click(function() {
        $('body').toggleClass('ku-body-cognitive-load'); 
        if ($("body").hasClass('ku-body-cognitive-load')) {
            $('.ku-cognitive-load').addClass('kuware-active'); 
            var existing = localStorage.getItem('bodyclass');
            var data = existing ? existing + ' ku-body-cognitive-load' : 'ku-body-cognitive-load';
            localStorage.setItem('bodyclass', data);
        }else{
            $('.ku-cognitive-load').removeClass('kuware-active'); 
            localStorage.removeItem('bodyclass');
        }  
    });
   
    if( window.localStorage )
      { 
        var userstyle = localStorage.getItem('userstyle');
        var activebtn = localStorage.getItem('activeclass');
        if(activebtn){
           $.each(JSON.parse(activebtn), function(idx, obj) {
                $('.'+obj).addClass('kuware-active'); 
            }); 
        }

        if(userstyle){           
            kuSetting(); 
            $(".kuware-accessiblity-content").toggle();
            $.each(JSON.parse(userstyle), function(idx, obj) {
                var f = '<style id="' + idx + '">' + obj + '</style>';
                $('head').append(f);
            });
        }

        if (localStorage.getItem("bodyclass") != null) {
            kuSetting(); 
            getclass = localStorage.bodyclass;
            $("body").addClass(getclass);

            if(getclass == 'ku-body-align-right ku-body-cognitive-load'){
                $('.ku-cognitive-load').addClass('kuware-active'); 
                $('.ku-right-align').addClass("kuware-active"); 
            }else if(getclass == 'ku-body-align-left ku-body-cognitive-load'){
                $('.ku-cognitive-load').addClass('kuware-active'); 
                $('.ku-align-left').addClass("kuware-active");
            }else if (getclass == 'ku-body-align-left') {
                $('.ku-align-left').addClass("kuware-active");  
            }else if(getclass == 'ku-body-align-right'){
                $('.ku-right-align').addClass("kuware-active"); 
            }else if(getclass == 'ku-body-cognitive-load'){
                $('.ku-cognitive-load').addClass('kuware-active');
            }
            
        }
    }

    function g(a) {
        for (var b, c = [], d = document.createTreeWalker(a, NodeFilter.SHOW_TEXT, null, !1); (b = d.nextNode()); ) c.push(b);
        return c;
    }
      
      function kuSetting() { 
        const html_element = "ul,p,li";
        for (var a = "SCRIPT STYLE SELECT OPTION IMG FRAMESET FRAME IFRAME NOSCRIPT BR BUTTON INPUT PATH B LI KU-SPAN".split(" "), b = g(document.getElementsByTagName("body")[0]), c = 0; c < b.length; c++) {
            var d = b[c];      
            if (null != d.parentNode) {                     
                    "IMG" == d.parentNode.nodeName;  
                    var e = a.indexOf(d.parentNode.nodeName) != -1,
                        f = d.parentNode.getAttribute("data-ignore"),
                        h = "" == d.nodeValue.trim();                  
                        

                     if (1 != e && f !='true' && 1 != h) {
                         $(html_element).addClass("ku-body-style"); 
                         d.parentNode.classList.add("ku-body-style");
                        var i = document.createElement("ku-span");
                        d.parentNode.replaceChild(i, d), (i.className = "ku-style"), i.appendChild(d.cloneNode());
                    }
            }            
        }
    }
    
});