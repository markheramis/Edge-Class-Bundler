# Edge Class Bundler

## Description
The edge-class-bundler is a tool designed to simplify the process of bundling JavaScript classes and their dependencies for use in edge functions such as CloudFront Functions or Lambda@Edge. In many edge function environments, uploading a package.json file with npm dependencies is not supported, limiting the use of npm packages. With this tool, developers can clone the repository, add their code to the main.js file, and execute a single command to bundle the edge class along with all its dependencies. This allows for npm management locally, enabling developers to bundle and upload the code to the edge environment without relying on npm packages.

## Inspiration
The inspiration behind edge-class-bundler stems from the challenges faced by developers when working with edge functions that do not support npm package management. Traditional approaches rely on npm packages, which cannot be directly uploaded to the edge environment. This tool provides a solution by enabling developers to manage dependencies locally and bundle them with their edge function code for seamless deployment. By bridging the gap between local development and edge environments, edge-class-bundler empowers developers to leverage modern JavaScript development practices in edge computing scenarios.

## Installation

To use `edge-class-bundler`, you can clone the repository and install its dependencies:
```bash
git clone <repository-url>
cd edge-class-bundler
npm install
```
## Usage
1. Add your code to the main.js file. This file should export the class you want to package.
2. Execute webpack with the provided configuration file:
    ```bash
    npx webpack --config webpack.config.js
    ```
3. The bundled file, including all dependencies, will be generated in the dist directory as bundle.js.
## Example
Suppose you have a class EdgeClass defined in main.js:
```javascript
class EdgeClass {
    construct(event) {
        this.event = event
    }
    hasAuthorization() {
        const requestHeaders = event.request.headers;
        return ('authorization' in requestHeaders);
    }
}
module.exports = EdgeClass;
```
After executing npx webpack --config webpack.config.js, the bundled file containing the packaged EdgeClass and all its dependencies will be generated in the dist directory as bundle.js.

You can copy the contents of dist/bundle.js and paste them into your CloudFront function code above your CloudFront function logic. This will allow you to utilize the EdgeClass within your CloudFront function. Here's how you can do it:

```javascript
// Begin bundled code
(()=>{var t={795:t=>{t.exports=class{construct(t){this.event=t}hasAuthorization(){return"authorization"in event.request.headers}}}},r={},e=function e(s){var o=r[s];if(void 0!==o)return o.exports;var n=r[s]={exports:{}};return t[s](n,n.exports,e),n.exports}(795);this.EdgeClass=e})();
// End bundled code
function handler(event) {
    edgeClass = new EdgeClass(event)
    if(edgeClass.hasAuthorization()) {
        return {
            statusCode: 200,
            statusDescription: 'OK',
            headers: {
                'cloudfront-functions': { value: 'generated-by-CloudFront-Functions' }
            }
        };
    } else {
        return {
            statusCode: 403,
            statusDescription: 'Access Denied',
            headers: {
                'cloudfront-functions': { value: 'generated-by-CloudFront-Functions' }
            }
        };
    }
}
```
By integrating the bundled EdgeClass into your CloudFront function code, you can easily leverage its functionality within your edge environment.

## Todo
- introduce features that will limit the file size to play with Edge Function limitations