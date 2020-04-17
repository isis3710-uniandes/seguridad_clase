//--------------------------------------------
// Modulos
//--------------------------------------------
const { MongoClient, ObjectId } = require('mongodb');

//--------------------------------------------
// Definición de la cadena de conexión
//--------------------------------------------
const USUARIO = 'William';
const CONTRASENIA = 'QeJvyz8qIJDiY0lS';
const CLUSTER = 'prueba';
const DBNNAME = 'PruebaSeguridad';
const uri = `mongodb+srv://${USUARIO}:${CONTRASENIA}@${CLUSTER}-0ajid.azure.mongodb.net/${DBNNAME}?retryWrites=true&w=majority`;

/**
 * Clase que define un cliente de conexión a base de datos
 */
class MongoLib 
{
    /**
     * Inicializa el cliente de conexión con la cadena de conexión para el manejo de una coleción especifica
     * @param {String} collectionName Nombre de la colección a manipular
     */
    constructor(collectionName) {
        this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
        this.collectionName = collectionName;
    }

    /**
     * Crea una conexión con base de datos.
     * @returns {Promise} Promesa con el elemento de conexión a la colección.
     */
    connect() {
        return new Promise( (resolve, reject) => {
            this.client.connect( err => {
              if(err)
                reject(err);
              resolve(this.client.db(DBNNAME).collection(this.collectionName));
            });
        });
    }

    /**
     * Retorna una promesa con la lista de entidades que cumplan el citerío especificado por parametro.
     * @param {Object} query Objeto con la especificacion del filtro a implementar para realizar la consulta. (opcional)
     * @returns {Promise} Promesa con la lista de resultados de coincidencias de la base de datos
     */
    async getAll(query) {
        const collection = await this.connect();
        return collection.find(query || {}).toArray();
    }


    /**
     * Obtiene una entidad de acuerdo a un identificador especificado.
     * @param {String} id Identificador de la entidad a buscar
     * @returns {Object} Entidad con el identificador especificado. La respuesta es vácia en caso de no haber resultados retirna null
     */
    async get(id) {
        const collection = await this.connect();
        let entidad = collection.findOne({ _id: this._Id(id) });
        return entidad;
    }


    /**
     * Crea una entidad en la base de datos con la información especificada por parametro
     * @param {Object} data Objeto con la información de la entidad a crear
     * @returns {String} Identificador de la nueva entidad creada.
     */
    async create(data) {
        const collection = await this.connect();
        const entidad = collection.insertOne(data);
        return data
    }

    /**
     * Agrega de manera simultanea una lista de entidades a la base de datos.
     * @param {Array} lstData Lista con todas las entidades a crear
     */
    async createMany(lstData) {
        console.log(lstData.length);
        const collection = await this.connect();
        collection.insertMany(lstData);
        console.log('Termina el cargue')
    }

    /**
     * Modifica una entidad espeficificada de acuerdo con la nueva información recibida
     * @param {String} id Identificador de la entidad a modificar
     * @param {Object} data Unformación de la nueva entidad
     * @returns {String} Identificador de la entidad modificada
     */
    async update(id, data) {
        const collection = await this.connect();
        const entidad = collection.updateOne({ _id: this._Id(id) }, { $set: data }, { upsert: true });
        return entidad.upsertedId || id;
    }

    /**
     * Elimina una entidad con identificador especificado por parametro
     * @param {String} id Identificador de la entidad a eliminar
     */
    async delete(id) {
        const collection = await this.connect();
        collection.deleteOne({ _id: this._Id(id) });
        return id;
    }

    /**
     * Retorna un ObjectId creado con el identificador especificado por paramtro en caso de que tenga el formato definido.
     * El identificador debe ser una cadena en fromato Hex para ser un ObjectId valido 
     * @param {String} id Identificador a convertir
     * @returns {ObjectId} ObjectId Construido con el identificador especificado. En caso de que el identificador no tenga el formato esperado retorna el mismo identificador.
     */
    _Id(id) {
        var hex = /[0-9A-Fa-f]{6}/g;
        return (hex.test(id)) ? ObjectId(id) : id;
    }
}

//--------------------------------------
// Exportación del modulo
//--------------------------------------
module.exports = MongoLib;