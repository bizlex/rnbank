({
    doInit : function (component, event, helper) {
        var selectedBrand = component.get("v.selectedBrand");
        console.log('selectedBrand', selectedBrand);
        var selectedCar = component.get("v.selectedCar");
        console.log('selectedCar', selectedCar);
        helper.getProducts(component, event, selectedBrand, selectedCar);
    },

    changeProduct : function(component, event, helper) {
        // var selectedProductChecked = event.target.checked;
        // console.log('selectedProductChecked', selectedProductChecked);
        var selectedProductValue = event.target.value;
        console.log('selectedProductValue', selectedProductValue);
		component.set("v.selectedProduct", selectedProductValue);
        // console.log('v.selectedProduct', component.get("v.selectedProduct"));

	},
})