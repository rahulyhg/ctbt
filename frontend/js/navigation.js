// // var adminurl = "http://localhost:1337/";
// var adminurl = "http://192.168.2.25:1337/";
// if (isproduction) {
//     adminURL = "http://www.wohlig.co.in/demo/index.php";
// } else {
//     adminURL = "http://localhost/demo/index.php";
// }

var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
    var navigation = [{
        name: "Home",
        classis: "active",
        anchor: "home",
        subnav: [{
            name: "Subnav1",
            classis: "active",
            anchor: "home"
        }]
    }];

    return {
        getnav: function() {
            return navigation;
        },
        makeactive: function(menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },
        submitForm: function(mydata, callback) {
            $http({
                url: 'http://thebachelortrip.com/mail.php?name=' + mydata.name + '&email=' + mydata.email + '&mobile=' + mydata.mobile + '&message=' + mydata.message,
                method: 'GET',
                withCredentials: true,
                data: mydata
            }).then(callback);
        },

        HomeSlider: function(callback) {
            $http({
                url: adminurl + 'RestApi/getHomeContent',
                method: 'POST',
                withCredentials: true
            }).then(callback);
        },
        deleteAllCart: function(callback) {
            $http({
                url: adminurl + 'cart/deleteAllCart',
                method: 'POST',
                withCredentials: true
            }).then(callback);
        },
        deleteAllCartCustomisation: function(callback) {
            $http({
                url: adminurl + 'customisation/deleteAllCart',
                method: 'POST',
                withCredentials: true
            }).then(callback);
        },
        DestinationTitle: function(callback) {
            $http({
                url: adminurl + 'RestApi/DestinationTitle',
                method: 'POST',
                withCredentials: true
            }).then(callback);
        },
        getAllDest: function(callback) {
          // console.log(callback);
            $http({
                url: adminurl + 'RestApi/DestinationLand',
                method: 'POST',
                withCredentials: true
            }).then(callback);
        },
        whatsHot: function(callback) {
            $http({
                url: adminurl + 'RestApi/WhatsHot',
                method: 'POST',
                withCredentials: true
            }).then(callback);
        },
        DestinationLand: function(callback) {
            $http({
                url: adminurl + 'RestApi/DestinationLand',
                method: 'POST',
                withCredentials: true
            }).then(callback);
        },
        ActivityLand: function(callback) {
            $http({
                url: adminurl + 'RestApi/ActivitiesLand',
                method: 'POST',
                withCredentials: true
            }).then(callback);
        },
        subscribe: function(formData, callback) {

            $http({
                url: adminurl + 'subscribe/save',
                method: 'POST',

                data: formData

            }).then(callback);
        },

        cityDetails: function(id, callback) {
            var data = {
                id: id,
            };
            $http({
                url: adminurl + 'RestApi/DestinationPage',
                method: 'POST',
                withCredentials: true,
                data: data
            }).then(callback);
        },
        deleteCart: function(type, id, callback) {
            var data = {
                type: type,
                activities: id
            };
            var data1 = {
                type: type,
                package: id
            };
            var data2 = {
                type: type,
                whatshot: id
            };
            if (type == 'Activities') {
                $http({
                    url: adminurl + 'cart/deleteCart',
                    method: 'POST',
                    withCredentials: true,
                    data: data
                }).then(callback);
            } else if (type == 'Package') {
                $http({
                    url: adminurl + 'cart/deleteCart',
                    method: 'POST',
                    withCredentials: true,
                    data: data1
                }).then(callback);
            } else {
                $http({
                    url: adminurl + 'cart/deleteCart',
                    method: 'POST',
                    withCredentials: true,
                    data: data2
                }).then(callback);
            }


        },
        deleteCartCustomisation: function(type, id, callback) {
            var data = {
                type: type,
                activities: id
            };
            $http({
                url: adminurl + 'customisation/deleteCart',
                method: 'POST',
                withCredentials: true,
                data: data
            }).then(callback);
        },
        ActivitiesImages: function(id, callback) {
            var data = {
                destination: id,
            };
            $http({
                url: adminurl + 'RestApi/ActivitiesImages',
                method: 'POST',
                withCredentials: true,
                data: data
            }).then(callback);
        },
        deleteCartAccomodation: function(type, name, callback) {
            var data = {
                type: type,
                name: name
            };
            $http({
                url: adminurl + 'customisation/deleteCart',
                method: 'POST',
                withCredentials: true,
                data: data
            }).then(callback);
        },
        // deleteCartAccomodation: function(type,name, callback) {
        //     var data = {
        //         type: type,
        //         name: name
        //     };
        //     $http({
        //         url: adminurl + 'cart/deleteCart',
        //         method: 'POST',
        //         withCredentials: true,
        //         data: data
        //     }).then(callback);
        // },
        addCartPackage: function(id, type, callback) {
            var data = {
                package: id,
                type: type
            };
            $http({
                url: adminurl + 'cart/addToCart',
                method: 'POST',
                withCredentials: true,
                data: data
            }).then(callback);
        },
        addCartActivity: function(id, type, callback) {
            var data = {
                activities: id,
                type: type
            };
            $http({
                url: adminurl + 'cart/addToCart',
                method: 'POST',
                withCredentials: true,
                data: data
            }).then(callback);
        },
        addCartAccomodation: function(type, dest, name, image, callback) {
            var data = {
                type: type,
                destination: dest,
                name: name,
                image: image
            };
            $http({
                url: adminurl + 'customisation/addToCart',
                method: 'POST',
                withCredentials: true,
                data: data
            }).then(callback);
        },
        addCartActivityCustomisation: function(id, type, callback) {
            var data = {
                activities: id,
                type: type
            };
            $http({
                url: adminurl + 'customisation/addToCart',
                method: 'POST',
                withCredentials: true,
                data: data
            }).then(callback);
        },
        // addCartAccomodation: function(type,dest,name,image, callback) {
        //     var data = {
        //         type: type,
        //         destination: dest,
        //         name: name,
        //         image: image
        //     };
        //     $http({
        //         url: adminurl + 'cart/addToCart',
        //         method: 'POST',
        //         withCredentials: true,
        //         data: data
        //     }).then(callback);
        // },
        addCartWhatsHot: function(id, type, callback) {
            var data = {
                whatshot: id,
                type: type
            };
            $http({
                url: adminurl + 'cart/addToCart',
                method: 'POST',
                withCredentials: true,
                data: data
            }).then(callback);
        },
        DestinationContent: function(id, callback) {
            var data = {
                id: id,
            };
            $http({
                url: adminurl + 'RestApi/DestinationContent',
                method: 'POST',
                withCredentials: true,
                data: data
            }).then(callback);
        },
        enquiryForm: function(formData, callback) {
            //console.log('Navigation form data: ', formData);
            $http({
                url: adminurl + 'Enquire/saveEnquire',
                method: 'POST',
                data: formData
            }).then(callback);
        },
        cart: function(cartData, callback) {
            //console.log('Navigation form data: ', formData);
            $http({
                url: adminurl + 'cart/saveCart',
                method: 'POST',
                data: cartData
            }).then(callback);
        },
        cartCustomisationSubmit: function(cartData, callback) {
            //console.log('Navigation form data: ', formData);
            $http({
                url: adminurl + 'customisation/saveCart',
                method: 'POST',
                data: cartData
            }).then(callback);
        },
        getCart: function(callback) {
            //console.log('Navigation form data: ', formData);
            $http({
                url: adminurl + 'cart/getCart',
                method: 'POST'
            }).then(callback);
        },
        getCustCart: function(callback) {
            //console.log('Navigation form data: ', formData);
            $http({
                url: adminurl + 'customisation/getCart',
                method: 'POST'
            }).then(callback);
        },



        RestApiPattaya2: function(id, callback) {
            // var data = {
            //     id: id,
            // };
            $http({
                url: adminurl + 'RestApi/Pattaya2',
                method: 'POST',
                withCredentials: true,
                data: {
                    id: id
                }
            }).then(callback);
        },
        getChangeDestination: function(id, callback) {
            $http({
                url: adminurl + 'RestApi/ActivitiesImages',
                method: 'POST',
                withCredentials: true,
                data: {
                    destination: id
                }
            }).then(callback);
        },
        whatsHotMore: function(id, callback) {
            $http({
                url: adminurl + 'RestApi/WhatsHotDetails',
                method: 'POST',
                withCredentials: true,
                data: {
                    id: id
                }
            }).then(callback);
        },
        getSearch: function(formData, callback) {

            $http({
                url: adminurl + 'RestApi/CategoryFilter',
                method: 'POST',
                data: formData
            }).then(callback);
        },
        // addToCart: function(id, callback) {
        //     var data = {
        //         id: id,
        //         name:""
        //     };
        //     $http({
        //         url: adminurl + 'RestApi/addToCart',
        //         method: 'POST',
        //         withCredentials: true,
        //         data: data
        //     }).then(callback);
        // },

    };
});
