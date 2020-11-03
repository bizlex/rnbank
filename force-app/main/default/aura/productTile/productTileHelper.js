({
    getProducts: function(component, event, selectedBrand, selectedCar) {
        var action = component.get("c.getProducts");
        action.setParams({
            "query": selectedBrand,
            "idCar": selectedCar
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "ERROR"){
                console.log('ERROR ttt ', response.getError()); 
                var er = response.getError();
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "message": er
                });                
            }
            if (component.isValid() && state === "SUCCESS"){
                var ret = response.getReturnValue();
                // console.log('ret', JSON.stringify(ret));
                component.set("v.products", ret);
            }
        });
        $A.enqueueAction(action); 

    },
})