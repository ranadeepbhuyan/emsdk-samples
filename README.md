# emsdk-samples
Web-assembly hello world and more

#### Hello.c
emcc hello.c -s WASM=1 -o hello.html
emrun hello.html

#### Hello 2:
emcc -o hello2.html hello2.c -O3 -s WASM=1 --emrun --shell-file template/shell_minimal.html
emrun hello2.html
#### Hello 3:

`<button class="mybutton">Run myFunction</button>`

Inside the <script type='text/javascript'> - tag

```
document.querySelector('.mybutton').addEventListener('click', function(){
  alert('check console');
  var result = Module.ccall('myFunction', // name of C function 
                             null, // return type
                             null, // argument types
                             null); // arguments
});
```
emcc -o hello.html hello.c -O3 -s WASM=1 --emrun --shell-file template/shell_minimal.html -s NO_EXIT_RUNTIME=1  -s EXTRA_EXPORTED_RUNTIME_METHODS=‘[“ccall”]’

#### Use of Sobel library
Find edges of images from a live frame.
Pre-compiled, just run -
`emrun index.html`

## Other examples:

`https://d2jta7o2zej4pf.cloudfront.net/`

`https://editor.construct.net/`

`https://wasdk.github.io/WasmFiddle/`

## Challange:
If you dare to compile quickbooks desktop to run on browser then please contact me 
### @ranadeep_bhuyan


