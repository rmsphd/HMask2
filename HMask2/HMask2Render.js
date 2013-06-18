function HMask2()
{
	this.AttachControl;
	this.Picture;
	this.Reverse;
	this.Signed;
	this.UnmaskedChars;
	this.UnmaskedValue;
	this.GetValue;
	this.AttachMethod;
	this.FixedChars;

	this.show = function()
	{
		///UserCodeRegionStart:[show] (do not remove this comment.)

        if (this.AttachMethod == 1 || this.AttachMethod == "1")              // Grid
        {
            var $this = this;
            var gridLoadFN = function () {
                $this.gridLoad($this.AttachControl);
            };
            gridLoadFN();
            gx.fx.obs.addObserver("grid.onafterrefresh", window, gridLoadFN);
        }
        else                                                                        // Comun
        {
            this.addMask(this.AttachControl);
        }


		
		
		
		///UserCodeRegionEnd: (do not remove this comment.)
	}
	///UserCodeRegionStart:[User Functions] (do not remove this comment.)

    this.gridLoad = function (el) {
        var continua = true;
        var contadorString;
        var novoEl;
        var campo;
        var contador = 1;
        while (continua) {
            contadorString = ("000" + contador).slice(-4);
            novoEl = el.substr(0, el.length - 5) + "_" + contadorString;
            campo = gx.dom.el(novoEl);
            if (campo && campo != "") {
                this.addMask(novoEl);
                contador++
            } else {
                continua = false
            }
        }
    };

    this.addMask = function(el)
    {
        var objatt = gx.dom.el(el);
        var valatt = objatt.value == "0,0" ? "" : (objatt.value == null ? objatt.innerHTML : objatt.value) ;
        var sigatt = (this.Signed == "true" || this.Signed == true) ? true : false ;
        var pictatt = this.Picture;
        var lenatt = pictatt.length;
        var revatt = (this.Reverse == "true" || this.Reverse == true) ? true : false ;
        var fixatt = (this.FixedChars && this.FixedChars != "") ? this.FixedChars : "[(),.:/ -]";

        var p2att = "";
        var defatt = "";

        if (revatt) {
            var posi = 0;
            var proc = true;
            defatt = "+";
            for (var i=lenatt-1;i>=0;i--) {
                p2att += pictatt.substr(i,1);
                if (proc && pictatt.substr(i,1) == "9") {
                    posi++;
                } else {
                    proc = false
                }
            }
            pictatt = p2att;
            if (valatt < 0) {
                defatt = "-";
            }
            var ltaa = valatt.length;
            var posj = 0;
            for (var j=ltaa-1;j>=0;j--) {
                if (valatt.substr(j,1) >=0 && valatt.substr(j,1) <= 9) {
                    posj++;
                } else {
                    break;
                }
            }
            if (posj<posi) { // Falta zeros no decimal
                for ( var k = posj;k<posi;k++) {
                    valatt += "0";
                }
            }
        }

        var typatt = revatt ? 'reverse' : 'fixed';

        var idatt = el;

        var unval = (this.UnmaskedValue == "true" || this.UnmaskedValue == true) ? true : false ;
        //var ata = this.AttachAction;

        var objthis = this;

        jQuery(function($){
            try {
                $('#'+idatt).val(valatt);
            } catch (e) {}
            if (unval) {
                try {
                    $('#'+idatt)[0].onblur = null;
                } catch (e) {}
            }
            $('#'+idatt).setMask({mask:pictatt, type: typatt, defaultValue: defatt, signal: sigatt, fixedChars: fixatt, autoTab: false, changeMaxLength: false});
            try {
                $('#span_'+idatt).text($.mask.string( valatt, {mask:pictatt, type: typatt, defaultValue: defatt, signal: sigatt, autoTab: false, changeMaxLength: false} ));
            } catch (e) {}
            try {
                var objthis2 = objthis;
                GetGetValue(objthis2);
                $('#'+idatt).bind('blur',function(){GetGetValue(objthis2)});
            } catch (e) {}

        });


    };


	this.ChangePicture = function(pict)
	{
		this.Picture = pict;
		this.show();

	};

    window.GetGetValue = function(obj)
    {
        var objatt = gx.dom.el(obj.AttachControl);
        var retatt = "";
        if (objatt != null) {
            retatt = (objatt.value == null ? objatt.innerHTML : objatt.value);
        }

        var uchatt = obj.UnmaskedChars;

        var lenatt = uchatt.length;
        for (var i=0;i<lenatt;i++) {
            while (retatt.indexOf(uchatt.substr(i,1)) != -1) {
                retatt = retatt.replace(uchatt.substr(i,1), '');
            }
        }

        obj.GetValue = retatt;

    };

    window.HMAplicaClick = function($,nodes)
    {
        for (oath2 in nodes)
        {
            var oath = nodes[oath2];
            if (oath.onclick != null) {
                // var funcoath = oath.onclick;
                // alert(oath);
                oath.onclick = HMask2Change; //function(e) {HMask2Change(); funcoath();};
            }
            if (oath.childNodes != null) {
                HMAplicaClick($,oath.childNodes);
            }
        }
    };

    window.HMask2Change = function()
    {

        for (var uobj in this.parentGxObject.UserControls)
        {
            var obj = this.parentGxObject.UserControls[uobj];
            try {
                if (obj.UnmaskedValue == "true" || obj.UnmaskedValue == true) {
                    var objatt = gx.dom.el(obj.AttachControl);
                    var retatt = "";
                    if (objatt != null) {
                        retatt = (objatt.value == null ? objatt.innerHTML : objatt.value);
                    }

                    var uchatt = obj.UnmaskedChars;
                    var lenatt = uchatt.length;
                    for (var i=0;i<lenatt;i++) {
                        while (retatt.indexOf(uchatt.substr(i,1)) != -1) {
                            retatt = retatt.replace(uchatt.substr(i,1), '');
                        }
                    }
                    if (objatt != null) {
                        if (objatt.value = null) {
                            objatt.innerHTML = retatt;
                        } else {
                            objatt.value = retatt;
                        }
                    }
                }
            } catch (e) {}
        }
        return true;
    };


	
	
	
	///UserCodeRegionEnd: (do not remove this comment.):
}
