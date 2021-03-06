// angular.module('school.services')
angular.module('agil.servicios')
 .factory('FieldViewer', ['VistaColumnasAplicacion',function(VistaColumnasAplicacion) 
  {
	var res = function(obj,application_id,nombre) {
		var fieldViewer={
			object:obj,
			application_id:application_id,
			getKeys:function(){
				return Object.keys(this.object.configuracion);
			},
			updateObject:function(){
				var obj=this.object;
				VistaColumnasAplicacion.update({id_aplicacion:this.application_id,nombre:nombre},this.object,function(res){
					if (res.configuracion instanceof Object) {
						obj.configuracion = res.configuracion;
						obj.crear = false;
					} else {
						obj.configuracion = JSON.parse(res.configuracion);
						obj.crear = false;
					}
				})
			},
			getConfiguration:function(){
				return this.object.configuracion;
			}
		}
		return fieldViewer;
	};
    return res;
  }]);