
#menu-wraper a{
	margin-top: 20px;
	margin-left: 10px;
	text-decoration: none;
	color: white;
	text-align-last: center;
}
.myOwnBg {
	background-color: red;
 }
 .xlpopover{
	width: auto;
	max-width:100%;
 }
 /* card image */
 .cardImg {
	 width: 190px !important;
	background:#fff;
	box-shadow:0 20px 50px rgba(0,0,0,.1);
	border-radius:10px;
	transition:0.5s;
}
.cardImg:hover {
	box-shadow:0 30px 70px rgba(0,0,0,.2);
}
.card .box {	
	box-sizing:border-box;
	width:100%;
}
.digital-clock-style {
  margin: auto;
  border-radius: 4px;
}
.date-clock {
  margin: auto;
  border-radius: 4px;
}
 /* card image */
/* responsive table */
#map_canvas_despachos ui-gmap-google-map, div[ui-gmap-google-map] {display:block; width:450px !important; height:350px!important;}
@media screen and (max-width: 600px) {
	.table-responsive-actual {
	  border: 0;
	}
	
  
	.table-responsive-actual caption {
	  font-size: 1.3em;
	}
	
	.table-responsive-actual thead {
	  border: none;
	  clip: rect(0 0 0 0);
	  height: 1px;
	  margin: -1px;
	  overflow: hidden;
	  padding: 0;
	  position: absolute;
	  width: 1px;
	}
	
	.table-responsive-actual tr {
	  border-bottom: 3px solid #ddd;
	  display: block;
	  margin-bottom: .625em;
	}
	
	.table-responsive-actual td {
	  border-bottom: 1px solid #ddd;
	  display: block;
	  font-size: .8em;
	  text-align: right;
	}
	
	.table-responsive-actual td::before {
	  /*
	  * aria-label has no advantage, it won't be read inside a .table-responsive-actual
	  content: attr(aria-label);
	  */
	  content: attr(data-label);
	  float: left;
	  font-weight: bold;
	  text-transform: uppercase;
	}
	
	.table-responsive-actual td:last-child {
	  border-bottom: 0;
	}
  }
/*table fixed header*/
.table-fixed-header{
	overflow-y: scroll;height:auto;width:auto;max-height: 300px;
  }
  .table-fixed-header2{
	overflow-y: scroll;height:auto;width:auto;max-height: 250px;
  }
  .table-fixed-header3{
	overflow-y: scroll;height:auto;width:auto;max-height: 100px;
  }
  .table-head-color{
	background-color: rgb(238, 237, 237)
  }

  /* fin fixed header */

  .zui-table {
    border: none;
    border-right: solid 1px #DDEFEF;
    border-collapse: separate;
	border-spacing: 0;
	
    
}
.zui-table thead th {
    background-color: #DDEFEF;
    border: none;
    color: #336B6B;
    padding: 10px;
    text-align: left;
    text-shadow: 1px 1px 1px #fff;
    white-space: nowrap;
}

  /* input number sin flechas */
 #formNuevoComprobante input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  appearance: none;
  margin: 0; 
}

#formNuevoComprobante input[type=number] { -moz-appearance:textfield;appearance: textfield; }

#formNuevoComprobante .dropdown-menu {
	/* position: static !important;
	top: auto !important;
	left: auto !important;	 */
	z-index:9999;
  }
.validacionRRhh{
	border: 1px solid red !important;
	/* border-radius: 2px !important; */
	color:red !important;
}
 
#style-7::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
	border-radius: 10px;
}

#style-7::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

#style-7::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	background-image: -webkit-gradient(linear,
									   left bottom,
									   left top,
									   color-stop(0.44, rgb(122,153,217)),
									   color-stop(0.72, rgb(73,125,189)),
									   color-stop(0.86, rgb(28,58,148)));
}

  .icon-stack {
	position: relative;
	display: inline-block;
	width: 2em;
	height: 2em;
	line-height: 2em;
	vertical-align: middle;
  }
  .icon-stack-1x,
  .icon-stack-2x,
  .icon-stack-3x {
	position: absolute;
	left: 0;
	width: 100%;
	text-align: center;
  }
  .icon-stack-1x {
	line-height: inherit;
  }
  .icon-stack-2x {
	font-size: 1.5em;
  }
  .icon-stack-3x {
	font-size: 2em;
  }
#search { 
width: 170px; /* Ancho del buscador */
height: 50px;
float: right;
text-align: center;
margin-top: 6px;
margin-right: 65px;}

#ini-contenedor{  
	padding: 10px;
	overflow: hidden;
	background-color: white;
}
.dropdown-menu {
       z-index:9999;
   }
#login{
	float: right;
	margin-right: 10px;
	height: 500px;
}



input {
	font-size: 1em;
	line-height: 1.5em;
	margin: 0;
	padding: 0;
	-webkit-appearance: none;
	appearance: none;
}
#content-img{
float:left;
}




/* login */


#login {
	width: 275px;
	height: 100px;
	margin: 50px auto;
	margin-right: 50px;
}
#login label {
	position: absolute;
	display: block;
	width: 36px;
	height: 48px;
	line-height: 48px;
	text-align: center;
	font-family: 'FontAwesome', sans-serif;
	color: #676767;
	text-shadow: 0 1px 0 #fff;
}
#login input {
	border: none;
	width: 204px;
	height: 48px;
  padding-left: 36px;
	border: 1px solid #000;
	background-color: #dedede;
  background: -webkit-linear-gradient(top, #c3c3c3 0%, #eaeaea 100%);	
	color: #363636;
	text-shadow: 0 1px 0 #fff;
	outline: none;

}
#login input[type="text"] {
	border-bottom: none;
	-webkit-border-radius: 5px 5px 0 0;
	-moz-border-radius: 5px 5px 0 0;
	border-radius: 5px 5px 0 0;
	-webkit-box-shadow:inset 0 -1px 0 rgba(0, 0, 0, .4);
	box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .4);
}
#login input[type="password"] {
	border-top:none;
	-webkit-border-radius: 0 0 5px 5px;
	-moz-border-radius: 0 0 5px 5px;
	border-radius: 0 0 5px 5px;
	margin-bottom: 20px;
	-webkit-box-shadow:inset 0 1px 0 rgba(255, 255, 255, .3), 0 1px 1px rgba(0, 0, 0, .2);
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, .3), 0 1px 1px rgba(0, 0, 0, .2);
}
#login input[type="submit"] {
	margin: 0;
	padding: 0;
	width: 240px;
	background-color: #e14d4d;
	border: 1px solid #391515;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	border-radius: 5px;
	color: #fff;
	text-align: center;
	font-weight: bold;
	line-height: 48px;
	text-transform: uppercase;
	/* background-image: none; */
	background-image:-webkit-linear-gradient(top, #f15958 0%, #e14d4d 100%);
	-webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, .3), 0 1px 1px rgba(0, 0, 0, .2) ;
	-moz-box-shadow: hoff voff radius color;
	box-shadow: hoff voff radius color;
	text-shadow: 0 1px 0 #000;
}
#login input[type="submit"]:hover {
	background-color: #f15958;
	background-image:-webkit-linear-gradient(top, #e14d4d 0%, #f55b5b 100%);
}
/*p{
	font-size: 12.5px;
	font-style: arial;
	font-family: arial;
	width: 400px;
	color: black;
	text-align: justify;
	text-align-last: right;
	padding-right: 50px;
	padding-left: 15px;
	padding-top: 15px;
	padding-bottom: 15px;
	padding: 15px;
	margin-left: 30px;
	margin-right: 40px;

}*/

.tarjeta{
	/* display: inline; */
	width:33.33%; 
	float:left;
	height: 150px;
	color:white;
}



input.ng-invalid {
    background: #eddada;
}

.invalid-message{
	position: absolute;
	padding: 10px;
	background: #E95051;
	border-radius: 10px;
	color: black !important;
	z-index: 999;
}

.opcion-inicio{
width:20% !important;
height:200px !important;
}

.wizard-posicion{
position:none !important;
}

.fileUpload {
    position: relative;
    overflow: hidden;
    margin: 0px;
}
.fileUpload input.upload {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    filter: alpha(opacity=0);
}

.fileUpload-button{
 z-index: -99 !important;
}

.check-compra::before{
content: "%\a0\a0\a0\a0\a0\a0\a0\a0\a0\a0\a0   Bs" !important;
}

.check-descuento::before{
content: "SI\a0\a0\a0\a0\a0\a0\a0\a0\a0\a0\a0  NO" !important;
}
.check-cuenta-especifica::before{
	content: "C.F\a0\a0\a0\a0\a0\a0\a0\a0\a0\a0\a0  D.F" !important;
	}
.ketchup-error{
z-index:9999 !important;
}

.filterInputInUse {
	background-color: #cde9ff !important;
	color: #000000 !important;
}

.colorAnulado td {
	color:red !important;
}
/* #map_canvas {
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    position: unset !important;
}

.mapa_cliente .angular-google-map-container{
	position:unset !important;
	top: 400px !important;
    bottom: 0px !important;
    right: 0px !important;
    left: 0px !important;
	overflow:unset !important;
}

.mapa_cliente .angular-google-map-container .gm-style{
	height:300px !important;
	position: absolute !important;
} */

#map_canvas {
	position: relative;
}

.angular-google-map-container {
	position: absolute;
	top: -40px;
	bottom: 0;
	right: 0;
	left: 0;
}

.button-location{
	/* margin-right: 10px;
	margin-top: -20px; */

	margin-right: 8px;
    margin-top: -20px;
    width: 43px;
    height: 43px;
}
.button-location>.icon-only.ace-icon{
	margin-left: -3px !important;
    margin-top: 1px !important;
}

.search-location{
	width: 300px !important;
	margin-top: 10px !important;
}

.pac-container {
    background-color: #fff;
    position: absolute!important;
    z-index: 9999;
    border-radius: 2px;
    border-top: 1px solid #d9d9d9;
    font-family: Arial,sans-serif;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
}

.opcion-producto{
width:17% !important;
height:150px !important;
}

#productos .swiper-slide{
	border-radius:20px;
}

#productos div img{
	/* border-radius: 20px;
  padding-top: 15px;
	padding-right: 15px; */
	border-radius: 18px 18px 0px 0px;
	padding-left: 0px;
}

#productos div h3{
    padding: 0px !important;
	text-align:center;
}

/*#productos div:hover {
    cursor: pointer;
}*/

.panel-cantidad{
	color: #F7F718;
    font-size: 30px;
    left: 154px;
    position: absolute;
    top: 1px;
    z-index: 999999;
}

.check-seguimiento::before{
content: "Mes     \a0\a0\a0\a0\a0\a0\a0\a0\a0\a0\a0      Periodo" !important;
width:97px !important;
}

.menu-hidden{
display:none !important;
}

.check-descuento-opcion::before{
content: "Fijo\a0\a0\a0\a0__Pred." !important;
}
.descuento-azul{
    color: blue;
}
.descuento-negro{
    color: black;
}

.kardex-box{
width:100% !important;
}

[ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
  display: none !important;
}

#pantalla-cliente-venta{
  background-image: -webkit-linear-gradient(170deg, #C32A48 40%, white 60%);
}

#pantalla-cliente-venta #parte-blanca-roja{
	padding-left: 150px;
	padding-top: 50px;
	height: 370px;
}


#pantalla-cliente-venta .nombre{
	padding-left: 100px;
	margin-top: 70px;
	background: -webkit-linear-gradient(170deg, #C11732 91%, white 50%);
	font-size: 20px;
	font-family: arial;
	color: white;
  	
}
#pantalla-cliente-venta .nit{
	padding-left: 100px;
	background: -webkit-linear-gradient(170deg, #C11732 93%, white 35%);
	font-size: 20px;
	font-family: arial;
	color: white;
}

#pantalla-cliente-venta #circle{
  float: right;
  height: 287px;
  width: 287px;
  display: table-cell;
  text-align: center;
  font-size:20px;
  vertical-align: middle;
  border-radius: 50%;
  border-color: black;
  border-left-width: 2px;
  background-color: #C11732;
  
  
}

#pantalla-cliente-venta #circleGrande{
  float: left;
  height: 300px;
  width: 300px;
  display: table-cell;
  text-align: center;
  font-size:20px;
  vertical-align: middle;
  border-radius: 50%;
  border-color: black;
  border-left-width: 2px;
  background-color: black;
  
  box-shadow: 0 0 8px white;
}
#pantalla-cliente-venta #amarillo{
	color: yellow;
	font-family: arial;
}
#pantalla-cliente-venta #blanco{
	color: white;
	font-family: arial;
}

#pantalla-cliente-venta .superior #datos{
top:50px;
float: left;
width: 70%;
}

#pantalla-cliente-venta .superior #logo{
top:50px;
float: left;
width: 30%;
}

#pantalla-cliente-venta .detven{
text-align:center;
}

#dialog-panel-ventas .red-style .first-row{
border:thin solid red !important;
}

#dialog-panel-ventas .red-style-button{
    background-color: red !important;
    border-color: red !important;
    border-radius: 15px 50px;
}

#dialog-panel-ventas .red-style-button:hover{
    background-color: red !important;
    border-color: red !important;
}

#dialog-panel-ventas .red-style label{
color:red !important;
}

#dialog-panel-ventas .red-style input, #dialog-panel-ventas .red-style select, #dialog-panel-ventas .red-style input[disabled]{
color:white !important;
background-color:red !important; 	
}

#dialog-panel-ventas .red-style .swiper-slide{
	background-color: white !important;
	color:red !important;
	border: thin red solid !important;
}

#dialog-panel-ventas .red-style .nit-row label{
	color:white !important;
}

#dialog-panel-ventas .red-style .nit-row input,#dialog-panel-ventas .nit-row select,#dialog-panel-ventas .red-style .nit-row input[disabled]{
color:black !important;
background-color:white !important; 
}

#dialog-panel-ventas .red-style .nit-row{
	background-color:red !important; 
}

#dialog-panel-ventas .red-style .economico label{
color:white !important;
}

#dialog-panel-ventas .red-style .economico input, #dialog-panel-ventas .red-style .economico select,#dialog-panel-ventas .red-style .economico input[disabled]{
color:rgb(79, 153, 198) !important;
background-color:white !important; 
}

#dialog-panel-ventas .red-style .economico{
	background-color:rgb(79, 153, 198) !important; 
}

#dialog-panel-ventas .red-style .row-close{
	background-color:rgb(255,255,255) !important; 
}


#dialog-panel-ventas .green-style .first-row{
border:thin solid rgb(98, 155, 88) !important;
}

#dialog-panel-ventas .green-style-button{
    background-color: rgb(98, 155, 88) !important;
    border-color: rgb(98, 155, 88) !important;
    border-radius: 50px 15px;
}

#dialog-panel-ventas .green-style-button:hover{
    background-color: rgb(98, 155, 88) !important;
    border-color: rgb(13, 179, 133) !important;
}

#dialog-panel-ventas .green-style label{
color:rgb(98, 155, 88) !important;
}

#dialog-panel-ventas .green-style input, #dialog-panel-ventas .green-style select, #dialog-panel-ventas .green-style input[disabled]{
color:white !important;
background-color:rgb(98, 155, 88) !important; 	
}

#dialog-panel-ventas .green-style .swiper-slide{
	background-color: white !important;
	color:rgb(98, 155, 88) !important;
	border: thin rgb(98, 155, 88) solid !important;
}

#dialog-panel-ventas .green-style .nit-row label{
	color:white !important;
}

#dialog-panel-ventas .green-style .nit-row input,#dialog-panel-ventas .nit-row select,#dialog-panel-ventas .green-style .nit-row input[disabled]{
color:black !important;
background-color:white !important; 
}

#dialog-panel-ventas .green-style .nit-row{
	background-color:rgb(98, 155, 88) !important; 
}

#dialog-panel-ventas .green-style .economico label{
color:white !important;
}

#dialog-panel-ventas .green-style .economico input, #dialog-panel-ventas .green-style .economico select,#dialog-panel-ventas .green-style .economico input[disabled]{
color:red !important;
background-color:white !important; 
}

#dialog-panel-ventas .green-style .economico{
	background-color:red !important; 
}

#dialog-panel-ventas .green-style .row-close{
	background-color:rgb(255,255,255) !important; 
}


#dialog-panel-ventas .brown-style .first-row{
border:thin solid rgb(170, 37, 0) !important;
}

#dialog-panel-ventas .brown-style-button{
    background-color: rgb(170, 37, 0) !important;
    border-color: rgb(170, 37, 0) !important;
    border-radius: 50px 15px;
}

#dialog-panel-ventas .brown-style-button:hover{
    background-color: rgb(170, 37, 0) !important;
    border-color: rgb(170, 37, 0) !important;
}

#dialog-panel-ventas .brown-style label{
color:rgb(170, 37, 0) !important;
}

#dialog-panel-ventas .brown-style input, #dialog-panel-ventas .brown-style select, #dialog-panel-ventas .brown-style input[disabled]{
color:white !important;
background-color:rgb(170, 37, 0) !important; 	
}

#dialog-panel-ventas .brown-style .swiper-slide{
	background-color: white !important;
	color:rgb(170, 37, 0) !important;
	border: thin rgb(170, 37, 0) solid !important;
}

#dialog-panel-ventas .brown-style .nit-row label{
	color:white !important;
}

#dialog-panel-ventas .brown-style .nit-row input,#dialog-panel-ventas .nit-row select,#dialog-panel-ventas .brown-style .nit-row input[disabled]{
color:black !important;
background-color:white !important; 
}

#dialog-panel-ventas .brown-style .nit-row{
	background-color:rgb(170, 37, 0) !important; 
}

#dialog-panel-ventas .brown-style .economico label{
color:black !important;
}

#dialog-panel-ventas .brown-style .economico input, #dialog-panel-ventas .brown-style .economico select,#dialog-panel-ventas .brown-style .economico input[disabled]{
color:black !important;
background-color:white !important; 
}

#dialog-panel-ventas .brown-style .economico{
	background-color:yellow !important; 
}

#dialog-panel-ventas .brown-style .row-close{
	background-color:rgb(255,255,255) !important; 
}


#dialog-panel-ventas .skyblue-style .first-row{
border:thin solid rgb(79, 153, 198) !important;
}

#dialog-panel-ventas .skyblue-style-button{
    background-color: rgb(79, 153, 198) !important;
    border-color: rgb(79, 153, 198) !important;
    border-radius: 15px 50px;
}

#dialog-panel-ventas .skyblue-style-button:hover{
    background-color: rgb(79, 153, 198) !important;
    border-color: rgb(79, 153, 198) !important;
}

#dialog-panel-ventas .skyblue-style label{
color:rgb(79, 153, 198) !important;
}

#dialog-panel-ventas .skyblue-style input, #dialog-panel-ventas .skyblue-style select, #dialog-panel-ventas .skyblue-style input[disabled]{
color:white !important;
background-color:rgb(79, 153, 198) !important; 	
}

#dialog-panel-ventas .skyblue-style .swiper-slide{
	background-color: white !important;
	color:rgb(79, 153, 198) !important;
	border: thin rgb(79, 153, 198) solid !important;
}

#dialog-panel-ventas .skyblue-style .nit-row label{
	color:white !important;
}

#dialog-panel-ventas .skyblue-style .nit-row input,#dialog-panel-ventas .nit-row select,#dialog-panel-ventas .skyblue-style .nit-row input[disabled]{
color:black !important;
background-color:white !important; 
}

#dialog-panel-ventas .skyblue-style .nit-row{
	background-color:rgb(79, 153, 198) !important; 
}

#dialog-panel-ventas .skyblue-style .economico label{
color:white !important;
}

#dialog-panel-ventas .skyblue-style .economico input, #dialog-panel-ventas .skyblue-style .economico select,#dialog-panel-ventas .skyblue-style .economico input[disabled]{
color:red !important;
background-color:white !important; 
}

#dialog-panel-ventas .skyblue-style .economico{
	background-color:red !important; 
}

#dialog-panel-ventas .skyblue-style .row-close{
	background-color:rgb(255,255,255) !important; 
}
#dialog-panel-operaciones .red-style .first-row{
	border:thin solid red !important;
	}
	
	#dialog-panel-operaciones .red-style-button{
		background-color: red !important;
		border-color: red !important;
		border-radius: 15px 50px;
	}
	
	#dialog-panel-operaciones .red-style-button:hover{
		background-color: red !important;
		border-color: red !important;
	}
	
	#dialog-panel-operaciones .red-style label{
	color:red !important;
	}
	
	#dialog-panel-operaciones .red-style input, #dialog-panel-operaciones .red-style select:enabled, #dialog-panel-operaciones .red-style input[disabled]{
	color:white !important;
	background-color:red !important; 	
	}
	
	#dialog-panel-operaciones .red-style .swiper-slide{
		background-color: white !important;
		color:red !important;
		border: thin red solid !important;
	}
	
	#dialog-panel-operaciones .red-style .nit-row label{
		color:white !important;
	}
	
	#dialog-panel-operaciones .red-style .nit-row input,#dialog-panel-operaciones .nit-row select:enabled,#dialog-panel-operaciones .red-style .nit-row input[disabled]{
	color:black !important;
	background-color:white !important; 
	}
	
	#dialog-panel-operaciones .red-style .nit-row{
		background-color:red !important; 
	}
	
	#dialog-panel-operaciones .red-style .economico label{
	color:white !important;
	}
	
	#dialog-panel-operaciones .red-style .economico input, #dialog-panel-operaciones .red-style .economico select:enabled,#dialog-panel-operaciones .red-style .economico input[disabled]{
	color:rgb(79, 153, 198) !important;
	background-color:white !important; 
	}
	
	#dialog-panel-operaciones .red-style .economico{
		background-color:rgb(79, 153, 198) !important; 
	}
	
	#dialog-panel-operaciones .red-style .row-close{
		background-color:rgb(255,255,255) !important; 
	}
	
	
	#dialog-panel-operaciones .green-style .first-row{
	border:thin solid rgb(98, 155, 88) !important;
	}
	
	#dialog-panel-operaciones .green-style-button{
		background-color: rgb(98, 155, 88) !important;
		border-color: rgb(98, 155, 88) !important;
		border-radius: 50px 15px;
	}
	
	#dialog-panel-operaciones .green-style-button:hover{
		background-color: rgb(98, 155, 88) !important;
		border-color: rgb(13, 179, 133) !important;
	}
	
	#dialog-panel-operaciones .green-style label{
	color:rgb(98, 155, 88) !important;
	}
	
	#dialog-panel-operaciones .green-style input, #dialog-panel-operaciones .green-style select:enabled, #dialog-panel-operaciones .green-style input[disabled]{
	color:white !important;
	background-color:rgb(98, 155, 88) !important; 	
	}
	
	#dialog-panel-operaciones .green-style .swiper-slide{
		background-color: white !important;
		color:rgb(98, 155, 88) !important;
		border: thin rgb(98, 155, 88) solid !important;
	}
	
	#dialog-panel-operaciones .green-style .nit-row label{
		color:white !important;
	}
	
	#dialog-panel-operaciones .green-style .nit-row input,#dialog-panel-operaciones .nit-row select:enabled,#dialog-panel-operaciones .green-style .nit-row input[disabled]{
	color:black !important;
	background-color:white !important; 
	}
	
	#dialog-panel-operaciones .green-style .nit-row{
		background-color:rgb(98, 155, 88) !important; 
	}
	
	#dialog-panel-operaciones .green-style .economico label{
	color:white !important;
	}
	
	#dialog-panel-operaciones .green-style .economico input, #dialog-panel-operaciones .green-style .economico select:enabled,#dialog-panel-operaciones .green-style .economico input[disabled]{
	color:red !important;
	background-color:white !important; 
	}
	
	#dialog-panel-operaciones .green-style .economico{
		background-color:red !important; 
	}
	
	#dialog-panel-operaciones .green-style .row-close{
		background-color:rgb(255,255,255) !important; 
	}
	
	
	#dialog-panel-operaciones .brown-style .first-row{
	border:thin solid rgb(170, 37, 0) !important;
	}
	
	#dialog-panel-operaciones .brown-style-button{
		background-color: rgb(170, 37, 0) !important;
		border-color: rgb(170, 37, 0) !important;
		border-radius: 50px 15px;
	}
	
	#dialog-panel-operaciones .brown-style-button:hover{
		background-color: rgb(170, 37, 0) !important;
		border-color: rgb(170, 37, 0) !important;
	}
	
	#dialog-panel-operaciones .brown-style label{
	color:rgb(170, 37, 0) !important;
	}
	
	#dialog-panel-operaciones .brown-style input, #dialog-panel-operaciones .brown-style select:enabled, #dialog-panel-operaciones .brown-style input[disabled]{
	color:white !important;
	background-color:rgb(170, 37, 0) !important; 	
	}
	
	#dialog-panel-operaciones .brown-style .swiper-slide{
		background-color: white !important;
		color:rgb(170, 37, 0) !important;
		border: thin rgb(170, 37, 0) solid !important;
	}
	
	#dialog-panel-operaciones .brown-style .nit-row label{
		color:white !important;
	}
	
	#dialog-panel-operaciones .brown-style .nit-row input,#dialog-panel-operaciones .nit-row select:enabled,#dialog-panel-operaciones .brown-style .nit-row input[disabled]{
	color:black !important;
	background-color:white !important; 
	}
	
	#dialog-panel-operaciones .brown-style .nit-row{
		background-color:rgb(170, 37, 0) !important; 
	}
	
	#dialog-panel-operaciones .brown-style .economico label{
	color:black !important;
	}
	
	#dialog-panel-operaciones .brown-style .economico input, #dialog-panel-operaciones .brown-style .economico select:enabled,#dialog-panel-operaciones .brown-style .economico input[disabled]{
	color:black !important;
	background-color:white !important; 
	}
	
	#dialog-panel-operaciones .brown-style .economico{
		background-color:yellow !important; 
	}
	
	#dialog-panel-operaciones .brown-style .row-close{
		background-color:rgb(255,255,255) !important; 
	}
	
	
	#dialog-panel-operaciones .skyblue-style .first-row{
	border:thin solid rgb(79, 153, 198) !important;
	}
	
	#dialog-panel-operaciones .skyblue-style-button{
		background-color: rgb(79, 153, 198) !important;
		border-color: rgb(79, 153, 198) !important;
		border-radius: 15px 50px;
	}
	
	#dialog-panel-operaciones .skyblue-style-button:hover{
		background-color: rgb(79, 153, 198) !important;
		border-color: rgb(79, 153, 198) !important;
	}
	
	#dialog-panel-operaciones .skyblue-style label{
	color:rgb(79, 153, 198) !important;
	}
	
	#dialog-panel-operaciones .skyblue-style input, #dialog-panel-operaciones .skyblue-style select:enabled, #dialog-panel-operaciones .skyblue-style input[disabled]{
	color:white !important;
	background-color:rgb(79, 153, 198) !important; 	
	}
	
	#dialog-panel-operaciones .skyblue-style .swiper-slide{
		background-color: white !important;
		color:rgb(79, 153, 198) !important;
		border: thin rgb(79, 153, 198) solid !important;
	}
	
	#dialog-panel-operaciones .skyblue-style .nit-row label{
		color:white !important;
	}
	
	#dialog-panel-operaciones .skyblue-style .nit-row input,#dialog-panel-operaciones .nit-row select:enabled,#dialog-panel-operaciones .skyblue-style .nit-row input[disabled]{
	color:black !important;
	background-color:white !important; 
	}
	
	#dialog-panel-operaciones .skyblue-style .nit-row{
		background-color:rgb(79, 153, 198) !important; 
	}
	
	#dialog-panel-operaciones .skyblue-style .economico label{
	color:white !important;
	}
	
	#dialog-panel-operaciones .skyblue-style .economico input, #dialog-panel-operaciones .skyblue-style .economico select:enabled,#dialog-panel-operaciones .skyblue-style .economico input[disabled]{
	color:red !important;
	background-color:white !important; 
	}
	
	#dialog-panel-operaciones .skyblue-style .economico{
		background-color:red !important; 
	}
	
	#dialog-panel-operaciones .skyblue-style .row-close{
		background-color:rgb(255,255,255) !important; 
	}
.text-red{
	color:red;
}
.text-green{
	color:green;
}
.text-white{
	color:#FFFFFF;
}
.text-dark{
color: #000
}

.bg-white{
	background-color:#FFFFFF;
	border-bottom: 0px solid transparent;
	color: rgb(104, 104, 104);
}
.bg-yellow{
	background-color: #FFB752 !important;
	border-bottom: 0px solid transparent;
	color: white;
}
.filter-bg-yellow{
	background-color: rgb(251, 251, 144) !important;
}
.bg-green{
	background-color: #87B87F !important;
	border-bottom: 0px solid transparent;
	color: white;
}
.bg-red{
   background-color: #D15B47;
   color:#FFFFFF;
}
.bg-orange{
	background-color: orange;
	color:#FFFFFF;
 }
 .bg-orange-red{
	background-color: rgb(255, 102, 0);
	color:#FFFFFF;
 }
 .bg-orange-green{
	background-color: rgb(96, 165, 0);
	color:#FFFFFF;
 }
 .bg-blue{
	background-color: rgb(94, 91, 169);
	color:#FFFFFF;
 }
 .bg-brown{
	background-color: rgb(151, 98, 41);
	color:rgb(11, 11, 167);
 }
 .bg-lila{
	background-color: rgb(107, 91, 179);
	color:rgb(11, 11, 167);
 }
.bg-silver{
	background-color: rgb(140, 140, 140);
	border-bottom: 0px solid transparent;
	color: #2C1796;
}
.bg-black{
	background-color: rgb(53, 53, 53);
	border-bottom: 0px solid transparent;
	color: #2C1796;
}
.bg-sky-blue{
	background-color:	#31b0d5;
	border-bottom: 0px solid transparent;
	color: #FFFFFF;
}
.sky-blue{
	border-bottom: 0px solid transparent;
	color:	#31b0d5;
}
.canvasjs-chart-credit {
   display: none;
}
.canvasjs-chart-trial {
   display: none;
}

.puntero{
	cursor: pointer;
}

.swipe-pedido .swiper-wrapper {
    width: 999px  !important;
}
.text-center{
	text-align: center;
}

.button-close{
	    margin-top: 10px;
}

#signature-pad {
    border: 1px dashed #428bca;
}

#dialog-detalle-cotizaciones {
    /* overflow: hidden !important; */
    border: 2px solid #ffb752 !important;
}

.sg-h-scroll-container{
	overflow-x: scroll !important;
    margin-right: -20000px !important;
    width: 258px !important;
}

.sg-h-scroll-container div{
	height: 1px !important;
    width: 430px !important;
}
.sg-v-scroll-container{
	overflow-y: scroll !important;
    height: 249px !important;
    display: block !important;
}
.sg-v-scroll-container div{
	width: 1px !important;
    height: 747px !important;
}

#control{
    width: 55px;
    height: 55px;
    background-color: #2C1796;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border: none;
    color: white;
  }
  #vales{
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border: none;
    color: white;
  }
  #control:hover{
	opacity: 0.50;
	-moz-opacity: .50;
	filter:alpha (opacity=50);
  }
  #control a{
	color:#fff;
	text-decoration:none;
	padding:5px 5px 5px 0;
  }

  .input-margin{
	  margin-bottom: 6px !important;
  }

  





  .container-table {
	width: auto;
	height: 390px;
	border: 1px solid #307ecc;
	overflow: scroll;
	position: relative;
  }

  /* .table-sueldos1 th,
	td {
		border-right: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		padding: 5px 10px;
		width: 100px;
		box-sizing: border-box;
		margin: 0;
	} */

	/* .td-sueldos-fix1{
		position: absolute;
		left: 1px;
		height: 100%;
		background-color: #8cbbea;
		width: 5% !important;
	}
	.td-sueldos-fix2{
	  	position: absolute;
		left: 50px;
		height: 100%;
		background-color: #8cbbea;
		width: 22% !important;
	}
	.td-sueldos-fix3{
		position: absolute;
		left: 300px;
		height: 100%;
		background-color: #8cbbea;
		width: 7% !important;
	}
	.table-content2{
		margin-left: 387px;
	} */

	.table-content2 th{
		position: sticky; top: 0;
		background-color: #F2F2F2 !important;
	}
	.table-th-static{
		z-index: 1;
	}

	.td-sueldos-fix1{
		background-color: #8cbbea;
		width: 5% !important;
		position: sticky; left:0;
	}
	.td-sueldos-fix2{
		background-color: #8cbbea;
		min-width: 280px;
		max-width: 280px;
		position: sticky; left:42px;
	}
	.td-sueldos-fix3{
		background-color: #8cbbea;
		width: 7% !important;
		position: sticky; left: 322px;
	}

	.td-rciva-fix1{
		background-color: #8cbbea;
		width: 5% !important;
		position: sticky; left: 35px;
	}
	.td-rciva-fix2{
		background-color: #8cbbea;
		min-width: 280px;
		max-width: 280px;
		position: sticky; left:77px;
	}
	.image-empleado{
		border: 3px solid #546474;
		color: #546474;
		font-size: 15px;
		border-radius: 100%;
		background-color: #FFF;
		/* position: relative; */
		z-index: 2;
		display: inline-block;
		width: 30px;
		height: 30px;
		line-height: 25px;
		text-align: center;
	}
	.title-popover-empleado .popover-title{
		background-color: #546474;
		color: white;
	}
	.title-popover-empleado{
		width: 35%;
	}
	.glyphicon-lg
	{
		font-size:4em
	}
	.info-block
	{
		border-right:5px solid #E6E6E6;margin-bottom:10px
	}
	.info-block .square-box
	{
		width:100px;min-height:110px;margin-right:22px;text-align:center!important;background-color:#676767;padding:20px 0
	}
	.info-block.block-info
	{
		border-color:#546474
	}
	.info-block.block-info .square-box
	{
		background-color:#546474;color:#FFF
	}
	.margin-buttons-filter{
		margin-top: 17px;
	}

	.dropdown-menu{
		height:auto;
		overflow:auto;
		max-height: 295px;
	}

	.dropdown-menu-navbar{
		height:auto !important;
		overflow:auto;
		max-height: max-content !important;
	}
			
	.ui-select-match-text > span {
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
	}
	.widget-box-operaciones {
    /* padding: 0; */
    -webkit-box-shadow: none;
    box-shadow: none;
    margin: 0px -21px 0px -15px !important;
    border: 1px solid #CCC;
	}

	.dropdown-menu {
		min-width: 230px !important;
	}

	/* primera tabla */
	#dialog-ingreso-por-inventario .tabla-inventario1 >  tbody {
    display:block;
    height:300px;
    overflow-y: auto;
    overflow-x: hidden;
	}
	#dialog-ingreso-por-inventario .tabla-inventario1> thead{
			display:table;
			/* width:100%; */
			table-layout:fixed;
	}
	.tabla-inventario1 .fila-num{
		width: 50px;
	}

	.tabla-inventario1 .fila-sucursal{
		width: 250px;
	}

	.tabla-inventario1 .fila-rs{
		width: 260px;
	}
	.tabla-inventario1 .fila-fecha{
		width: 200px;
	}
	.tabla-inventario1 .fila-acciones{
		width: 260px;
	}

	/* segunda tabla */
	.icon-tabla{
    float: right;
	}
	.td-center{
		vertical-align: middle !important;
	}
	#dialog-ingreso-por-inventario .tabla-inventario2{
		width: 97%;
		border: 1px solid #63a0d2;
	}
	#dialog-ingreso-por-inventario .tabla-inventario2 >  tbody {
    display:block;
		/* height:180px; */
		min-height: 50px;
		max-height: 180px;
    overflow-y: auto;
    overflow-x: hidden;
	}
	#dialog-ingreso-por-inventario .tabla-inventario2 > thead{
			display:table;
			width:100%;
			table-layout:fixed;
	}

	.tabla-inventario2 .fila-num{
		width: 40px;
	}
	.tabla-inventario2 .fila-codigo{
		width: 100px;
	}
	.tabla-inventario2 .fila-cantidad{
		width: 70px;
	}
	.tabla-inventario2 .fila-unidad{
		width: 60px;
	}
	.tabla-inventario2 .fila-detalle{
		width: 280px;
	}
	.tabla-inventario2 .fila-lote{
		width: 70px;
	}
	.tabla-inventario2 .fila-venc{
		width: 100px;
	}
	.tabla-inventario2 .fila-costo{
		width: 108px;
	}
	.tabla-inventario1 .tabla-child{
		border: none !important;
	}
	.boton-pie-excel{
		margin-left: 10px;
	}

	.table-scroll{
		height: 250px; 
		overflow: auto;
	}
	.width-details{
		width: 108% !important;
	}
	.width-details2{
		width: 100% !important;
	}
	.bg-info2{
		background: #F8FAFF !important;
	}
	#modal-wizard-ot-nuevo-container .steps li .step {
		cursor: pointer !important;
	}
	#modal-wizard-ot-nuevo-container .steps li.complete .step {
		cursor: pointer !important;
	}
	.align-button-r{
		margin-top: 18px;
	}

	/* Small Devices, Tablets */
	@media only screen and (min-width : 768px) {
		.align-button-r{
			margin-top: 0px;
		}
	
   }
   
    /* Medium Devices, Desktops */
    @media only screen and (min-width : 992px) {
		.align-button-r{
			margin-top: 18px;
		}
	}

	.infobox-promociones{
		height: auto;
	}
	.legend-invetario {
		display: block;
		width: 100%;
		padding: 0;
		margin-bottom: 20px;
		font-size: 15px;
		line-height: inherit;
		color: #69AA46;
		border: 0;
		border-bottom: 1px dotted #307ecc;
	}
	.font-l{
		font-size: 43px;
    	vertical-align: top!important;
	}
	.font-l2{
		font-size: 50px;
    	vertical-align: top!important;
	}

	.check-config{
		margin-top: 5px;
    	margin-left: 10px;
	}
	.info-config{
		margin-top: 7px;
		position: absolute;
	}

	/* select.disabled-panel:disabled{
		background-color: #dddddd!important;
	} */

	/* select[disabled='disabled']{
		background-color: #535353!important;
	} */

	select:disabled{
		/* opacity: 0.8; */
		background-color: #dddddd!important;
	}

	.imput-calc{
		border: 1px solid #307ecc !important;
	}

	.container-table-p{
		width: auto;
		border: 1px solid #307ecc;
		overflow: scroll;
		position: relative;
	}

	.input-search{
		width: 98%;
    	margin-top: 5px;
	}
	.infobox-green3{color:#f1f1f1;border-color:#7a7a7a}
	.infobox-green3>.infobox-icon>.ace-icon{background-color:#b1b1b1}
	.infobox-green3.infobox-dark{background-color:#c2c2c2;border-color:#ebebeb}
	.table-header-warning{background-color:#FFB752;color:#FFF;font-size:14px;line-height:38px;padding-left:12px;margin-bottom:1px}
	/* Container holding the image and the text */
	.circle {
		width: 100px;
		height: 100px;
		background: red;
		-moz-border-radius: 50px;
		-webkit-border-radius: 50px;
		border-radius: 50px;
	}

	.th-primero {
		position: sticky;
		top: 0;
		background-color: #F2F2F2 !important;
	}

	.th-segundo {
		position: sticky;
		top: 36px;
		background-color: #F2F2F2 !important;
	}

	#modal-wizard-container-producto-edicion .steps li.complete .step {
		cursor: pointer !important;
	}

	#modal-wizard-container-producto-edicion .steps li .step {
		cursor: pointer !important;
	}

	#dialog-conceptos{
		overflow: hidden !important;
	}

	.th-fix {
		position: sticky;
		top: 0;
		background-color: #eff3f8 !important;
		z-index: 1;
	}
	.text-align-check{
		text-align: center !important;
    	display: block;
	}

	.warningRow {
		background-color: #ffd69a !important;
	}

	.align-text-checkbox{
		position: relative;
		bottom: 8px;
	}

	.swal2-popup {
		font-size: 1.6rem !important;
	}

	/* .swal2-container {
		zoom: 1.5;
	} */

	.step-header-align{
		margin-top: -60px;
	}

	.progress-percentage {
		background-color: #2A91D8 !important;
		/* background: rgba(0,0,0,.2); */
		height: .35em !important;
		/* border-radius: 0px 0px 0px .3125em; */
	}
	.progress-change{
		background-color: #f0f0f0 !important;
		height: .35em !important;
	}
	.number-percentage{
		color: #2A91D8 !important;
	}
	.size-icon{
		font-size: 40px;
	}

	#dialog-parametros .multiSelect .checkboxLayer {
		position: absolute !important;
		top: auto !important;
		left: auto !important;
		width: inherit !important;
	  }
	
	  .swal2-file, .swal2-input, .swal2-textarea {
		box-sizing: border-box !important;
		width: 100% !important ;
		transition: border-color .3s,box-shadow .3s !important;
		border: 1px solid #d9d9d9 !important;
		border-radius: .1875em !important;
		background: inherit !important;
		box-shadow: inset 0 1px 1px rgba(0,0,0,.06) !important;
		color: inherit !important;
		font-size: 1.125em !important;
	}

	#modal-wizard-container-sucursal-correlativo .steps li .step {
		cursor: pointer !important;
	}
	#modal-wizard-container-sucursal-correlativo .steps li.complete .step {
		cursor: pointer !important;
	}

	.container-table-planillas {
		width: auto;
		height: 490px;
		border: 1px solid #307ecc;
		overflow: scroll;
		position: relative;
	}
	.align-button-rc-iva{
		padding-top: 5px;
	}
	
	.ui-select-match >span.btn, span.btn-default, span.btn:focus, span.btn-default:focus {
		background-color: #ffffff!important;
		color: unset !important 
	}

	.button-print-planilla{
		width: 80px !important;
		/* border: solid #70b2e3 2px !important;
		background: #ffffff !important;
		color: #307ecc !important; */
	}

	.button-print-planilla:hover {
		-webkit-transform: scale(1.1); 
		-moz-transform: scale(1.1); 
		-ms-transform: scale(1.1); 
		-o-transform: scale(1.1); 
		transform:rotate scale(1.1); 
		-webkit-transition: all 0.4s ease-in-out; 
		-moz-transition: all 0.4s ease-in-out; 
		-o-transition: all 0.4s ease-in-out;
		transition: all 0.4s ease-in-out;
	}
	.align-input{
		margin-top: 26px;
	}

	.action-buttons>.disabled {
		color: #585858!important;
		cursor: default;
	}

	.action-buttons>.disabled:hover {
		transform: none !important;
	}
	.pt-1{
		margin-top: 1px;
	}
	.pt-2{
		margin-top: 2px;
	}
	.pt-3{
		margin-top: 3px;
	}
	.pt-4{
		padding-top: 4px !important;
	}
/* tamañós css */
.modal-auto{
	max-width: 700px !important;
  }
	

		@media (min-width: 1025px) and (max-width: 1280px) {
			
  .modal-auto{
	max-width: fit-content !important;
  }
		}
		@media (min-width: 768px) and (max-width: 1024px) {
			
  .modal-auto{
	max-width: fit-content !important;
  }
		}
		@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
			
  .modal-auto{
	max-width: fit-content !important;
  }
		}
		@media (min-width: 480px) and (max-width: 768px) {
			
  .modal-auto{
	max-width: fit-content !important;
  }
		}
		@media (min-width: 320px) and (max-width: 480px) {
			
  .modal-auto{
	max-width: fit-content !important;
  }
		}
		@media (min-width: 180px) and (max-width: 320px) {
			
  .modal-auto{
	max-width: fit-content !important;
  }
		}