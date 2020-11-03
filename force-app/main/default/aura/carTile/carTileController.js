({
    doInit : function (component, event, helper) {
        var selectedBrand = component.get("v.selectedBrand");
        console.log('selectedBrand', selectedBrand);
        var selectedCar = component.get("v.selectedCar");
        console.log('selectedCar', selectedCar);
        helper.getCars(component, event, selectedBrand, selectedCar);
        // helper.getCarById(component, event, selectedCar);
    },

    selectCar: function(component, event, helper) {
        var carId = event.currentTarget.dataset.car;
        console.log('carId =', carId);
        var carTileEvent = component.getEvent("carTileEvent");
        carTileEvent.setParams({
            "idByEvent" : carId
        });
        carTileEvent.fire();
        

    },
})