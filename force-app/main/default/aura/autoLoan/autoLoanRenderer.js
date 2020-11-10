({

    rerender : function(component, helper){
        this.superRerender();

        if(component.get("v.isJqueryLoaded") && component.get("v.needToProcessReRenderLogic")) {
            console.log('getMaskrerender');
            var input = document.querySelector('.tel-mobile');
            $(function(){
                $(input).mask("+7 (999) 999-99-99");
            });

            //Finally set the needToProcessReRenderLogic to false, since rerender will be called multiple times
            //component.set("v.needToProcessReRenderLogic",false); // this will not fire rerender again
        }
    }

})