agGrid.initialiseAgGridWithAngular1(angular);
var app=angular.module("agexample",['ngMaterial',"agGrid"]);
app.controller("main",['$scope',function($scope){
	var columnDefs = [
    {headerName: "Athlete", field: "athlete", width: 150, filter: 'set'},
    {headerName: "Age", field: "age", width: 90, filter: 'set'},
    {headerName: "Country", field: "country", width: 120},
    {headerName: "Year", field: "year", width: 90},
    {headerName: "Date", field: "date", width: 110,cellRenderer: EditorAndRendring,
               editable: false
},
    {headerName: "Sport", field: "sport", width: 110},
    {headerName: "Gold", field: "gold", width: 100, filter: 'number'},
    {headerName: "Silver", field: "silver", width: 100, filter: 'number'},
    {headerName: "Bronze", field: "bronze", width: 100, filter: 'number'},
    {headerName: "Total", field: "total", width: 100, filter: 'number', suppressFilter: true}
];
function MoodCellRenderer() {
}

MoodCellRenderer.prototype.init = function (params) {
    if (params.value === "" || params.value === undefined || params.value === null) {
        this.eGui = '';
    } else {
                this.eGui = '<span>'+params.value +'</span>';
    }
};

MoodCellRenderer.prototype.getGui = function () {
    return this.eGui;
};
$scope.changed=function(data){
	console.log("changed");
	data.showDatePicker=false;
}
$scope.handleDoubleClick=function (event,data) {
    console.log("double click");
        event.stopPropagation();
		if(data.showDatePicker){
			data.showDatePicker=false;
		}else{
			data.showDatePicker=true;
		}
};

function EditorAndRendring(params){
	if (params.value === "" || params.value === undefined || params.value === null) 
	{
        this.eGui = '<span ng-dblclick="handleDoubleClick($event,data) ng-show="!data.showDatePicker">-</span>';
    } else {
                this.eGui = '<span ng-show="!data.showDatePicker" ng-dblclick="handleDoubleClick($event,data)">{{data.date}}</span>';
    }
	//params.changed=$scope.changed;
	return this.eGui+'<md-datepicker md-hide-icons="triangle" ng-show="data.showDatePicker" ng-change="changed(data)" ng-model="data.date" md-placeholder="Enter date"></md-datepicker>';
}
function MoodEditor() {
   this.container = document.createElement('div');
this.container.innerHTML=   '<md-datepicker ng-model="data.date" md-placeholder="Enter date"></md-datepicker>';
  // return '<md-datepicker ng-model="data.date" md-placeholder="Enter date"></md-datepicker>';
}
MoodEditor.prototype.getGui = function () {
    return this.container;
};


MoodEditor.prototype.isPopup = function () {
    return true;
};

MoodEditor.prototype.getValue = function () {
    return 1;
};

var gridOptions = {
    columnDefs: columnDefs,
    rowData: null,
    enableFilter: true,
    enableSorting: true,

    // these hide enterprise features, so they are not confusing
    // you if using ag-Grid standard
    suppressContextMenu: true,
    suppressMenuMainPanel: true,
    suppressMenuColumnPanel: true,
	rowSelection:"single",
	angularCompileRows:true
};
$scope.gridOptions=gridOptions;



var list=[{"athlete":"Michael Phelps","age":23,"country":"United States","year":2008,"date":new Date(),"sport":"Swimming","gold":8,"silver":0,"bronze":0,"total":8},
  {"athlete":"Michael Phelps","age":19,"country":"United States","year":2004,"date":"29/08/2004","sport":"Swimming","gold":6,"silver":0,"bronze":2,"total":8}  ];
// setup the grid after the page has finished loading
$scope.gridOptions.rowData=list;

}]);

