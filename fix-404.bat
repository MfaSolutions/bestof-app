@echo off
echo Fixing GitHub Pages 404 issue...

REM Navigate to the dist directory
cd dist\bestof-app\browser

REM Create 404.html file
echo ^<!DOCTYPE html^> > 404.html
echo ^<html^> >> 404.html
echo ^  ^<head^> >> 404.html
echo ^    ^<meta charset="utf-8"^> >> 404.html
echo ^    ^<title^>BestofApp^</title^> >> 404.html
echo ^    ^<script type="text/javascript"^> >> 404.html
echo ^      // Single Page Apps for GitHub Pages >> 404.html
echo ^      // MIT License >> 404.html
echo ^      // https://github.com/rafgraph/spa-github-pages >> 404.html
echo ^      // This script takes the current url and converts the path and query >> 404.html
echo ^      // string into just a query string, and then redirects the browser >> 404.html
echo ^      // to the new url with only a query string and hash fragment, >> 404.html
echo ^      // e.g., https://www.foo.tld/one/two?a=b^&c=d#qwe, becomes >> 404.html
echo ^      // https://www.foo.tld/?/one/two^&a=b~and~c=d#qwe >> 404.html
echo ^      // Note: this 404.html file must be at least 512 bytes for it to work >> 404.html
echo ^      // with Internet Explorer (it is currently ^> 512 bytes) >> 404.html
echo ^      >> 404.html
echo ^      // If you're creating a Project Pages site and NOT using a custom domain, >> 404.html
echo ^      // then set pathSegmentsToKeep to 1 (enterprise users may need to set it to ^> 1). >> 404.html
echo ^      // This way the code will only replace the route part and not the real directory. >> 404.html
echo ^      // For example, if your repository path is /my-repo/ and you're using a custom domain, >> 404.html
echo ^      // then the url will be https://example.com/my-repo/one/two >> 404.html
echo ^      // In this case, you should set pathSegmentsToKeep to 1 >> 404.html
echo ^      // so that the path /my-repo/one/two gets converted to /?/one/two >> 404.html
echo ^      var pathSegmentsToKeep = 1; >> 404.html
echo ^      >> 404.html
echo ^      var l = window.location; >> 404.html
echo ^      l.replace( >> 404.html
echo ^        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') + >> 404.html
echo ^        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' + >> 404.html
echo ^        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') + >> 404.html
echo ^        (l.search ? '^&' + l.search.slice(1).replace(/&/g, '~and~') : '') + >> 404.html
echo ^        l.hash >> 404.html
echo ^      ); >> 404.html
echo ^    ^</script^> >> 404.html
echo ^  ^</head^> >> 404.html
echo ^  ^<body^> >> 404.html
echo ^  ^</body^> >> 404.html
echo ^</html^> >> 404.html

REM Add routing script to index.html
powershell -Command "& { $content = Get-Content 'index.html' -Raw; $script = '<script type=\"text/javascript\">`n    // Single Page Apps for GitHub Pages`n    // MIT License`n    // https://github.com/rafgraph/spa-github-pages`n    // This script checks to see if a redirect is present in the query string,`n    // converts it back to the correct url and adds it to the`n    // browser''s history using window.history.replaceState(...),`n    // which won''t cause the browser to attempt to load the new url.`n    // When the single page app is loaded further down in this file,`n    // the correct url will be waiting in the browser''s history for`n    // the single page app to route accordingly.`n    (function(l) {`n      if (l.search[1] === ''/'' ) {`n        var decoded = l.search.slice(1).split(''&'').map(function(s) {`n          return s.replace(/~and~/g, ''&'')`n        }).join(''?'');`n        window.history.replaceState(null, null,`n            l.pathname.slice(0, -1) + decoded + l.hash`n        );`n      }`n    }(window.location))`n  </script>'; $content -replace '(<link rel=\"stylesheet\" href=\"styles.*?\.css\">)', '$1' + $script | Set-Content 'index.html' }"

echo 404.html and routing script added successfully!