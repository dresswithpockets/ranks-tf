let gulp = require("gulp");
let newer = require("gulp-newer");
let imagemin = require("gulp-imagemin");
let typedoc = require("gulp-typedoc");
let sass = require("gulp-sass");
let postcss = require("gulp-postcss");
let sassLint = require("gulp-sass-lint");
let tslint = require("gulp-tslint");
let dotnet = require("gulp-dotnet-cli");
let download = require("gulp-download");
let decompress = require("gulp-decompress");
let sourcemaps = require("gulp-sourcemaps");
let fail = require("gulp-fail");

let del = require("del");
let autoprefixer = require("autoprefixer");
let assets = require("postcss-assets");
let mqpacker = require("css-mqpacker");
let cssnano = require("cssnano");
let source = require("vinyl-source-stream");
let buffer = require("vinyl-buffer");
let through = require("through2");
let tsify = require("tsify");
let browserify = require("browserify");
let globby = require("globby");
let sassdoc = require("sassdoc");
let fs = require("fs");
let eventStream = require("event-stream");
let exec = require("child_process").exec;
let spawn = require("child_process").spawn;
let os = require("os");

const devBuild = process.env.NODE_ENV !== "production";

const stylesMatch = "src/WiseWeb/src/sass/**/*.scss";
const imagesMatch = "src/WiseWeb/src/images/**/*.+(jpg|png|gif|svg)";
const scriptsMatch = "src/WiseWeb/src/ts/*.ts";
const stylesDestination = "src/WiseWeb/wwwroot/css";
const imagesDestination = "src/WiseWeb/wwwroot/images";
const scriptsDestination = "src/WiseWeb/wwwroot/js";

gulp.task("cs-clean", () => {
    return gulp.src("**/*.csproj", { read: false })
        .pipe(dotnet.clean());
});

gulp.task("file-clean", (done) => {
    return del([
        "src/WiseWeb/wwwroot/js/**/*",
        "src/WiseWeb/wwwroot/css/**/*",
        "src/WiseWeb/wwwroot/images/**/*",
        "docs/**/*",
        "doxygen/**/*"
    ], done);
});

gulp.task("image-build", () => {
    return gulp.src(imagesMatch)
        .pipe(newer(imagesDestination))
        .pipe(imagemin())
        .pipe(gulp.dest(imagesDestination));
});

// C#/MSBuild utilities that utilize dotnet CLI to build, restore, test and publish.
gulp.task("cs-restore", () => {
    return gulp.src("**/*.csproj", {read: false})
        .pipe(dotnet.restore());
});

gulp.task("cs-build", gulp.series("cs-restore"), () => {
    return gulp.src("**/*.csproj", {read: false})
        .pipe(dotnet.build());
});

gulp.task("cs-test", () => {
    return gulp.src("**/*test*.csproj", {read: false})
        .pipe(dotnet.test());
});

gulp.task("cs-docs", (cb) => {
    let doxygenPath = "/Applications/Doxygen.app/Contents/Resources/doxygen";
    if (os.type() != "Darwin")
    {
        // on linux and windows doxygen should be a CLI application.
        doxygenPath = "doxygen";
    }

    let doxy = spawn(doxygenPath, ["doxygenfile"]);
    doxy.stdout.on('data', (data) => {
        console.log(data.toString());
    });
    doxy.stderr.on('data', (data) => {
        console.log(data.toString());
    });
    cb();
});

gulp.task("sass-build", gulp.series("image-build"), () => {
    var postCssOpts = [
        assets({ loadPaths: [ imagesDestination ] }),
        autoprefixer({ browsers: [ "last 2 versions", "> 2%" ] }),
        mqpacker
    ];

    if (!devBuild) {
        postCssOpts.push(cssnano);
    }

    return gulp.src(stylesMatch)
        .pipe(newer(stylesDestination))
        .pipe(sass({
            outputStyle: "nested",
            imagePath: imagesDestination,
            precision: 3,
            errLogToConsole: true
        }))
        .pipe(postcss(postCssOpts))
        .pipe(gulp.dest(stylesDestination));
});

gulp.task("sass-docs", () => {
    let options = {
        dest: "docs/styles/",
        verbose: true,
        display: {
            access: ["public", "private"],
            alias: true,
            watermark: true,
        },
    };
    return gulp.src(stylesMatch)
        .pipe(sassdoc(options));
});

gulp.task("sass-lint", () => {
    return gulp.src(stylesMatch)
        .pipe(sassLint({
            configFile: ".sass-lint.yml"
        }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

gulp.task("ts-build", () => {

    let bundledStream = through();

    bundledStream
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(scriptsDestination));

    globby([ scriptsMatch ]).then((entries) => {
        browserify({
            basedir: ".",
            debug: devBuild,
            entries: entries,
            cache: {},
            packageCache: {}
        })
        .plugin(tsify)
        .transform("babelify", {
            presets: [ "es2015" ],
            extensions: [ ".ts" ]
        })
        .bundle()
        .pipe(bundledStream);
    }).catch((err) => {
        bundledStream.emit("error", err);
    });

    return bundledStream;
});

gulp.task("ts-docs", () => {
    return gulp.src(scriptsMatch)
        .pipe(typedoc({
            module: "commonjs",
            target: "es2015",
            includeDeclarations: true,

            out: "docs/scripts/",
            
            name: "WiseWeb Documentation"
        }));
});

gulp.task("ts-lint", () => {
    return gulp.src(scriptsMatch)
        .pipe(tslint({
            formatter: "verbose",
            configuration: "tslint.json"
        }))
        .pipe(tslint.report());
});

gulp.task("clean", gulp.parallel("cs-clean", "file-clean"));
gulp.task("lint", gulp.parallel("sass-lint", "ts-lint"));
gulp.task("docs", gulp.parallel("sass-docs", "ts-docs", "cs-docs"));
gulp.task("build", gulp.series("lint", "sass-build", "ts-build", "cs-build"));
gulp.task("test", gulp.series("cs-test"));
gulp.task("full", gulp.series("clean", "docs", "build"));
gulp.task("fulltest", gulp.series("clean", "docs", "build", "test"));
gulp.task("default", gulp.series("fulltest"));

// TODO: Implementing unit testing via mocha for TypeScript