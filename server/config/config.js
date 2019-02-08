var env = process.env.NODE_ENV || 'development';
console.log('env ||||||',env);
if(env === 'development'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';

} else if (env === 'test'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
// script start, no cambiamos el valor de NODE_ENV porque por defecto es production
// en heroku se cambia automaticamente a production
