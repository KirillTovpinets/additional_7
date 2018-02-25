module.exports = function solveSudoku(matrix) {
  		function solve(){
		   	if (!simpleSolution()) {
		     	return false;
		     }
		
		     if(isFullFilled()){
		     	return true;
		     }
		
		     var raw, cell;
		     for(var i = 0; i < matrix.length; i++){
		         for(var j = 0; j < matrix.length; j++){
		             if(matrix[i][j]=== 0) {
		                 raw = i;
		                 cell = j;
		                 break;
		             }
		         }
		     }
		
		     var possibleCells = getPossibleValues(raw,cell);
		     var bufferMatrix, result;
		     for(var i = 0; i < possibleCells.length; i++){
		         bufferMatrix = matrix.slice(0);
		         matrix[raw][cell] = possibleCells[i];
		
		         result = solve();
		         if(result){
		         	return true;
		         }
		         else{
		             matrix = bufferMatrix.slice(0);
		         }
		     }
		     return false;
		}
	    function getPossibleValues(rowIndex,cellIndex){ 
	        if(matrix[rowIndex][cellIndex] !== 0) return false;
	        var result = [1,2,3,4,5,6,7,8,9];
	
	        result = result.filter(function(number){ 
	            if (matrix[rowIndex].indexOf(number)!= -1){
	            	return false;	
	            }
	            else{
	            	return true;
	            }
	        });
	        for(var i = 0; i < matrix.length; i++){ 
	            var index = result.indexOf(matrix[i][cellIndex]);
	            if (index != -1){
	            	result.splice(index,1);
	            }
	        }
	
	        
	        var rowBegin = Math.floor(rowIndex / 3) * 3; 
	        var cellBegin = Math.floor(cellIndex / 3) * 3;
	        for(var i = rowBegin; i<rowBegin+3; i++)
	            for(var j = cellBegin; j< cellBegin+3; j++){
	                var index = result.indexOf(matrix[i][j]);
	                if (index != -1) result.splice(index,1);
	            }
	
	        return result;
	    }
	
	    function simpleSolution(){ 
	        var possibleCells = [];
	        var changed = false;
	
	        while(true) {
	            changed = false;
	            for (var i = 0; i < matrix.length; i++) {
	                for (var j = 0; j < matrix.length; j++) {
	                    possibleCells = getPossibleValues(i, j);
	                    if (possibleCells == false) continue; 
	
	                    if (possibleCells.length === 0){
	                    	return false;
	                    }
	
	                    if (possibleCells.length == 1) { 
	                        matrix[i][j] = possibleCells[0];
	                        changed = true;
	                    }
	                }
	            }
	            if (changed === false){
	            	break;
	            }
	        }
	        return true;
	    }
	
	    function isFullFilled() { 
	        for(var i = 0; i < matrix.length;i++){
	            for(var j = 0; j < matrix.length; j++){
	                if(matrix[i][j]=== 0){
	                	return false;
	                }
	            }
	        }
	        return true;
	    }
	solve();
	return matrix;
}