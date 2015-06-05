var through = require("through"),
	gutil = require("gulp-util"),
	request = require("request"),
    fs = require('fs'),
	col = gutil.colors,
    stream;

function _isURL( url ) {
    var hasHTTP = url.indexOf( 'http' ) !== -1
        , startsWithSlashes = ( url[ 0 ] === '/' && url[ 1 ] === '/' );

    return hasHTTP || startsWithSlashes;
}

function _requestFileAsURL( currFile, filesIter, files ) {
    var fileName = currFile.split('/').pop();

    process.stdout.write('['+col.green('gulp')+']'+' Downloading '+col.cyan(currFile)+'\n');

    request({url:currFile,encoding:null},function( err, res, body ) {
        if ( err ) {
            process.stdout.write(' '+col.red('FAILED.\n'));
            return;
        }

        _downloadHandler( body, currFile, filesIter, files );
    });
}

function _requestFileRead( currFile, filesIter, files ) {
    process.stdout.write('['+col.green('gulp')+']'+' Reading '+col.cyan(currFile)+'\n');
    fs.readFile(currFile, 'utf-8', function(err,res) {

        if ( err ) {
            process.stdout.write(' '+col.red('FAILED.\n'));
            return;
        }

        _downloadHandler( res, currFile, filesIter, files );
    });
}

function _downloadHandler( body, currFile, filesIter, files ) {
    var file = new gutil.File( {path:currFile, contents: new Buffer(body)} );
    stream.queue(file);

    process.stdout.write(col.green('[DONE] ') + col.cyan(currFile)+'\n');
    ++filesIter;
    if(filesIter != files.length){
        _initFileRead( filesIter, files );
    }else{
        stream.emit('end');
    }
}

function _initFileRead( fileIter, files ) {
    var currFile = files[ fileIter ]
        , isURL = _isURL( currFile )
        , args = [ currFile, fileIter, files ];

    if ( isURL ) {
        _requestFileAsURL.apply( null, args );
    }
    else {
        _requestFileRead.apply( null, args );
    }
}

function gulpSmartSrc( srcs ){
	stream = through(function(file,enc,cb){
		this.push(file);
		cb();
	});

    _initFileRead( 0, srcs );
    
	return stream;
}

module.exports = gulpSmartSrc;
