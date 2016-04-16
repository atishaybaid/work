angular.module("app",[])
.controller('mainCtrl', ['$scope','$http',function($scope,$http){
    $scope.searchText = '';
    var apiUrl = 'https://www.omdbapi.com/?';
    $scope.cards = JSON.parse(localStorage.getItem('cards'))||[];
    $scope.selectedFilter = null;

    $scope.getResult = function(event){
        if(event.keyCode===13){
           getDataFromApi($scope.searchText);
           $scope.searchText = '';

        }
    };


    function getDataFromApi(query){
        var url = apiUrl + 't=' +query;
        $http({
            method:'GET',
            url:url

        }).then(function(res){
            if(!res.data.Error){
            $scope.cards.push(res.data);
            var storedCards = JSON.stringify($scope.cards);
            localStorage.setItem('cards',storedCards);

            }


        },function(err){

        })

    }

   $scope.applyFilter = function(event){
   /* console.log(event.target.outerText);*/
   $scope.selectedFilter=event.target.outerText;
   }

   $scope.genreFilter = function(item){
            if($scope.selectedFilter==null||$scope.selectedFilter==='All'){
                return true
            }
            if(item.Genre.indexOf($scope.selectedFilter)!=-1){

                return true;
            }


   }



}])
.directive('movieCard',function(){
    return {
     templateUrl:'movieCard.html',
     scope:{
        data:"=",
        local:"="
     },
     link:function(scope,element,directive){
        scope.editData = scope.data     //data for onclick editing
        scope.displayModal=false;
        scope.editCard = function(){
        scope.displayModal = true;
        }

        scope.saveEdittedDetails = function(){
            var i = 0;
            angular.forEach(scope.local,function(item){

                if(item.Title === scope.editData.Title){
                    scope.local[i] = scope.editData;


                };
                i++;

            })

             localStorage.setItem('cards',JSON.stringify(scope.local));
              scope.displayModal = false;

        }

        scope.reset = function(){
             scope.editData = scope.data;
             scope.displayModal = false;
        }



     }

    };



})