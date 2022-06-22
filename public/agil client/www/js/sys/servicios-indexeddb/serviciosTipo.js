angular.module('agil.servicios')


	.factory('IndexDbClasesTipo', ['$q', '$indexedDB', function ($q, $indexedDB) {
		var res = async function (nombre_corto) {
			try {
				let tipo;
				return $indexedDB.openStore('gl_tipo', async (storeTipo) => {
					// build query				// update scope
					let allTipos = await storeTipo.getAll();
					tipo = allTipos.find((x) => x.nombre_corto == nombre_corto);
					return $indexedDB.openStore('gl_clase', async (storeClase) => {
						// build query				// update scope
						let allClases = await storeClase.getAll()
						tipo.clases = [];
						tipo.clases = allClases.filter((x) => x.id_tipo == tipo.id && x.eliminado == false);
						var delay = $q.defer();
						delay.resolve(tipo);
						return delay.promise;
					});

				});
			} catch (error) {
				console.error(error)
			}

		};
		return res;
	}])
	.factory('IndexDbSaveClasesTipo', ['$q', '$indexedDB', function ($q, $indexedDB) {
		var res = async function (tipoRecord) {
			try {
				$indexedDB.openStore('gl_tipo', async (storeTipo) => {
					// build query				// update scope
					let allTipos = await storeTipo.getAll();
					const tipoFound = allTipos.find((x) => x.id == tipoRecord.id);
					if (tipoFound) {
						$indexedDB.openStore('gl_clase', async (storeClase) => {
							let allClases = await storeClase.getAll();
							// build query
							for (const clase of tipoRecord.clases) {
								const claseFound = allClases.find((x) => x.id == clase.id);
								if (!claseFound) {
									storeClase.insert({
										"id": clase.id,
										"id_tipo": clase.id_tipo,
										"nombre": clase.nombre,
										"nombre_corto": clase.nombre_corto,
										"habilitado": clase.habilitado,
										"eliminado": clase.eliminado,
										"id_padre": clase.id_padre,
										"icono": clase.icono
									}).then(function (data) {
										console.log(`registro creado ${data}`)
									}).catch(function (err) {
										console.log(`error al crear registro: ${err}`)
									})
								} else {
									storeClase.upsert({
										"id": clase.id,
										"id_tipo": clase.id_tipo,
										"nombre": clase.nombre,
										"nombre_corto": clase.nombre_corto,
										"habilitado": clase.habilitado,
										"eliminado": clase.eliminado,
										"id_padre": clase.id_padre,
										"icono": clase.icono
									}).then(function (data) {
										console.log(`registro creado ${data}`)
									}).catch(function (err) {
										console.log(`error al crear registro: ${err}`)
									})
								}
							}

						});
					} else {
						storeTipo.insert({
							"id": tipoRecord.id,
							"nombre": tipoRecord.nombre,
							"nombre_corto": tipoRecord.nombre_corto,
							"empresa": tipoRecord.empresa,
							"id_padre": tipoRecord.id_padre,
							"usar_herencia": tipoRecord.usar_herencia
						}).then(function (data) {
							console.log(`registro creado ${data}`)
						}).catch(function (err) {
							console.log(`error al crear registro: ${err}`)
						})
						$indexedDB.openStore('gl_clase', async (storeClase) => {
							for (const clase of tipoRecord.clases) {
								// build query
								storeClase.insert({
									"id": clase.id,
									"id_tipo": clase.id_tipo,
									"nombre": clase.nombre,
									"nombre_corto": clase.nombre_corto,
									"habilitado": clase.habilitado,
									"eliminado": clase.eliminado,
									"id_padre": clase.id_padre,
									"icono": clase.icono
								}).then(function (data) {
									console.log(`registro creado ${data}`)
								}).catch(function (err) {
									console.log(`error al crear registro: ${err}`)
								})
							}

						});
					}


				});

			} catch (error) {
				console.error(error)
			}

		};
		return res;
	}])
