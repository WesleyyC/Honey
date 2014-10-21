
// Default Model
var model = {
    user: "Mary",
    sortByAisle: true,  // Sort the list by aisle as default
    sortByQuantity: false,
    items: []
};

// Create Module
var todoApp = angular.module("todoApp", []);

// Build a filter
todoApp.filter("checkedItems", function () {
    return function (items, showComplete) {
        var resultArr = [];

        angular.forEach(items, function (item) {
            // If item is deleted it will never show up.
            // If Show Complete is not checked, only the item that is undone will show.
            if ((item.done == false || showComplete == true)&item.delete == false) {
                resultArr.push(item);
            }
        });

        return resultArr;
    }
});

// Build the controler
todoApp.controller("ToDoCtrl", function ($scope) {
    
    $scope.todo = model;

    //  Count all the item that user need to checkout, 
    //  so that the user will be able to know if they can use the express check out.
    $scope.itemCount = function () {
        var count = 0;
        angular.forEach($scope.todo.items, function (item) {
            if (!item.delete) { count++ }
        });
        return count;
    }

    //  Setting the style of the counting number.
    $scope.warningLevel = function () {
        return $scope.itemCount() < 10 ? "label-success" : "label-warning";
    }

    //  Add new item to the list.
    $scope.addNewItem = function (actionText) {
        if(!actionText==""){
            $scope.todo.items.push({ name: actionText, done: false, quantity: 1, aisle: $scope.returnAisle(actionText), delete: false });
        }
        document.getElementById("addText").value = "";
    }

    //  A data base knowing which aisle a specific item is in.
    $scope.returnAisle = function (actionText){
        if (actionText.toLowerCase() == "coffee"){
            return 14;
        }else if (actionText.toLowerCase()=="bread"){
            return 5;
        }else if (actionText.toLowerCase()=="flower"){
            return 7;
        }else if (actionText.toLowerCase()=="peanut butter"){
            return 1;
        }else if (actionText.toLowerCase()=="apple"){
            return 2;
        }
    }

    //  Using which sorting method
    $scope.sortingMethod = function () {
        if($scope.todo.sortByAisle){
            return 'aisle';
        }else{
            return 'quantity';
        }
    }

    //  Change the checkbox together.
    $scope.checkModify = function(test){
        if(test==true)
        {
            $scope.todo.sortByQuantity = false;
            $scope.todo.sortByAisle = true;
        }
        else
        {
            $scope.todo.sortByQuantity = true;
            $scope.todo.sortByAisle = false;
        }
    }
});