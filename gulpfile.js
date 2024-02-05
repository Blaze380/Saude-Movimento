const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");

// Função para compilar SCSS para CSS
function compileSCSS() {
  return gulp
    .src("./src/assets/scss/**/*.scss") // Localização dos arquivos SCSS
    .pipe(sourcemaps.init()) // Inicializa o mapeamento de fontes
    .pipe(sass().on("error", sass.logError)) // Compila SCSS para CSS
    .pipe(sourcemaps.write(".")) // Escreve os mapas de fonte
    .pipe(gulp.dest("./src/assets/css")); // Localização onde o CSS compilado será salvo
}
// Função watch para monitorar mudanças nos arquivos SCSS
function watchSCSS() {
  gulp.watch("./src/assets/scss/**/*.scss", compileSCSS);
}

// Tarefa padrão do Gulp que inicia a função compileSCSS e watchSCSS
exports.default = gulp.series(compileSCSS, watchSCSS);
