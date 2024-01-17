const Koa = require('koa');
const cors = require('@koa/cors'); //Se agrega esta parte para eliminar cors
const Router = require('koa-router');
const sqlite3 = require('sqlite3').verbose();
const { koaBody } = require('koa-body');

const app = new Koa();
app.use(cors());
// Configurar el middleware para el cuerpo de la solicitud (parsing JSON)
app.use(koaBody());
const router = new Router();


// Conectar a la base de datos SQLite
const db = new sqlite3.Database('examen.db');

// Crear tabla si no existe
db.run("CREATE TABLE IF NOT EXISTS proveedores (proveedorID INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, descripcion TEXT)");
db.run("INSERT INTO proveedores  (nombre, descripcion) VALUES ('proveedor de prueba', 'esto es una descripcion')");

// Definir una ruta para insertar un proveedor
router.post('/proveedores', async (ctx) => {
  try {
    const { nombre, descripcion } = ctx.request.body;

    // Insertar el proveedor en la base de datos
    const stmt = db.prepare("INSERT INTO proveedores (nombre, descripcion) VALUES (?, ?)");
    const result = stmt.run(nombre, descripcion);
    stmt.finalize();

    // Obtener el ID del proveedor recién insertado
    const nuevoproveedorId = result.lastID;

    // Responder con el nuevo proveedor
    ctx.body = { id: nuevoproveedorId, nombre, descripcion };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al insertar el proveedor en la base de datos' };
    console.error(error);
  }
});

// Definir una ruta para eliminar un proveedor por su ID
router.delete('/proveedores/:id', async (ctx) => {
  try {
    const proveedorID = ctx.params.id;

    // Verificar si el proveedor existe antes de intentar eliminarlo
    const existeUsuario = await new Promise((resolve, reject) => {
      db.get("SELECT proveedorID FROM proveedores WHERE proveedorID = ?", [proveedorID], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(!!row);
        }
      });
    });

    if (!existeUsuario) {
      ctx.status = 404;
      ctx.body = { error: 'Usuario no encontrado' };
      return;
    }

    // Eliminar el proveedor de la base de datos
    await new Promise((resolve, reject) => {
      db.run("DELETE FROM proveedores WHERE proveedorID = ?", [proveedorID], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    ctx.body = { isEliminado: 'true' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al eliminar el usuario desde la base de datos' };
    console.error(error);
  }
});


// Definir una ruta para obtener todos los proveedores
router.get('/proveedores', async (ctx) => {
  try {
    // Consultar todos los proveedores en la base de datos
    const proveedores = await new Promise((resolve, reject) => {
      db.all("SELECT proveedorID, nombre, descripcion FROM proveedores", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    // Responder con la lista de proveedores
    ctx.body = proveedores;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error al obtener la lista de proveedores desde la base de datos' };
    console.error(error);
  }
});


// Configura la ruta "/candidato" que devuelve el nombre del candidato
router.get('/candidato', (ctx) => {
  ctx.body = { candidato: 'Rubén Adrián Vázquez Calzada' };
});

router.get('/version', (ctx) => {
  ctx.body = { version: '1.0.0' };
});



// Configurar las rutas
app.use(router.routes());
app.use(router.allowedMethods());

// Inicia el servidor en el puerto 3000
const puerto = 3000;
app.listen(puerto, () => {
  console.log(`Servidor Koa iniciado en http://localhost:${puerto}`);
});
