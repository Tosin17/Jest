(function () {
   
    angular.module('practice')
    .controller('dashboardController', function ($scope) {
        $scope.heading = 'Dashboard'
        $scope.content = 'Content here...' 

        $scope.form_isValid = true;

        // Initialize first pair of form values 
        // ng-repeat creates 1st pair of fields 
        $scope.formFieldValues = [{
            app: '',
            relevance: ''
        }];

        // Add new pair of fields
        $scope.addFields = function () {
            $scope.formFieldValues.push(
                {
                    app: '',
                    relevance: ''
                }
            )
            //console.log($scope.formFieldValues[$scope.formFieldValues.length - 1].app);
        }

        // If duplicates identified, disable button
        $scope.$watch('formFieldValues', function () {
            $scope.errorIndex = undefined;
            $scope.duplicateValues = false;

            if(_.filter($scope.formFieldValues, 
            {'app': $scope.formFieldValues[$scope.formFieldValues.length - 1].app}).length > 1){
              // console.log("DUPLICATE!");
              $scope.errorIndex = $scope.formFieldValues.length - 1;
              $scope.duplicateValues = true;  
            }
        }, true)

        var users = [
            { 'user': 'barney',  'age': 36, 'active': true },
            { 'user': 'fred',    'age': 40, 'active': false },
            { 'user': 'fred',    'age': 40, 'active': false },
            { 'user': 'pebbles', 'age': 1,  'active': true }
          ];
           
        var matches =  _.filter(users, {'user': 'fred'});
        // console.log('Matches', matches);

        // Remove new pair of fields
        $scope.removeFields = function(index) {
            $scope.formFieldValues.splice(index, 1);
        };

        $scope.reset = function () {
            $scope.formFieldValues = [{
                app: '',
                relevance: ''
            }];
        }

        // Submit form
        $scope.submitForm = function() {
            console.log($scope.formFieldValues);
        };

        var users = [
            { 'user': 'barney',  'age': 36, 'active': true },
            { 'user': 'fRed',    'age': 40, 'active': false },
            { 'user': 'Pebbles', 'age': 1,  'active': true }
          ];
                      
        // console.log("FILTER!!", _.filter(_.map(users, function(obj) {
        //     return obj.user.toLowerCase();
        // }),));

        // console.log(_.transform(users, function (result, val, key) {
        //     val.user = val.user.toLowerCase().trim();
        //     result.push(val);
        // }));

        APImodel = {
            applications:[],
            tenantId: ''
        }

        var formFields = [
            { user: 'barney',  relevance: { 'age': 36, dob: 'YYYZ' } },
            { user: 'fRed',    relevance: { 'age': 38 , dob: 'YYYY'} },
            { user: 'Pebbles', relevance: { 'age': 26 , dob: 'XYYY'} }       
        ];
        
        var transformedUsers = [];  
        // Iterate through users object, change object keys 'user' to 'name', assign tenantId 
        // and store each object in transformedUsers 
        for (var i = 0; i < formFields.length; i++) {
            _.forEach(formFields[i], function (val, key) {
                if (key === 'user') {
                    key = 'name'
                }
                if (key === 'relevance') {
                    val = _.get(val, 'dob')
                }
                //console.log(key, val)
            })
            
        }
         // for (var i = 0;..^^Crazy var is visible outside the for loop
         console.log(i);

        var dinosaurs = [ { name: 'Terry', species: 'Tyrannosaurus', sleeping: false },
        { name: 'Theresa', species: 'Tyrannosaurus', sleeping: false },
        { name: 'Henry', species: 'Tyrannosaurus', sleeping: false },
        { name: 'Harriet', species: 'Hadrosaur', sleeping: true },
        { name: 'Stanley', species: 'Stegosaurus', sleeping: false } ]

        console.log(
            _.chain(dinosaurs).
            filter({species: 'Tyrannosaurus', sleeping: false}).
            map(function(dinosaur){
                return dinosaur.name + ' is Awake!';
            }).
            nth(1).
            value()
        ); 
       

        
        $scope.sayHello = function() {
            //console.log('HELLO!')
        }
        $scope.sayHello();
        
        
        // Closures
        function interviewQuestion(job) {
            Questions = ['What do you teach?', 'What the heck is UX?'];
            return function (name) {
                return (job === 'teacher') ? Questions[0] + ' '+ name : Questions[1] + ' '+ name;
            }
        }

        //console.log(interviewQuestion('teacher')('Jamie'));
        // What do you teach? Jamie
        //console.log(interviewQuestion('designer')('Michael'));
        // What the heck is UX? Michael


        // PROTOTYPAL INHERITANCE
        var Person = function (name, age, gender) {
            this.name = name;
            this.age = age;
            this.gender = gender;
        }
        Person.prototype.intro = function () {
            //console.log('I am ' + this.name + '. I\'m male ' + 'and '+ this.age + ' old');
        }
        Person.prototype.lastname = 'Smith';

        var james = new Person('James', 34, 'male');
        var john = new Person('John', 15, 'female');
        james.intro();
        john.intro();
        //console.log(james.lastname, john.lastname);

        // OBJECT.CREATE()


    })

})()